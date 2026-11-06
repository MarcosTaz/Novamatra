import { randomBytes, scryptSync, timingSafeEqual, createHash } from 'node:crypto';

export const randomSecret = (bytes=32) => randomBytes(bytes).toString('hex');
export const digest = (value) => createHash('sha256').update(String(value)).digest('hex');
export const safeCompare = (a,b) => {
  const aa = Buffer.from(String(a)); const bb = Buffer.from(String(b));
  return aa.length===bb.length && timingSafeEqual(aa,bb);
};
export function protectPassword(value, salt=randomSecret(16)) {
  if(typeof value !== 'string' || value.length<14 || value.length>256) throw new Error('A palavra-passe tem de ter 14 a 256 caracteres');
  return {salt,hash:scryptSync(value,salt,64,{N:32768,r:8,p:1,maxmem:64*1024*1024}).toString('hex')};
}
export function checkPassword(value,salt,hash){
  if(typeof value!=='string'||value.length>256||!salt||!hash) return false;
  const actual=scryptSync(value,String(salt),64,{N:32768,r:8,p:1,maxmem:64*1024*1024}).toString('hex');
  return safeCompare(actual,hash);
}
export function escapeHTML(s=''){
  return String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
}
export function safeUrl(value){
  try{const u=new URL(value);return ['https:'].includes(u.protocol)?u.toString():null;}catch{return null;}
}
export function slugify(value){return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'').slice(0,80)}