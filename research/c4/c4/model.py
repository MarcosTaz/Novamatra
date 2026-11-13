"""NOVAMATRA C4: small-displacement 7-DOF vertical full-car research model.

Educational baseline only: no controller/sensor hardware, tyre lift-off, roll-centre,
nonlinear damper, actuator efficiency, latency, safety case or road certification.
Coordinates: z upwards; x forwards; y left. Roll about x; pitch about y is
represented with nose-up positive (equivalent to minus conventional rotation y).
"""
from __future__ import annotations
from dataclasses import dataclass
from math import pi, sin
import csv
import json
from pathlib import Path


@dataclass(frozen=True)
class Parameters:
    sprung_mass: float = 1300.0
    roll_inertia: float = 600.0
    pitch_inertia: float = 2100.0
    wheel_mass: float = 45.0
    wheelbase_front: float = 1.35
    wheelbase_rear: float = 1.45
    half_track: float = 0.79
    spring: float = 27000.0
    damper: float = 1900.0
    tyre_spring: float = 195000.0
    tyre_damper: float = 150.0
    max_actuator_force: float = 2500.0
    max_force_rate: float = 110000.0
    velocity: float = 10.0

    def geometry(self):
        a,b,t=self.wheelbase_front,self.wheelbase_rear,self.half_track
        return ((a,t),(a,-t),(-b,t),(-b,-t)) # FL, FR, RL, RR


def road_shape(s: float, lane: int) -> tuple[float, float]:
    """Road height and spatial derivative at longitudinal coordinate s.
    Smooth, finite-length left-only and right-only bumps; units m and m/m.
    """
    intervals=(((2.5,3.3,0.04),),((6.1,7.1,0.035),))
    z=dz=0.0
    for start,end,amp in intervals[lane]:
        if start<=s<=end:
            q=(s-start)/(end-start)
            z+=0.5*amp*(1-sin(pi/2-2*pi*q))
            dz+=amp*pi/(end-start)*sin(2*pi*q)
    return z,dz


def clamp(x: float, lo: float, hi: float)->float:
    return min(hi,max(lo,x))


def solve3(a,b):
    """3x3 Gaussian elimination with partial pivoting, no third-party dependency."""
    m=[list(row)+[float(b[i])] for i,row in enumerate(a)]
    for col in range(3):
        pivot=max(range(col,3),key=lambda i: abs(m[i][col]))
        if abs(m[pivot][col])<1e-10: raise ValueError('singular geometry')
        m[col],m[pivot]=m[pivot],m[col]
        inv=1/m[col][col]
        for j in range(col,4):m[col][j]*=inv
        for k in range(3):
            if k!=col:
                alpha=m[k][col]
                for j in range(col,4):m[k][j]-=alpha*m[col][j]
    return [m[i][3] for i in range(3)]


def allocate(generalized,geom):
    """Minimum L2-norm force allocation for [heave, roll, pitch] requests."""
    columns=[(1.0,y,x) for x,y in geom]
    bbt=[[sum(c[i]*c[j] for c in columns) for j in range(3)] for i in range(3)]
    lambdas=solve3(bbt,generalized)
    return [sum(lambdas[j]*c[j] for j in range(3)) for c in columns]


