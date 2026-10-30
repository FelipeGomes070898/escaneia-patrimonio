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

/* Concursos de Porto Velho/RO 2026 (atualizado em 29/10/2026 a partir de sites de notícias e preparatórios; confirmar sempre no edital oficial da banca).
   niveis = níveis de escolaridade oferecidos; prova = data/hora (null se ainda sem data oficial). */
CONC.concursos = [
  { id: 'semed', cidade: 'Porto Velho/RO', esfera: 'municipal', nome: 'SEMED', completo: 'Prefeitura de Porto Velho - Educação (SEMED)', banca: 'IBGP', niveis: ['medio', 'superior'], prova: '2026-12-06T09:15:00-04:00',
    status: 'Edital nº 24/2026 publicado em 29/09/2026: 430 vagas (165 imediatas + 265 cadastro de reserva), médio e superior. Inscrições de 13/10 a 11/11/2026 (pagamento até 12/11), taxa R$ 90 (médio) e R$ 130 (superior). Prova objetiva em 06/12/2026 (alguns sites chamam de data provável).', busca: 'https://www.ibgpconcursos.com.br' },
  { id: 'semusa', cidade: 'Porto Velho/RO', esfera: 'municipal', nome: 'SEMUSA', completo: 'Prefeitura de Porto Velho - Saúde (SEMUSA)', banca: 'IBGP', niveis: ['fundamental', 'medio', 'superior'], prova: '2026-12-13T14:45:00-04:00',
    status: 'Edital nº 25/2026 publicado: 2.248 vagas (641 imediatas + 1.607 cadastro de reserva), fundamental, médio/técnico e superior. Inscrições de 13/10 a 11/11/2026 (pagamento até 12/11), taxas R$ 90 (fundamental), R$ 105 (médio/técnico) e R$ 140 (superior). Prova objetiva prevista para 13/12/2026; horário por cargo A CONFIRMAR NO EDITAL. Prova de títulos para quem for convocado.', busca: 'https://www.ibgpconcursos.com.br' },
  { id: 'ipam', cidade: 'Porto Velho/RO', esfera: 'municipal', nome: 'IPAM', completo: 'Instituto de Previdência dos Servidores de Porto Velho (IPAM)', banca: 'IBADE', niveis: ['medio', 'superior'], prova: '2027-02-21',
    status: 'Edital publicado (banca IBADE): cerca de 70 a 71 vagas imediatas mais cadastro de reserva, médio e superior, salários até cerca de R$ 5 mil. Inscrições de 03/11 (10h) a 07/12/2026 (23h59) no site do IBADE; taxas R$ 105 (médio) e R$ 140 (superior). Provas previstas para 21 e 28/02/2027 (horário A CONFIRMAR NO EDITAL).', busca: 'https://www.google.com/search?q=concurso+IPAM+Porto+Velho+2026+IBADE+edital' ,
    /* estrutura segundo notícias (a CONFIRMAR NO EDITAL): 80 questões; Informática e Administração Pública entram em Específicos aqui */
    dist: { q: { portugues: 10, logica: 5, legislacao: 5, especificos: 60 }, confirmada: false } },
  { id: 'sesau', cidade: 'Rondônia (estado)', esfera: 'estadual', nome: 'SESAU-RO', completo: 'Secretaria de Estado da Saúde de Rondônia (SESAU)', banca: 'IDECAN', niveis: ['medio', 'superior'], prova: null,
    status: 'Banca IDECAN definida (Diário Oficial de 20/08/2026). Projeto prevê cerca de 2.395 vagas (médio, técnico e superior), mas o edital ainda não foi confirmado como publicado até 29/10/2026. Níveis e datas A CONFIRMAR.', busca: 'https://www.google.com/search?q=concurso+SESAU+RO+2026+IDECAN+edital' },
  { id: 'pf', cidade: 'Brasil (nacional)', esfera: 'federal', nome: 'Polícia Federal', completo: 'Polícia Federal - cargos policiais (Agente, Escrivão e Papiloscopista)', banca: 'Cebraspe', niveis: ['superior'], prova: null,
    status: 'Último concurso: edital de 2025 (1.000 vagas: 630 agente, 160 escrivão, 21 papiloscopista, 120 delegado e 69 perito), banca Cebraspe, inscrições de 26/05 a 17/06/2025, taxa de R$ 180 para agente, escrivão e papiloscopista, provas em 27/07/2025. Novo edital: ainda não confirmado em fonte oficial (sites falam em cerca de 1.500 vagas, sem confirmação). Conteúdo e nº de itens A CONFIRMAR NO EDITAL.', busca: 'https://www.cebraspe.org.br',
    /* estrutura ESTIMADA (não li edital): número de questões por matéria */
    dist: { q: { portugues: 15, logica: 10, 'pf-info': 10, 'pf-const': 10, 'pf-adm': 10, 'pf-penal': 15, 'pf-proc': 10, 'pf-leis': 10 }, confirmada: false } }
];

