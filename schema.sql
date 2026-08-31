CREATE TABLE IF NOT EXISTS registros (
  id TEXT PRIMARY KEY,
  tipo TEXT,
  patrimonio TEXT,
  patrimonio_key TEXT,
  descricao TEXT,
  local TEXT,
  link TEXT,
  criado_em TEXT,
  atualizado_em TEXT,
  dispositivo TEXT,
  foto_url TEXT
);

CREATE INDEX IF NOT EXISTS idx_patrimonio_key ON registros(patrimonio_key);
CREATE INDEX IF NOT EXISTS idx_atualizado_em ON registros(atualizado_em);
