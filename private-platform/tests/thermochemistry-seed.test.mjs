import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const db = readFileSync(new URL('../db.mjs', import.meta.url), 'utf8');
const server = readFileSync(new URL('../server.mjs', import.meta.url), 'utf8');

test('F-01 and MP-01 are separate research projects', () => {
  assert.match(db, /'f01-flame-sticks','F-01 \/ FLAME STICKS'/);
  assert.match(db, /'mp01-protecao-termica','MP-01 \/ MATERIAIS DE PROTECAO'/);
  assert.match(db, /'Termoquímica \/ sticks','Alta'/);
  assert.match(db, /'V0.8 — aquecimento bidimensional e verificação numérica'/);
  assert.match(db, /'V0.9 — estudo de pirólise e sensibilidade 2D'/);
  assert.match(db, /'Materiais de proteção \/ reserva científica','Baixa'/);
  assert.ok(db.includes('nao demonstrou convergencia'));
  assert.ok(db.includes('Nao herda resultados de validacao do F-01'));
});

test('Idempotent seeds preserve existing projects and items', () => {
  assert.match(db, /WHERE p\.slug='f01-flame-sticks'/);
  assert.match(db, /WHERE p\.slug='mp01-protecao-termica'/);
  const block = db.slice(db.indexOf('// NOVAMATRA / TERMOQUIMICA'));
  assert.equal((block.match(/ON CONFLICT\(slug\) DO NOTHING/g) || []).length, 2);
  assert.equal((block.match(/AND NOT EXISTS\s*\(/g) || []).length, 6);
  for (const slug of ['sterion-core','scan2cnc','arcvault-step','decreia']) {
    assert.ok(db.includes("'"+slug+"'"), 'Existing project unexpectedly missing: '+slug);
  }
});

test('Private catalog separates the thermochemistry unit from other projects', () => {
  assert.match(server, /const thermoSlugs=new Set\(\['f01-flame-sticks','mp01-protecao-termica'\]\)/);
  assert.match(server, /const general=rows\.filter\(p=>!thermoSlugs\.has\(p\.slug\)\)/);
  assert.match(server, /const thermoSection=thermo\.length/);
  assert.match(server, /const generalSection=general\.length/);
  assert.ok(server.indexOf('app.get(\'/projetos\',requireProject') >= 0);
});