/* Categorias (esferas) para organizar a lista de concursos */
CONC.esferas = [
  { id: 'municipal', nome: 'Municipal', icone: '🏙️' },
  { id: 'estadual', nome: 'Estadual', icone: '🏛️' },
  { id: 'federal', nome: 'Federal', icone: '🇧🇷' }
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

/* X: comentário de cada alternativa (A a E) de uma questão, pelo id da questão.
   Aparece na correção: por que a alternativa certa está certa e por que cada uma das outras não serve. */
CONC.x = {};
function X(id, arr) { CONC.x[id] = arr; }

/* Datas (fonte: Edital nº 24/2026 SEMED e notícias de 29/10/2026; conferir no edital oficial) */
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

/* Perfil de cada banca: como a prova é montada e como pontuar. Fontes: editais lidos e notícias de 30/10/2026; confirme sempre no edital do concurso.
   formato: 'm5' = múltipla escolha com 5 alternativas; 'ce' = itens Certo/Errado.
   minQ = minutos por questão usados no simulado; liq = true se o erro desconta ponto. */
CONC.bancas = {
  IBGP: { nome: 'IBGP', formato: 'm5', liq: false, minQ: 3.6, tipo: 'Múltipla escolha, 5 alternativas, 1 correta (Edital SEMED 24/2026). Sem desconto por erro previsto no corpo do edital.',
    nota: 'Aprovação: no mínimo 50% do total de pontos (SEMED, item 10.1).',
    estilo: ['Enunciados diretos e curtos, mas com bastante leitura ao longo da prova.', 'Alternativas que mudam por uma palavra (sempre, nunca, apenas, somente): leia a palavra, não só a ideia.', 'Nível moderado: cobra conceito e aplicação, mais que decoreba.', 'Cada matéria tem peso: Específicos (15) e Português, Lógica e Legislação (10 cada) decidem a nota.'],
    estrategia: ['Sem desconto por erro: <b>nunca deixe em branco</b>. Se não souber, elimine e chute.', 'Faça primeiro Português e Específicos (mais pontos por minuto), deixe Raciocínio Lógico longo para o fim.', 'Reserve 15 minutos para passar tudo para a Folha de Respostas e conferir; rasura ou 2 marcações anulam.', 'Ritmo de 3,6 min por questão (50 questões em 3 h).'] },
  IBADE: { nome: 'IBADE', formato: 'm5', liq: false, minQ: 3, tipo: 'Múltipla escolha, 5 alternativas, 1 correta, segundo notícias sobre o IPAM (80 questões: 30 gerais e 50 específicas, cerca de 130 pontos).',
    nota: 'Segundo notícias: mínimo de 50% dos pontos e não zerar nenhuma disciplina. Confirmar no edital.',
    estilo: ['Prova longa (80 questões em torno de 4 h): resistência importa.', 'Metade da prova é Conhecimentos Específicos do seu cargo: é onde está a nota.', 'Matérias gerais curtas (5 questões cada): errar tudo numa delas pode eliminar, por isso não deixe disciplina zerada.', 'Provas discursiva (nível superior) e de títulos só depois da objetiva.'],
    estrategia: ['Não zere nenhuma disciplina: garanta ao menos alguns pontos em cada uma.', 'Gaste o tempo nas Específicas (50 questões): comece por elas se for sua força.', 'Treine blocos de 80 questões para criar resistência.', 'Sem desconto por erro citado nas fontes: confirmar no edital; se não houver, marque todas.'] },
  IDECAN: { nome: 'IDECAN', formato: 'm5', liq: false, minQ: 3.6, tipo: 'Múltipla escolha, em geral 5 alternativas e 1 correta (fontes de preparação). Sem nota negativa por erro, em geral.',
    nota: 'A nota mínima e as regras de eliminação vêm do edital de cada concurso: A CONFIRMAR NO EDITAL.',
    estilo: ['Cobra interpretação e leitura atenta; textos longos em Português.', 'Dificuldade média a alta em grandes concursos.', 'Mistura enunciados curtos e longos conforme o concurso.', 'Gosta de alternativas parecidas que testam detalhe do texto ou da lei.'],
    estrategia: ['Em geral não há desconto por erro: marque todas, mas confirme no edital.', 'Treine leitura de textos longos com cronômetro.', 'Estude a lei seca e depois resolva questões para fixar detalhes.', 'Ritmo de cerca de 3,6 min por questão (ajuste ao edital).'] },
  Cebraspe: { nome: 'Cebraspe', formato: 'ce', liq: true, minQ: 2.5, tipo: 'Itens Certo ou Errado (PF 2025: 120 itens). Segundo notícias sobre o edital, cada item certo vale +1, errado −1 e em branco 0: <b>um erro anula um acerto</b>.',
    nota: 'Em provas da PF há também notas mínimas por bloco e nota total mínima; os números exatos dependem do edital: A CONFIRMAR NO EDITAL.',
    estilo: ['Cada item é uma afirmação: você julga Certo ou Errado.', 'Itens com "sempre", "nunca", "somente", "todos" costumam estar errados; trocar uma palavra muda o sentido.', 'Cobra texto da lei, súmulas e jurisprudência dos tribunais superiores.', 'Pegadinhas de detalhe: números, prazos, penas e exceções.'],
    estrategia: ['<b>Chute só com mais de 50% de confiança.</b> Se a dúvida for 50 a 50, o esperado é zero: deixe em branco.', 'Marque primeiro o que sabe com segurança; volte aos duvidosos.', 'Leia o item inteiro: a pegadinha costuma estar numa palavra.', 'Treine muito: o acerto líquido (certos − errados) é o que conta.'] }
};
