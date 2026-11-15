/* NOVAMATRA cinematic entrance · independent, dependency-free Canvas 2D */
(()=>{
 'use strict';
 const txt={
  pt:{micro:'PLATAFORMA INDEPENDENTE DE INVESTIGAÇÃO',eye:'INVESTIGAÇÃO · ENGENHARIA · PORTUGAL',h:['O FUTURO','NÃO SE','ADIVINHA.'],sub:'Questiona-se. Desenha-se. Testa-se.<br>O resto é apenas uma promessa.',cta:'EXPLORAR NOVAMATRA',note:'ENTRADA POR ESCOLHA.<br>SEM REDIRECIONAMENTOS.',foot:'IDEIAS SOB TESTE · RESULTADOS SEM FICÇÃO',mid:'MATERIAIS <span>·</span> SISTEMAS <span>·</span> MOVIMENTO'},
  en:{micro:'INDEPENDENT RESEARCH PLATFORM',eye:'RESEARCH · ENGINEERING · PORTUGAL',h:['THE FUTURE','IS NOT','GUESSWORK.'],sub:'Question it. Engineer it. Test it.<br>The rest is just a promise.',cta:'EXPLORE NOVAMATRA',note:'YOUR CHOICE TO ENTER.<br>NO AUTO-REDIRECTS.',foot:'IDEAS UNDER TEST · NO FICTIONAL RESULTS',mid:'MATERIALS <span>·</span> SYSTEMS <span>·</span> MOTION'},
  fr:{micro:'PLATEFORME DE RECHERCHE INDÉPENDANTE',eye:'RECHERCHE · INGÉNIERIE · PORTUGAL',h:['LE FUTUR','NE SE','DEVINE PAS.'],sub:'Questionner. Concevoir. Tester.<br>Le reste n’est qu’une promesse.',cta:'EXPLORER NOVAMATRA',note:'ENTRÉE SUR DÉCISION.<br>AUCUNE REDIRECTION AUTOMATIQUE.',foot:'IDÉES À L’ÉPREUVE · AUCUN RÉSULTAT INVENTÉ',mid:'MATÉRIAUX <span>·</span> SYSTÈMES <span>·</span> MOUVEMENT'}
 };
 const enter=document.getElementById('enter');
 document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>{
  const lang=btn.dataset.lang,t=txt[lang];if(!t)return;
  document.documentElement.lang=lang==='pt'?'pt-PT':lang;
  document.title=lang==='pt'?'NOVAMATRA — Investigação. Engenharia. O futuro por demonstrar.':lang==='en'?'NOVAMATRA — Independent Research & Engineering':'NOVAMATRA — Recherche et ingénierie indépendantes';
  document.getElementById('microhead').textContent=t.micro;
  document.getElementById('eyebrow').textContent=t.eye;
  ['h-first','h-second','h-third'].forEach((id,i)=>document.getElementById(id).textContent=t.h[i]);
  document.getElementById('thesis').innerHTML=t.sub;
  document.getElementById('enter-text').textContent=t.cta;
  document.getElementById('entry-note').innerHTML=t.note;
  document.getElementById('foot-left').textContent=t.foot;
  document.getElementById('foot-mid').innerHTML=t.mid;
  enter.href='/'+lang+'/';
  document.querySelectorAll('[data-lang]').forEach(b=>{b.classList.toggle('is-active',b===btn);b.setAttribute('aria-pressed',String(b===btn));});
 }));
 const canvas=document.getElementById('scene');if(!canvas||!canvas.getContext)return;
 const ctx=canvas.getContext('2d',{alpha:false});if(!ctx)return;
 const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let w=0,h=0,dpr=1,last=0,frame=0,pointerX=0,pointerY=0,aimX=0,aimY=0;
 const rng=((seed)=>()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296})(30429);
 const stars=Array.from({length:240},()=>({x:rng()*2-1,y:rng()*2-1,z:.1+rng()*.9,r:.45+rng()*1.2,p:rng()*6.28}));
 const streams=Array.from({length:44},(_,i)=>({a:rng()*6.28,b:rng()*6.28,r:.4+rng()*2,t:rng()}));
 function resize(){const bb=canvas.getBoundingClientRect();w=Math.max(1,bb.width);h=Math.max(1,bb.height);dpr=Math.min(2,window.devicePixelRatio||1);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)}
 function rotate(p,yaw,pitch){let x=p[0],y=p[1],z=p[2];let cy=Math.cos(yaw),sy=Math.sin(yaw),cx=Math.cos(pitch),sx=Math.sin(pitch);let u=x*cy+z*sy,v=-x*sy+z*cy;return [u,y*cx-v*sx,y*sx+v*cx]}
 function center(){return w<640?[w*.64,h*.35]:[w*.735,h*.49]}
 function project(p){const [cx,cy]=center();let scale=Math.min(h*.195,w<640?w*.29:w*.145);let depth=5.7/(5.7+p[2]);return [cx+p[0]*scale*depth,cy+p[1]*scale*depth,depth]}
 function edge(a,b,shade,width,blur=0){ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.strokeStyle=shade;ctx.lineWidth=width;if(blur){ctx.shadowBlur=blur;ctx.shadowColor=shade}ctx.stroke();ctx.shadowBlur=0}
 function polygon(pts,fill,stroke){ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i][0],pts[i][1]);ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke()}}
 function beam(a,b,r=.25,zwidth=.28){const dx=b[0]-a[0],dy=b[1]-a[1],m=Math.hypot(dx,dy);const px=-dy/m*r,py=dx/m*r;let v=[];for(const z of [-zwidth,zwidth])for(const e of [a,b]){v.push([e[0]-px,e[1]-py,e[2]+z],[e[0]+px,e[1]+py,e[2]+z])}return v}
 const elements=[
  beam([-1.08,1.6,.04],[-1.08,-1.6,.04],.23,.26),
  beam([-1.07,-1.54,.08],[1.06,1.55,.08],.21,.32),
  beam([1.08,1.6,.04],[1.08,-1.6,.04],.23,.26)
 ];
 const faces=[[0,1,3,2],[4,5,7,6],[0,2,6,4],[1,3,7,5],[2,3,7,6],[0,1,5,4]];
 function backdrop(time){const grd=ctx.createRadialGradient(w*.74,h*.47,1,w*.70,h*.49,Math.max(w,h)*.65);grd.addColorStop(0,'#102b31');grd.addColorStop(.24,'#07181f');grd.addColorStop(.69,'#040b10');grd.addColorStop(1,'#02070a');ctx.fillStyle=grd;ctx.fillRect(0,0,w,h);
  const aura=ctx.createRadialGradient(w*.74,h*.48,5,w*.74,h*.48,Math.min(w,h)*.37);aura.addColorStop(0,'rgba(80,186,184,.16)');aura.addColorStop(1,'rgba(10,35,42,0)');ctx.fillStyle=aura;ctx.fillRect(0,0,w,h);
  stars.forEach((s,i)=>{const x=(s.x*.5+.5)*w+(pointerX*14*s.z),y=(s.y*.5+.5)*h+(pointerY*7*s.z);const alpha=(.08+.3*s.z)*(reduced?1:.79+.21*Math.sin(time*.0005+s.p));ctx.beginPath();ctx.arc(x,y,s.r*s.z,0,Math.PI*2);ctx.fillStyle=`rgba(153,213,219,${alpha})`;ctx.fill()});
  ctx.strokeStyle='rgba(93,176,185,.08)';ctx.lineWidth=1;for(let i=0;i<13;i++){let yy=h*(i/12);ctx.beginPath();ctx.moveTo(w*.5,yy);ctx.lineTo(w,yy-h*.04);ctx.stroke()}
 }
 function architecture(time){const yaw=-.31+(reduced?0:Math.sin(time*.00022)*.16)+pointerX*.23;const pitch=.075+pointerY*.12;const roll=(reduced?0:Math.sin(time*.00019)*.035);
  const shift=p=>{const rotated=rotate(p,yaw,pitch);let x=rotated[0],y=rotated[1],z=rotated[2];return [x*Math.cos(roll)-y*Math.sin(roll),x*Math.sin(roll)+y*Math.cos(roll),z]};
  const crystal=elements.flatMap((v,bi)=>{const rotated=v.map(shift);return faces.map((fi,i)=>({bi,i,depth:fi.reduce((acc,j)=>acc+rotated[j][2],0)/4,pts:fi.map(j=>project(rotated[j]))}))}).sort((a,b)=>b.depth-a.depth);
  const cx=center()[0],cy=center()[1];ctx.save();ctx.globalCompositeOperation='screen';let halo=ctx.createRadialGradient(cx,cy,2,cx,cy,Math.min(w,h)*.40);halo.addColorStop(0,'rgba(116,235,221,.095)');halo.addColorStop(1,'rgba(18,92,106,0)');ctx.fillStyle=halo;ctx.fillRect(cx-w*.5,cy-h*.6,w,h*1.2);ctx.restore();
  crystal.forEach(f=>{const brightness=Math.max(0,Math.min(1,(f.depth+1.2)/2.5));let fill,stroke;
   if(f.i===0)fill=`rgba(35,107,118,${.19+brightness*.20})`;
   else if(f.i===1)fill=`rgba(7,21,28,${.75+brightness*.12})`;
   else fill=`rgba(34,79,92,${.25+brightness*.23})`;
   stroke=`rgba(126,230,223,${.17+brightness*.35})`;
   polygon(f.pts,fill,stroke);
  });
  const lines=[];elements.forEach((v,bi)=>{const pt=v.map(p=>project(shift(p)));const segs=[[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]];segs.forEach(([a,b],i)=>lines.push({a:pt[a],b:pt[b],intensity:(i%3===0?.73:.28)*(bi===1?1.2:1)}));});
  lines.forEach(l=>{edge(l.a,l.b,`rgba(118,243,230,${l.intensity})`,l.intensity>.6?1.45:.75,l.intensity>.6?13:0)});
  // Volumetric construction marks, cross-section tick marks and scanning plane.
  for(let k=-4;k<=4;k++){let x=k*.55;const pa=project(shift([x,-2.17,-.7])),pb=project(shift([x,-2.17,.5]));edge(pa,pb,'rgba(145,223,217,.20)',.7);}
  for(let j=0;j<3;j++){const y=-1.05+j*1.04;const a=project(shift([-1.65,y,-.59])),b=project(shift([1.65,y,-.59]));edge(a,b,`rgba(125,226,220,${.12+j*.018})`,.75)}
  const scan=(reduced?.4:((time*.00016)%1));const sy=-1.9+scan*3.8;const a=project(shift([-1.8,sy,-.66])),b=project(shift([1.8,sy,-.66]));edge(a,b,'rgba(166,255,245,.38)',1.1,10);
  // Fine moving data strands: an optical object, not a wheel.
  const base=(reduced?1:time*.00012);
  streams.forEach((s,i)=>{let y=-2.2+(s.t+base)%1*4.4;let x=(Math.sin(s.a*3+i)*.9)*1.6;let p=project(shift([x,y,-1.3-s.r*.2]));let q=project(shift([x+.1,y+.15,-1.3-s.r*.2]));edge(p,q,'rgba(147,222,220,'+(.1+s.r*.055)+')',.8)});
  // Architectural framing marks, asymmetrical to avoid an arcade/lottery aesthetic.
  const boundary=[[[-1.84,2.03,-.4],[-1.48,2.03,-.4]],[[-1.84,2.03,-.4],[-1.84,1.65,-.4]],[[1.48,-2.03,-.4],[1.84,-2.03,-.4]],[[1.84,-1.66,-.4],[1.84,-2.03,-.4]]];boundary.forEach(([p,q])=>edge(project(shift(p)),project(shift(q)),'rgba(137,222,218,.48)',1.1));
 }
 function draw(t){if(!w||!h)resize();const time=reduced?1000:t;pointerX+=(aimX-pointerX)*.03;pointerY+=(aimY-pointerY)*.03;backdrop(time);architecture(time);if(!reduced)requestAnimationFrame(draw)}
 window.addEventListener('resize',resize,{passive:true});window.addEventListener('pointermove',event=>{aimX=Math.max(-1,Math.min(1,(event.clientX/window.innerWidth-.5)*2));aimY=Math.max(-1,Math.min(1,(event.clientY/window.innerHeight-.5)*2));},{passive:true});
 window.addEventListener('blur',()=>{last=0});resize();requestAnimationFrame(draw);
})();