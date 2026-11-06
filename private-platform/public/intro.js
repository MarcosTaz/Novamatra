// Public, deterministic motion study — does not disclose private project data.
const canvas=document.getElementById('intro-canvas');
const video=document.getElementById('intro-video');
if(video){video.addEventListener('canplay',()=>{canvas.hidden=true});video.addEventListener('error',()=>{video.hidden=true;canvas.hidden=false});}
if(canvas && !matchMedia('(prefers-reduced-motion:reduce)').matches){
 const ctx=canvas.getContext('2d');let raf;
 const resize=()=>{const ratio=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(window.innerWidth*ratio);canvas.height=Math.round(window.innerHeight*ratio);ctx.setTransform(ratio,0,0,ratio,0,0)};
 resize();window.addEventListener('resize',resize);
 const t0=performance.now();
 function draw(now){if(canvas.hidden){raf=requestAnimationFrame(draw);return;}const w=window.innerWidth,h=window.innerHeight,t=((now-t0)/1000)%16;
 ctx.clearRect(0,0,w,h);let g=ctx.createLinearGradient(0,0,w,h);g.addColorStop(0,'#061014');g.addColorStop(.6,'#0c1217');g.addColorStop(1,'#08090c');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
 const cx=w*.69,cy=h*.44,scale=Math.min(w/1150,h/770);const phase=Math.min(3,Math.floor(t/4));ctx.save();ctx.translate(cx,cy);ctx.scale(scale,scale);
 const opacity=.22 + .13*Math.cos(t*.45);ctx.strokeStyle=`rgba(185,205,202,${opacity})`;ctx.lineWidth=.8;
 // 1: geological/mechanical strata; 2: a calibrated turbine; 3: precision metrology; 4: integrated system.
 for(let i=0;i<23;i++){const r=65+i*16;ctx.beginPath();const start=-Math.PI*.8+i*.02;const end=Math.PI*.75-i*.018;ctx.arc(0,0,r,start,end);ctx.stroke();}
 if(phase>=1){ctx.strokeStyle='rgba(231,207,161,.45)';for(let i=0;i<14;i++){const a=i*Math.PI/7 +t*.05;const r=175;ctx.save();ctx.rotate(a);ctx.beginPath();ctx.moveTo(60,-7);ctx.lineTo(r,-3);ctx.lineTo(r-18,19);ctx.lineTo(60,5);ctx.closePath();ctx.stroke();ctx.restore();}}
 if(phase>=2){ctx.strokeStyle='rgba(165,196,197,.42)';for(let i=-6;i<=6;i++){ctx.beginPath();ctx.moveTo(i*70,-420);ctx.lineTo(i*70,420);ctx.stroke();}for(let j=-5;j<=5;j++){ctx.beginPath();ctx.moveTo(-500,j*70);ctx.lineTo(500,j*70);ctx.stroke();}ctx.strokeStyle='#c6b092';ctx.beginPath();ctx.moveTo(-260,0);ctx.lineTo(240,0);ctx.moveTo(0,-240);ctx.lineTo(0,240);ctx.stroke();}
 if(phase>=3){ctx.lineWidth=1.7;ctx.strokeStyle='rgba(226,229,207,.57)';ctx.beginPath();ctx.ellipse(0,0,350,240,-.34,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.ellipse(0,0,310,200,-.34,0,Math.PI*2);ctx.stroke();}
 const glow=ctx.createRadialGradient(0,0,0,0,0,550);glow.addColorStop(0,'rgba(204,184,146,.14)');glow.addColorStop(1,'rgba(1,8,12,0)');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(0,0,550,0,Math.PI*2);ctx.fill();ctx.restore();
 raf=requestAnimationFrame(draw);}
 raf=requestAnimationFrame(draw);
}