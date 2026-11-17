import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const db = readFileSync(new URL('../db.mjs', import.meta.url), 'utf8');

test('LUMICOASTER exists as an idempotent independent project in private portal seed', () => {
  assert.match(db, /'novamatra-lumicoaster','NOVAMATRA LUMICOASTER'/);
  assert.equal((db.match(/'novamatra-lumicoaster','NOVAMATRA LUMICOASTER'/g) || []).length,1);
  assert.match(db, /ON CONFLICT\(slug\) DO NOTHING/);
});
test('LUMICOASTER has one finished scope-limited milestone and a pending physical test', () => {
  assert.match(db, /P0\.1 — desenho preliminar e verificação de software/);
  assert.match(db, /P0\.2 — ensaio do peso, segurança e custos/);
  assert.match(db, /WHERE p\.slug='novamatra-lumicoaster'/);
  assert.match(db, /NOT EXISTS \(SELECT 1 FROM nm_items i/);
});
test('Existing C4, DECREIA and equipment programmes remain registered', () => {
  for(const slug of ['novamatra-c4','decreia','scan2cnc','sterion-core']) {
    assert.ok(db.includes("'"+slug+"'"), 'Missing project: '+slug);
  }
});
