/* Estrutura de dados do sistema de estudo.
   Cada arquivo em data/ registra uma matéria (M) e suas questões (Q). */
window.CONC = { materias: [], questoes: [] };

/* Níveis de escolaridade. Cada tópico tem a lista nv de níveis em que aparece.
   Por padrão: médio e superior; os tópicos abaixo também entram no fundamental. */
CONC.niveis = [
  { id: 'fundamental', nome: 'Ensino Fundamental', desc: 'Cargos de nível fundamental (ex.: SEMUSA). Conteúdo básico: português, matemática, noções de legislação e atendimento.' },
  { id: 'medio', nome: 'Ensino Médio', desc: 'Cargos de nível médio e técnico (ex.: Agente de Secretaria Escolar da SEMED). Prova completa, com secretaria escolar.' },
  { id: 'superior', nome: 'Ensino Superior', desc: 'Cargos de nível superior. Mesma base do médio, mais redação discursiva e orientação para os Específicos do seu cargo.' }
];
var NV_FUND = ['portugues/interpretacao', 'portugues/classes', 'portugues/concordancia', 'portugues/pontuacao', 'portugues/ortografia',
  'logica/porcentagem', 'logica/sequencias', 'logica/conjuntos', 'legislacao/cf-art37', 'legislacao/servidores', 'legislacao/transparencia-etica',
  'especificos/atendimento', 'especificos/patrimonio-materiais', 'gerais/historia-ro', 'gerais/geografia-ro', 'gerais/economia-ro', 'gerais/atualidades'];

/* Concursos de Porto Velho/RO 2026 (levantamento de 10/10/2026; confirmar sempre no edital oficial).
   niveis = níveis de escolaridade oferecidos; prova = data/hora (null se ainda sem data oficial). */
CONC.concursos = [
  { id: 'semed', nome: 'SEMED', completo: 'Prefeitura de Porto Velho - Educação (SEMED)', banca: 'IBGP', niveis: ['medio', 'superior'], prova: '2026-12-06T09:15:00-04:00',
    status: 'Edital nº 24/2026 publicado (29/09/2026). Inscrições de 13/10 a 11/11/2026.', busca: 'https://www.ibgpconcursos.com.br' },
  { id: 'semusa', nome: 'SEMUSA', completo: 'Prefeitura de Porto Velho - Saúde (SEMUSA)', banca: 'IBGP', niveis: ['fundamental', 'medio', 'superior'], prova: '2026-12-13T14:45:00-04:00',
    status: 'Edital nº 25/2026 segundo o levantamento (conferir). Prova prevista 13/12; nível fundamental, médio e técnico à tarde, horário por cargo A CONFIRMAR.', busca: 'https://www.ibgpconcursos.com.br' },
  { id: 'ipam', nome: 'IPAM', completo: 'Instituto de Previdência dos Servidores de Porto Velho (IPAM)', banca: 'IBADE', niveis: ['medio', 'superior'], prova: null,
    status: 'Edital não confirmado até 10/10/2026 (previsto para setembro). Prova objetiva de 80 questões prevista até dezembro.', busca: 'https://www.google.com/search?q=concurso+IPAM+Porto+Velho+2026+IBADE+edital' },
  { id: 'sesau', nome: 'SESAU-RO', completo: 'Secretaria de Estado da Saúde de Rondônia (SESAU)', banca: 'IDECAN', niveis: ['fundamental', 'medio', 'superior'], prova: null,
    status: 'Sem edital e sem data oficial (previsão de edital até outubro de 2026). Níveis A CONFIRMAR.', busca: 'https://www.google.com/search?q=concurso+SESAU+RO+2026+IDECAN+edital' }
];

/* M: registra uma matéria com seus tópicos */
function M(mat) {
  mat.topicos.forEach(function (t) {
    if (!t.nv) t.nv = NV_FUND.indexOf(mat.id + '/' + t.id) >= 0 ? ['fundamental', 'medio', 'superior'] : ['medio', 'superior'];
  });
  CONC.materias.push(mat);
}

/* Q: registra uma questão original
   m = id da matéria, t = id do tópico, n = nível (1 fácil, 2 médio, 3 difícil)
   alts = 5 alternativas, g = índice do gabarito (0 a 4), e = explicação */
var __qc = {};
function Q(m, t, n, enun, alts, g, e) {
  var k = m + '-' + t;
  __qc[k] = (__qc[k] || 0) + 1;
  CONC.questoes.push({ id: k + '-' + __qc[k], m: m, t: t, n: n, q: enun, a: alts, g: g, e: e });
}

/* Datas (fonte: Edital nº 24/2026 SEMED e levantamento de 10/10/2026; conferir no edital oficial) */
CONC.provas = [
  { id: 'semed', nome: 'SEMED (IBGP)', data: '2026-12-06T09:15:00-04:00' },
  { id: 'semusa', nome: 'SEMUSA (IBGP)', data: '2026-12-13T14:45:00-04:00' }
];

/* Distribuição por nível. Médio = prova SEMED Agente de Secretaria Escolar (edital 24/2026, confirmada).
   Fundamental e superior: ESTIMATIVA, pois não li os editais desses cargos (A CONFIRMAR NO EDITAL). */
CONC.dist = {
  medio: { q: { portugues: 10, logica: 10, legislacao: 10, especificos: 15, gerais: 5 }, confirmada: true },
  fundamental: { q: { portugues: 10, logica: 10, legislacao: 5, especificos: 5, gerais: 5 }, confirmada: false },
  superior: { q: { portugues: 10, logica: 10, legislacao: 10, especificos: 15, gerais: 5 }, confirmada: false }
};
