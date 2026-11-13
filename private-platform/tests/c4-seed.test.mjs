import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const db = readFileSync(new URL('../db.mjs', import.meta.url), 'utf8');

test('C4 research project is in protected portal initial seed', () => {
  assert.match(db, /\('novamatra-c4','NOVAMATRA C4'/);
  assert.equal((db.match(/\('novamatra-c4','NOVAMATRA C4'/g) || []).length, 1);
  assert.match(db, /ON CONFLICT\(slug\) DO NOTHING/);
  assert.match(db, /'Investigação','Mobilidade automóvel','Alta'/);
});

test('C4 seed does not replace existing projects', () => {
  for (const slug of ['sterion-core','sterion-insert','scan2cnc','arcvault-step']) {
    assert.ok(db.includes("'"+slug+"'"), 'Missing seed '+slug);
  }
});
