import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const db=readFileSync(new URL('../db.mjs',import.meta.url),'utf8');
test('P0.4 budget is labelled estimate, not validated cost',()=>{
  assert.match(db,/P0\.4 — redesenho económico/);
  assert.match(db,/sem montagem, fonte 5 V, transporte e certificação/);
  assert.match(db,/não cotação nem custo validado/);
});
test('P0.4 records unvalidated mechanical and testing gate',()=>{
  assert.match(db,/P0\.4\.1 — validar construção low-cost/);
  assert.match(db,/Sem contacto comercial ou venda antes de provas/);
  assert.match(db,/WHERE p\.slug='novamatra-lumicoaster'/);
});
