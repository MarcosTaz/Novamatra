import { createRequire } from 'node:module';
import { writeFile,mkdir,mkdtemp,rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join,dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {spawnSync} from 'node:child_process';
const require=createRequire(import.meta.url);
let sharp;
try{sharp=require('sharp')}catch{sharp=require('/opt/nvm/versions/node/v22.16.0/lib/node_modules/sharp')}
let ffmpeg;try{ffmpeg=require('ffmpeg-static')}catch{ffmpeg='ffmpeg'}
const root=dirname(dirname(fileURLToPath(import.meta.url)));
const output=join(root,'public','novamatra-evolucao.mp4');
const dir=await mkdtemp(join(tmpdir(),'novamatra-film-'));
const W=1280,H=720;
const col='#c9d1ca',amber='#ae9471';
const grid=(opacity=.1)=>{let s='';for(let x=80;x<W;x+=80)s+=`<path d="M${x} 0V720" stroke="#718d92" stroke-width="1" opacity="${opacity}"/>`;for(let y=60;y<H;y+=60)s+=`<path d="M0 ${y}H1280" stroke="#718d92" stroke-width="1" opacity="${opacity}"/>`;return s};
const base=(type,extra)=>`<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720"><defs>
<radialGradient id="halo" cx="72%" cy="47%" r="65%"><stop offset="0" stop-color="#2f3939"/><stop offset=".5" stop-color="#101c21"/><stop offset="1" stop-color="#04090b"/></radialGradient>
<linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c5c5b9" stop-opacity=".26"/><stop offset=".5" stop-color="#858d90" stop-opacity=".08"/><stop offset="1" stop-color="#d6d0bf" stop-opacity=".36"/></linearGradient>
<linearGradient id="beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a09378" stop-opacity="0"/><stop offset=".5" stop-color="#b4b2a7" stop-opacity=".48"/><stop offset="1" stop-color="#a09378" stop-opacity="0"/></linearGradient>
</defs><rect width="1280" height="720" fill="url(#halo)"/>${grid(type===0?.07:.12)}${extra}</svg>`;
const caption=(num,topic,sub)=>`<g font-family="DejaVu Sans,Arial,sans-serif"><text x="83" y="104" font-size="15" fill="${amber}" letter-spacing="5">NOVAMATRA  /  THE ENGINEERING OF TOMORROW</text><path d="M83 129H455" stroke="${amber}" stroke-opacity=".5"/><text x="83" y="502" font-size="60" font-weight="500" letter-spacing="-2" fill="${col}">${topic}</text><text x="84" y="550" font-size="21" font-weight="400" fill="#aeb7b5">${sub}</text><text x="83" y="642" fill="${amber}" letter-spacing="3" font-size="14">${num}  /  04</text></g>`;
const strata=()=>{let s='';for(let i=0;i<46;i++){const y=190+i*11;const pts=[];for(let x=550;x<=1370;x+=35)pts.push(`${x},${y+Math.sin(x*.016+i*.19)*35 +Math.sin(x*.03+i*.44)*12}`);s+=`<polyline points="${pts.join(' ')}" fill="none" stroke="${i%8===0?'#d4bca2':'#78908c'}" stroke-opacity="${.12+i/230}" stroke-width="${i%8===0?1.9:.8}"/>`;}
for(let i=0;i<200;i++){const x=600+(i*53)%650,y=130+(i*i*17)%510;const r=(i%5)/5+.5;s+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#c3c3ae" opacity="${(i%9)/70+.04}"/>`;}return s};
const mechanism=()=>{let s='';for(let r=55;r<410;r+=31)s+=`<circle cx="915" cy="365" r="${r}" fill="none" stroke="#bec4bc" stroke-opacity="${r%3?.16:.25}" stroke-width="1"/>`;for(let a=0;a<24;a++){let deg=a*15;s+=`<path d="M878 341L1088 299L1050 350L931 399Z" transform="rotate(${deg} 915 365)" fill="url(#metal)" stroke="#b9c1b8" stroke-opacity=".42"/>`;}s+=`<circle cx="915" cy="365" r="67" fill="#0b1215" stroke="#c6b59c" stroke-width="2"/><circle cx="915" cy="365" r="10" fill="#aebbb3"/>`;return s};
const metrology=()=>{let s='';for(let i=0;i<20;i++){const x=500+i*37;const yy=130+(i%3)*17;s+=`<line x1="${x}" y1="${yy}" x2="${x}" y2="${620-(i%2)*24}" stroke="#93b2b2" stroke-opacity=".18"/>`;}
for(let i=0;i<18;i++){const a=i*Math.PI/9;s+=`<line x1="885" y1="355" x2="${885+Math.cos(a)*340}" y2="${355+Math.sin(a)*340}" stroke="#d4c6af" stroke-opacity=".24"/>`};
s+=`<ellipse cx="885" cy="355" rx="305" ry="180" transform="rotate(-27 885 355)" fill="none" stroke="#b4bab4" stroke-width="2" opacity=".9"/><ellipse cx="885" cy="355" rx="285" ry="163" transform="rotate(-27 885 355)" fill="none" stroke="#b4bab4" opacity=".6"/><path d="M470 355H1230 M885 85V620" stroke="#be9e75" stroke-opacity=".68" stroke-dasharray="13 13"/>`;return s};
const destination=()=>{let s=`<g transform="translate(890 348) rotate(-18)"><rect x="-280" y="-230" width="565" height="450" rx="13" fill="#071116" stroke="#b3c0bd" stroke-width="2"/><rect x="-252" y="-205" width="510" height="395" rx="6" fill="url(#metal)" stroke="#cbd1c7" stroke-opacity=".4"/><path d="M-252 146H258" stroke="#b69b73" stroke-width="3" opacity=".8"/></g>`;for(let i=0;i<7;i++)s+=`<path d="M${510+i*15} ${70+i*18}L${1180-i*17} ${40+i*15}" stroke="#bfc8bf" stroke-opacity=".12"/>`;return s};
const defs=[
 base(0,strata()+caption('01','MATÉRIA','Tudo começa com uma pergunta.')),
 base(1,mechanism()+caption('02','MOVIMENTO','A hipótese torna-se mecanismo.')),
 base(2,metrology()+caption('03','MEDIÇÃO','Desenhar. Medir. Corrigir.')),
 base(3,destination()+`<g font-family="DejaVu Sans,Arial,sans-serif"><text x="84" y="105" font-size="15" fill="${amber}" letter-spacing="5">RESEARCH · ENGINEERING · FUTURE SYSTEMS</text><text x="84" y="490" font-size="85" font-weight="600" fill="#e5e7db" letter-spacing="4">NOVAMATRA</text><text x="86" y="538" font-size="22" fill="#c2cac3">O futuro não se anuncia. Demonstra-se.</text><path d="M86 565H610" stroke="${amber}" stroke-width="2"/><text x="84" y="645" fill="${amber}" letter-spacing="3" font-size="14">04  /  04</text></g>`)
];
for(let i=0;i<defs.length;i++)await sharp(Buffer.from(defs[i])).png().toFile(join(dir,`scene${i}.png`));
const args=['-y'];for(let i=0;i<4;i++)args.push('-loop','1','-framerate','24','-t','4','-i',join(dir,`scene${i}.png`));
args.push('-filter_complex',`[0:v]format=yuv420p,scale=1280:720[v0];[1:v]format=yuv420p,scale=1280:720[v1];[2:v]format=yuv420p,scale=1280:720[v2];[3:v]format=yuv420p,scale=1280:720[v3];[v0][v1]xfade=transition=fade:duration=1:offset=3[x1];[x1][v2]xfade=transition=fade:duration=1:offset=6[x2];[x2][v3]xfade=transition=fade:duration=1:offset=9,format=yuv420p[vout]`,'-map','[vout]','-an','-c:v','libx264','-preset','veryfast','-crf','27','-movflags','+faststart','-t','13',output);
const res=spawnSync(ffmpeg,args,{encoding:'utf-8',maxBuffer:2_000_000,timeout:170000});if(res.status!==0){console.error(res.stderr?.slice(-4000)||res.error);process.exit(1)}
await rm(dir,{recursive:true,force:true});console.log(`Created cinematic film ${output}`);