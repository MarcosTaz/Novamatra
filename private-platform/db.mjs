import pg from 'pg';
const {Pool}=pg;
export const pool = new Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:true},max:4,connectionTimeoutMillis:10000,idleTimeoutMillis:30000});
export const query = (sql,params=[])=>pool.query(sql,params);
export async function initialize(){
  await query(`CREATE TABLE IF NOT EXISTS nm_owner (
    id integer PRIMARY KEY DEFAULT 1 CHECK(id=1), email text NOT NULL,
    project_salt text NOT NULL, project_hash text NOT NULL,
    admin_salt text NOT NULL, admin_hash text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(), changed_at timestamptz NOT NULL DEFAULT now())`);
  await query(`CREATE TABLE IF NOT EXISTS nm_sessions (
    id_digest text PRIMARY KEY, stage smallint NOT NULL CHECK(stage IN (1,2)),
    csrf text NOT NULL, expires_at timestamptz NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now())`);
  await query(`CREATE TABLE IF NOT EXISTS nm_projects (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text NOT NULL UNIQUE,
    title text NOT NULL, summary text NOT NULL DEFAULT '', details text NOT NULL DEFAULT '',
    status text NOT NULL DEFAULT 'Em estudo', track text NOT NULL DEFAULT 'Investigação',
    priority text NOT NULL DEFAULT 'Normal', created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now())`);
  await query(`CREATE TABLE IF NOT EXISTS nm_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(), project_id uuid NOT NULL REFERENCES nm_projects(id) ON DELETE RESTRICT,
    kind text NOT NULL CHECK(kind IN ('ideia','tarefa','marco','nota')),
    title text NOT NULL, body text NOT NULL DEFAULT '', state text NOT NULL DEFAULT 'Aberto',
    created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now())`);
  await query(`CREATE TABLE IF NOT EXISTS nm_documents (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(), project_id uuid NOT NULL REFERENCES nm_projects(id) ON DELETE RESTRICT,
    title text NOT NULL,url text NOT NULL,kind text NOT NULL DEFAULT 'Referência',created_at timestamptz NOT NULL DEFAULT now())`);
  await query(`CREATE TABLE IF NOT EXISTS nm_audit (
    id bigserial PRIMARY KEY, operation text NOT NULL, entity text NOT NULL,
    entity_id text, at timestamptz NOT NULL DEFAULT now())`);
  await query(`CREATE INDEX IF NOT EXISTS nm_items_project ON nm_items(project_id)`);
  await query(`CREATE INDEX IF NOT EXISTS nm_documents_project ON nm_documents(project_id)`);
  await query(`CREATE INDEX IF NOT EXISTS nm_sessions_expire ON nm_sessions(expires_at)`);
  await query(`INSERT INTO nm_projects(slug,title,summary,details,status,track,priority) VALUES
   ('sterion-core','STERION CORE','Câmara de tratamento fechada de calçado.','Geometria experimental V0.9 e auditoria REV10; processo antimicrobiano ainda por demonstrar.','Engenharia / testes pendentes','Descontaminação','Alta'),
   ('sterion-insert','STERION INSERT','Dois insertos compactos e base externa comum.','REV11 P1-M0: STEP/STL experimentais e 18 fixações modeladas; tratamento não validado.','Engenharia / testes pendentes','Descontaminação','Alta'),
   ('scan2cnc','SCAN2CNC','Digitalização espacial e fabrico modular.','Sistema próprio do grupo NOVAMATRA; grua/gantry modular de estrutura imprimível em 3D.','Desenvolvimento','Fabricação','Alta'),
   ('arcvault-step','ARCVAULT STEP','Estudo de recuperação de energia associada à marcha.','Objetivos de potência ainda não demonstrados fisicamente.','Investigação','Energia','Normal'),
   ('novamatra-c4','NOVAMATRA C4','Investigação de suspensão automóvel ativa com quatro apoios coordenados.','Conceito em investigação: estabilização inercial da carroçaria, comparação controlada com sistemas de referência e avaliação de aderência, limites físicos e energia. Modelo computacional inicial disponível; não existem protótipo físico, ensaios em estrada, homologação ou vantagem industrial demonstrada. Analisar anterioridade e propriedade intelectual antes de qualquer divulgação técnica diferenciadora.','Investigação','Mobilidade automóvel','Alta')
   ON CONFLICT(slug) DO NOTHING`);
}
export async function audit(operation, entity, id=''){await query('INSERT INTO nm_audit(operation,entity,entity_id) VALUES($1,$2,$3)',[operation,entity,String(id)]);} 