def simulation(mode='passive', params: Parameters|None=None, duration=3.0, dt=0.001):
    if mode not in ('passive','c4'): raise ValueError('Unknown mode')
    if dt<=0 or duration<=0: raise ValueError('Invalid time step/duration')
    p=params or Parameters()
    geom=p.geometry()
    # Generalized coordinates and four unsprung-wheel coordinates (deviation from static equilibrium).
    q=[0.0]*7; v=[0.0]*7; last_act=[0.0]*4
    traces=[]; sum_acc=0.0; sum_roll=0.0; sum_pitch=0.0; mechanical_work_abs=0.0
    peak_force=0.0; peak_tyre_var=0.0; steps=int(round(duration/dt))
    for step in range(steps):
        t=step*dt
        road=[road_shape(p.velocity*t+x, 0 if i%2==0 else 1) for i,(x,y) in enumerate(geom)]
        zbody=[q[0]+y*q[1]+x*q[2] for x,y in geom]
        vbody=[v[0]+y*v[1]+x*v[2] for x,y in geom]
        act=[0.0]*4
        if mode=='c4':
            requested=[-12000*q[0]-4200*v[0], -30000*q[1]-5000*v[1],-35000*q[2]-6500*v[2]]
            desired=allocate(requested,geom)
            for i in range(4):
                limited=clamp(desired[i],-p.max_actuator_force,p.max_actuator_force)
                act[i]=clamp(limited,last_act[i]-p.max_force_rate*dt,last_act[i]+p.max_force_rate*dt)
            last_act=act[:]
        suspension=[-p.spring*(zbody[i]-q[3+i])-p.damper*(vbody[i]-v[3+i])+act[i] for i in range(4)]
        tyre=[-p.tyre_spring*(q[3+i]-road[i][0])-p.tyre_damper*(v[3+i]-p.velocity*road[i][1]) for i in range(4)]
        dd=[sum(suspension)/p.sprung_mass,
            sum(y*f for (x,y),f in zip(geom,suspension))/p.roll_inertia,
            sum(x*f for (x,y),f in zip(geom,suspension))/p.pitch_inertia]
        dd += [(-suspension[i]+tyre[i])/p.wheel_mass for i in range(4)]
        # Small-step symplectic Euler. Road disturbance enters through tyre forces.
        for j in range(7):
            v[j]+=dd[j]*dt
            q[j]+=v[j]*dt
        sum_acc+=dd[0]**2
        sum_roll+=q[1]**2
        sum_pitch+=q[2]**2
        mechanical_work_abs+=sum(abs(act[i]*(vbody[i]-v[3+i])) for i in range(4))*dt
        peak_force=max(peak_force,*(abs(a) for a in act))
        peak_tyre_var=max(peak_tyre_var,*(abs(f) for f in tyre))
        if step%10==0:
            traces.append({'time_s':round(t,4),'heave_m':q[0], 'heave_accel_m_s2':dd[0],
                'roll_deg':q[1]*180/pi,'pitch_deg':q[2]*180/pi,
                'actuator_force_fl_N':act[0], 'actuator_force_fr_N':act[1],
                'actuator_force_rl_N':act[2], 'actuator_force_rr_N':act[3]})
    return {'mode':mode,'params':vars(p),'duration_s':duration,'dt_s':dt,
            'metrics':{'heave_accel_rms_m_s2':(sum_acc/steps)**.5,
                       'roll_rms_deg':(sum_roll/steps)**.5*180/pi,
                       'pitch_rms_deg':(sum_pitch/steps)**.5*180/pi,
                       'actuator_mechanical_work_abs_J':mechanical_work_abs,
                       'peak_actuator_force_N':peak_force,
                       'peak_tyre_force_variation_N':peak_tyre_var},'trace':traces}


def export(root: Path):
    root.mkdir(parents=True,exist_ok=True)
    p=simulation('passive'); a=simulation('c4')
    summary={'model':'small-displacement, seven DOF, no tyre-lift/contact-loss logic',
             'validation':'simulation only, not hardware verified',
             'limitations':['linear springs, dampers and tyre stiffness','idealised sensor state',
             'no active actuator electricity model','no vertical static-load or tyre detachment',
             'no lateral/longitudinal vehicle dynamics','no safety certification'],
             'passive':p['metrics'],'c4':a['metrics']}
    (root/'metrics.json').write_text(json.dumps(summary,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
    for run in (p,a):
        with (root/(run['mode']+'.csv')).open('w',newline='',encoding='utf-8') as f:
            writer=csv.DictWriter(f,fieldnames=run['trace'][0].keys());writer.writeheader();writer.writerows(run['trace'])
    return summary


if __name__=='__main__':
    print(json.dumps(export(Path('outputs')),indent=2,ensure_ascii=False))
