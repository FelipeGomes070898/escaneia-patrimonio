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
  { id: 'semed', fase: 'abertas', cidade: 'Porto Velho/RO', esfera: 'municipal', nome: 'SEMED', completo: 'Prefeitura de Porto Velho - Educação (SEMED)', banca: 'IBGP', niveis: ['medio', 'superior'], prova: '2026-12-06T09:15:00-04:00',
    status: 'Edital nº 24/2026 publicado em 29/09/2026: 430 vagas (165 imediatas + 265 cadastro de reserva), médio e superior. Inscrições de 13/10 a 11/11/2026 (pagamento até 12/11), taxa R$ 90 (médio) e R$ 130 (superior). Prova objetiva em 06/12/2026 (alguns sites chamam de data provável).', busca: 'https://www.ibgpconcursos.com.br' },
  { id: 'semusa', fase: 'abertas', cidade: 'Porto Velho/RO', esfera: 'municipal', nome: 'SEMUSA', completo: 'Prefeitura de Porto Velho - Saúde (SEMUSA)', banca: 'IBGP', niveis: ['fundamental', 'medio', 'superior'], prova: '2026-12-13T14:45:00-04:00',
    status: 'Edital nº 25/2026 publicado: 2.248 vagas (641 imediatas + 1.607 cadastro de reserva), fundamental, médio/técnico e superior. Inscrições de 13/10 a 11/11/2026 (pagamento até 12/11), taxas R$ 90 (fundamental), R$ 105 (médio/técnico) e R$ 140 (superior). Prova objetiva prevista para 13/12/2026; horário por cargo A CONFIRMAR NO EDITAL. Prova de títulos para quem for convocado.', busca: 'https://www.ibgpconcursos.com.br' },
  { id: 'ipam', fase: 'publicado', cidade: 'Porto Velho/RO', esfera: 'municipal', nome: 'IPAM', completo: 'Instituto de Previdência dos Servidores de Porto Velho (IPAM)', banca: 'IBADE', niveis: ['medio', 'superior'], prova: '2027-02-21',
    status: 'Edital publicado (banca IBADE): cerca de 70 a 71 vagas imediatas mais cadastro de reserva, médio e superior, salários até cerca de R$ 5 mil. Inscrições de 03/11 (10h) a 07/12/2026 (23h59) no site do IBADE; taxas R$ 105 (médio) e R$ 140 (superior). Provas previstas para 21 e 28/02/2027 (horário A CONFIRMAR NO EDITAL).', busca: 'https://www.google.com/search?q=concurso+IPAM+Porto+Velho+2026+IBADE+edital' ,
    /* estrutura segundo notícias (a CONFIRMAR NO EDITAL): 80 questões; Informática e Administração Pública entram em Específicos aqui */
    dist: { q: { portugues: 10, logica: 5, legislacao: 5, especificos: 60 }, confirmada: false } },
  { id: 'sesau', fase: 'previsto', cidade: 'Rondônia (estado)', esfera: 'estadual', nome: 'SESAU-RO', completo: 'Secretaria de Estado da Saúde de Rondônia (SESAU)', banca: 'IDECAN', niveis: ['medio', 'superior'], prova: null,
    status: 'Banca IDECAN definida (Diário Oficial de 20/08/2026). Projeto prevê cerca de 2.395 vagas (médio, técnico e superior), mas o edital ainda não foi confirmado como publicado até 29/10/2026. Níveis e datas A CONFIRMAR.', busca: 'https://www.google.com/search?q=concurso+SESAU+RO+2026+IDECAN+edital' },
  { id: 'pf', fase: 'previsto', trilhas: ['policial'], cidade: 'Brasil (nacional)', esfera: 'federal', nome: 'Polícia Federal', completo: 'Polícia Federal - cargos policiais (Agente, Escrivão e Papiloscopista)', banca: 'Cebraspe', niveis: ['superior'], prova: null,
    status: 'Último concurso: edital de 2025 (1.000 vagas: 630 agente, 160 escrivão, 21 papiloscopista, 120 delegado e 69 perito), banca Cebraspe, inscrições de 26/05 a 17/06/2025, taxa de R$ 180 para agente, escrivão e papiloscopista, provas em 27/07/2025. Novo edital: ainda não confirmado em fonte oficial (sites falam em cerca de 1.500 vagas, sem confirmação). Conteúdo e nº de itens A CONFIRMAR NO EDITAL.', busca: 'https://www.cebraspe.org.br',
    /* estrutura ESTIMADA (não li edital): número de questões por matéria */
    dist: { q: { portugues: 15, logica: 10, 'pf-info': 10, 'pf-const': 10, 'pf-adm': 10, 'pf-penal': 15, 'pf-proc': 10, 'pf-leis': 10 }, confirmada: false } },
  /* ---- Federais previstos ---- */
  { id: 'prf', fase: 'previsto', trilhas: ['policial', 'transito'], cidade: 'Brasil (nacional)', esfera: 'federal', nome: 'PRF', completo: 'Polícia Rodoviária Federal (Policial Rodoviário Federal; Administrativo)', banca: 'A definir', modelo: 'Cebraspe', niveis: ['superior'], prova: null,
    status: 'Edital ainda não publicado (28/10/2026). Pedido de cerca de 511 a 533 vagas (263 a 269 de policial e cerca de 248 administrativas; os números variam entre sites). Depende de autorização do governo federal e da escolha da banca. Historicamente a prova foi do Cebraspe, por isso o treino usa o modelo Certo/Errado. Validade do concurso de 2021 citada até 21/12/2026. Datas e conteúdo A CONFIRMAR NO EDITAL.', busca: 'https://www.google.com/search?q=concurso+PRF+2026+edital',
    dist: { q: { portugues: 15, logica: 10, 'pf-info': 5, 'pf-const': 10, 'pf-adm': 10, 'pf-penal': 10, 'pf-proc': 10, 'pf-leis': 5, 'prf-transito': 15 }, confirmada: false } },
  { id: 'receita', fase: 'previsto', trilhas: ['base'], cidade: 'Brasil (nacional)', esfera: 'federal', nome: 'Receita Federal', completo: 'Receita Federal: Auditor-Fiscal e Analista-Tributário', banca: 'A definir', niveis: ['superior'], prova: null,
    status: 'Autorizado com 146 vagas (116 Analista-Tributário e 30 Auditor-Fiscal), segundo notícias. Banca em definição (sites apostam em FGV, sem confirmação). Edital previsto entre dezembro de 2026 e janeiro de 2027. Os Específicos do cargo (Direito Tributário, Contabilidade etc.) ainda não estão neste site.', busca: 'https://www.google.com/search?q=concurso+Receita+Federal+2026+edital',
    dist: { q: { portugues: 20, logica: 10, 'pf-info': 10, 'pf-const': 10, 'pf-adm': 10 }, confirmada: false } },
  { id: 'bacen', fase: 'previsto', trilhas: ['base'], cidade: 'Brasil (nacional)', esfera: 'federal', nome: 'Banco Central', completo: 'Banco Central do Brasil (Auditor, Técnico e Procurador)', banca: 'A definir', modelo: 'Cebraspe', niveis: ['medio', 'superior'], prova: null,
    status: 'Autorizado com 170 vagas (cerca de 100 Auditor, 50 Técnico e 20 Procurador, segundo notícias). Prazo para publicar o edital: cerca de 03/01/2027. Banca ainda sem confirmação (a meta era contratar até 16/10/2026; o Cebraspe é a escolha usual). Os Específicos do cargo ainda não estão neste site.', busca: 'https://www.google.com/search?q=concurso+Banco+Central+2026+edital',
    dist: { q: { portugues: 20, logica: 10, 'pf-info': 10, 'pf-const': 10, 'pf-adm': 10 }, confirmada: false } },
  { id: 'inss', fase: 'previsto', trilhas: ['base'], cidade: 'Brasil (nacional)', esfera: 'federal', nome: 'INSS', completo: 'Instituto Nacional do Seguro Social (Técnico e Analista do Seguro Social)', banca: 'A definir', modelo: 'Cebraspe', niveis: ['medio', 'superior'], prova: null,
    status: 'Pedido de cerca de 8.500 a 10.000 vagas, sem autorização confirmada na maioria das fontes; banca não confirmada (um site cita Cebraspe). Um site diz que o edital já saiu (1.000 vagas, prova em 27/11/2026), mas as outras fontes não confirmam: conferir no site do Cebraspe e do INSS. Os Específicos (Direito Previdenciário etc.) ainda não estão neste site.', busca: 'https://www.google.com/search?q=concurso+INSS+2026+edital',
    dist: { q: { portugues: 20, logica: 10, 'pf-info': 10, 'pf-const': 10, 'pf-adm': 10 }, confirmada: false } },
  { id: 'cgu', fase: 'previsto', trilhas: ['base'], cidade: 'Brasil (nacional)', esfera: 'federal', nome: 'CGU', completo: 'Controladoria-Geral da União (Auditor Federal de Finanças e Controle)', banca: 'Cebraspe', niveis: ['superior'], prova: null,
    status: '60 vagas autorizadas; edital esperado até dezembro de 2026. Uma fonte aponta o Cebraspe como banca; uma fonte diz que as inscrições já estariam abertas, o que as outras não confirmam: conferir no site do Cebraspe. Os Específicos do cargo ainda não estão neste site.', busca: 'https://www.cebraspe.org.br',
    dist: { q: { portugues: 20, logica: 10, 'pf-info': 10, 'pf-const': 10, 'pf-adm': 10 }, confirmada: false } },
  { id: 'tcu', fase: 'previsto', trilhas: ['base'], cidade: 'Brasil (nacional)', esfera: 'federal', nome: 'TCU', completo: 'Tribunal de Contas da União (Auditor Federal de Controle Externo)', banca: 'A definir', modelo: 'Cebraspe', niveis: ['superior'], prova: null,
    status: 'Concurso anunciado para 2026 com 100 vagas de Auditor Federal de Controle Externo (área geral), segundo notícias. Banca e datas A CONFIRMAR. Os Específicos do cargo ainda não estão neste site.', busca: 'https://www.google.com/search?q=concurso+TCU+2026+edital',
    dist: { q: { portugues: 20, logica: 10, 'pf-info': 10, 'pf-const': 10, 'pf-adm': 10 }, confirmada: false } },
  { id: 'ibge', fase: 'previsto', trilhas: ['base'], cidade: 'Brasil (nacional)', esfera: 'federal', nome: 'IBGE', completo: 'IBGE (Agente e Supervisor de Pesquisa)', banca: 'A definir', niveis: ['medio'], prova: null,
    status: 'Para 2027, uma fonte fala em 325 vagas de Agente e Supervisor de Pesquisa; outra diz que ainda não há autorização. Banca e datas A CONFIRMAR.', busca: 'https://www.google.com/search?q=concurso+IBGE+2027+edital',
    dist: { q: { portugues: 20, logica: 10, 'pf-info': 10, 'pf-const': 5, 'pf-adm': 5 }, confirmada: false } },
  /* ---- Estaduais (Rondônia) ---- */
  { id: 'pcro', fase: 'andamento', trilhas: ['policial'], cidade: 'Rondônia (estado)', esfera: 'estadual', nome: 'PC-RO', completo: 'Polícia Civil de Rondônia (Agente, Escrivão, Datiloscopista, Delegado e outros)', banca: 'Cebraspe', niveis: ['superior'], prova: null,
    status: 'Último concurso: Edital nº 02/2024/PC-DGPC, 319 vagas (145 Agente, 100 Escrivão, 40 Datiloscopista, 14 Técnico em Necropsia, 10 Delegado e 10 Médico-Legista), banca Cebraspe, resultado final homologado. Em 2026 há convocações para curso de formação (29/09 e 14/10/2026). Novo edital: sem confirmação. Nível de cada cargo: A CONFIRMAR NO EDITAL.', busca: 'https://www.cebraspe.org.br/concursos/pc_ro_22',
    dist: { q: { portugues: 15, logica: 10, 'pf-info': 10, 'pf-const': 10, 'pf-adm': 10, 'pf-penal': 15, 'pf-proc': 10, 'pf-leis': 10 }, confirmada: false } },
  { id: 'pmro', fase: 'abertas', trilhas: ['base'], cidade: 'Rondônia (estado)', esfera: 'estadual', nome: 'PM-RO / Bombeiros (voluntário)', completo: 'SESDEC-RO: prestação voluntária de serviços administrativos na PM e nos Bombeiros', banca: 'IBADE', niveis: ['medio'], prova: '2026-12-06',
    status: 'Não é concurso para Soldado. 332 vagas de cadastro reserva (302 na PM e 30 nos Bombeiros), auxílio mensal de R$ 1.215, ensino médio completo. Inscrições até 17/11/2026 no site do IBADE; prova objetiva prevista para 06/12/2026. Estrutura da prova A CONFIRMAR NO EDITAL. A trilha do site traz as matérias comuns (Português, Lógica, Constitucional, Administrativo e Informática).', busca: 'https://www.ibade.org.br',
    dist: { q: { portugues: 20, logica: 10, 'pf-info': 10, 'pf-const': 5, 'pf-adm': 5 }, confirmada: false } },
  { id: 'sefin', fase: 'previsto', trilhas: ['base'], cidade: 'Rondônia (estado)', esfera: 'estadual', nome: 'SEFIN-RO', completo: 'Secretaria de Estado de Finanças de Rondônia (Auditor Fiscal e outros)', banca: 'A definir', niveis: ['superior'], prova: null,
    status: 'O sindicato dos auditores fala em novo concurso, mas as fontes não confirmam edital nem banca. A CONFIRMAR. Os Específicos do cargo (Tributário, Contabilidade) ainda não estão neste site.', busca: 'https://www.google.com/search?q=concurso+SEFIN+RO+2026',
    dist: { q: { portugues: 20, logica: 10, 'pf-info': 10, 'pf-const': 10, 'pf-adm': 10 }, confirmada: false } },
  /* ---- Municipais ---- */
  { id: 'gcmpvh', fase: 'andamento', trilhas: ['policial'], cidade: 'Porto Velho/RO', esfera: 'municipal', nome: 'Guarda Municipal de Porto Velho', completo: 'Guarda Civil Municipal de Porto Velho (GCM)', banca: 'IDECAN', niveis: ['medio', 'superior'], prova: '2026-09-20',
    status: 'Edital nº 01/2026: 50 vagas imediatas e 100 de cadastro de reserva, remuneração de até R$ 6.312,50; inscrições encerradas em 17/08/2026 (taxa R$ 140); prova objetiva em 20/09/2026 e resultado preliminar divulgado, segundo notícias. Nível exigido: A CONFIRMAR NO EDITAL (uma fonte diz superior).', busca: 'https://www.idecan.org.br',
    dist: { q: { portugues: 15, logica: 10, 'pf-info': 5, 'pf-const': 10, 'pf-adm': 10, 'pf-penal': 10, 'pf-proc': 5, 'pf-leis': 5 }, confirmada: false } },
  { id: 'vilhena', fase: 'previsto', trilhas: ['base', 'transito'], cidade: 'Vilhena/RO', esfera: 'municipal', nome: 'Prefeitura de Vilhena', completo: 'Prefeitura de Vilhena: Agente de Trânsito', banca: 'IBGP', niveis: ['medio'], prova: null,
    status: 'Banca IBGP definida para o concurso de Agente de Trânsito, segundo notícias; edital não confirmado. Uma fonte cita edital nº 2/2026 com 30 vagas, sem confirmação. A trilha traz as matérias comuns e o Código de Trânsito.', busca: 'https://www.ibgpconcursos.com.br',
    dist: { q: { portugues: 15, logica: 10, 'pf-info': 5, 'pf-const': 5, 'pf-adm': 5, 'prf-transito': 20 }, confirmada: false } },
  { id: 'candeias', fase: 'publicado', trilhas: ['base'], cidade: 'Candeias do Jamari/RO', esfera: 'municipal', nome: 'Câmara de Candeias do Jamari', completo: 'Câmara Municipal de Candeias do Jamari (Edital nº 1/2026)', banca: 'A definir', niveis: ['medio', 'superior'], prova: null,
    status: 'Edital nº 1/2026 com 17 vagas e salários de até R$ 3.500,00, segundo notícias. Banca, datas e cargos não informados nas fontes consultadas: A CONFIRMAR NO EDITAL.', busca: 'https://www.google.com/search?q=concurso+C%C3%A2mara+Candeias+do+Jamari+2026',
    dist: { q: { portugues: 20, logica: 10, 'pf-info': 10, 'pf-const': 5, 'pf-adm': 5 }, confirmada: false } }
];

