import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const sql=readFileSync(new URL('../db.mjs',import.meta.url),'utf8');

test('P0.2 records a separate idempotent dimensional milestone',()=>{
 const title='P0.2 — famílias dimensionais S/M/L';
 assert.equal(sql.split(title).length-1,2);
 for(const dim of ['S Ø90 exterior / Ø78 prato / pé até Ø70','M Ø100 / Ø88 / até Ø80','L Ø110 / Ø98 / até Ø90'])
   assert.ok(sql.includes(dim),'Missing size: '+dim);
 assert.match(sql,/p.slug='novamatra-lumicoaster'/);
 assert.match(sql,/AND NOT EXISTS\(SELECT 1 FROM nm_items/);
});
test('P0.3 physical validation remains pending',()=>{
 assert.ok(sql.includes('P0.3 — validar copos reais e mecanismo de acionamento'));
 assert.ok(sql.includes('sem copos físicos'));
});