/* Situação do edital (usada no filtro e nos cartões) */
CONC.fases = [
  { id: 'abertas', nome: 'Inscrições abertas' },
  { id: 'publicado', nome: 'Edital publicado' },
  { id: 'previsto', nome: 'Previsto (sem edital)' },
  { id: 'andamento', nome: 'Em andamento (prova/resultado)' }
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
  'A definir': { nome: 'A definir', formato: 'm5', liq: false, minQ: 3.6, tipo: 'Banca ainda não definida. Até sair o edital, o site treina no modelo genérico de múltipla escolha com 5 alternativas (ou no modelo indicado no cartão do concurso).',
    nota: 'Regras de pontuação, nota mínima e eliminação: A CONFIRMAR NO EDITAL quando sair.',
    estilo: ['Sem banca definida, o estilo exato é desconhecido.', 'As matérias comuns (Português, Raciocínio Lógico, Informática, Constitucional e Administrativo) costumam cair em qualquer banca.', 'Quando a banca for escolhida, estude as provas anteriores dela.'],
    estrategia: ['Estude já as matérias comuns: elas valem em qualquer banca.', 'Treine questões de interpretação e leitura atenta.', 'Acompanhe o Diário Oficial e o site do órgão para saber a banca.', 'Quando o edital sair, ajuste o treino ao formato e às regras da banca.'] },
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
