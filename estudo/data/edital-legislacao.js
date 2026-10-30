/* Tópicos de Legislação confirmados no Anexo IV (Edital nº 27/2026, retificação do Edital SEMED nº 24/2026, ensino médio).
   Carregado depois de legislacao.js; usa QX (definido em extra.js, carregado antes). */
(function () {
  var leg = CONC.materias.filter(function (m) { return m.id === 'legislacao'; })[0];
  var nv = ['medio', 'superior'];
  leg.topicos.push({
    id: 'cf-estrutura', titulo: 'CF: princípios, direitos (arts. 5º a 13) e Municípios (arts. 29 a 31, 38 e 39)', conf: true, nv: nv,
    busca: 'constituição federal arts 1 a 4 art 5 a 13 municípios arts 29 30 31 resumo concursos',
    contexto: '<p>O edital cobra partes da Constituição Federal que organizam o país, protegem direitos e explicam como o <b>município</b> funciona. É "lei seca": vale ler o texto, mas dá para dominar a lógica.</p>',
    basico: '<ul>' +
      '<li><b>Fundamentos (art. 1º):</b> soberania, cidadania, dignidade da pessoa humana, valores sociais do trabalho e da livre iniciativa, pluralismo político.</li>' +
      '<li><b>Poderes (art. 2º):</b> Legislativo, Executivo e Judiciário, independentes e harmônicos entre si.</li>' +
      '<li><b>Objetivos (art. 3º):</b> sociedade livre, justa e solidária; desenvolvimento nacional; erradicar a pobreza e reduzir desigualdades; promover o bem de todos sem preconceitos.</li>' +
      '<li><b>Direitos sociais (art. 6º):</b> educação, saúde, alimentação, trabalho, moradia, transporte, lazer, segurança, previdência social, proteção à maternidade e à infância e assistência aos desamparados.</li>' +
      '<li><b>Município (art. 29):</b> rege-se por <b>lei orgânica</b>; o prefeito, o vice e os vereadores têm mandato de <b>4 anos</b>. <b>Competências (art. 30):</b> legislar sobre assuntos de interesse local, suplementar a legislação, organizar serviços públicos locais e manter, com cooperação da União e do Estado, programas de <b>educação infantil e ensino fundamental</b>.</li>' +
      '<li><b>Fiscalização (art. 31):</b> a Câmara fiscaliza com o auxílio do Tribunal de Contas (parecer prévio) e o Executivo mantém controle interno.</li></ul>',
    aprofundado: '<ul>' +
      '<li><b>Art. 5º:</b> igualdade de todos perante a lei; legalidade (ninguém é obrigado a fazer ou deixar de fazer algo senão em virtude de lei); presunção de inocência; devido processo legal, contraditório e ampla defesa; inviolabilidade do domicílio, salvo flagrante, desastre, socorro ou ordem judicial durante o dia.</li>' +
      '<li><b>Arts. 12 e 13:</b> definem brasileiros natos e naturalizados; o <b>português</b> é o idioma oficial da República.</li>' +
      '<li><b>Art. 29-A:</b> fixa limites para a despesa total do Poder Legislativo municipal, conforme a população do município.</li>' +
      '<li><b>Art. 38:</b> servidor eleito prefeito é afastado do cargo; eleito vereador acumula se houver compatibilidade de horários, senão se afasta.</li>' +
      '<li><b>Art. 39:</b> exige regime jurídico e planos de carreira para a administração direta, autarquias e fundações.</li>' +
      '<li>Texto sujeito a emendas: confira a redação vigente no site do Planalto.</li></ul>'
  });
  leg.topicos.push({
    id: 'licitacoes', titulo: 'Lei de Licitações (Lei nº 14.133/2021)', conf: true, nv: nv,
    busca: 'lei 14133 2021 nova lei de licitações resumo modalidades pregão concorrência dispensa inexigibilidade',
    contexto: '<p>É a norma que diz <b>como o poder público compra e contrata</b>. Para quem trabalha em escola, aparece em compra de material, merenda e manutenção. A Lei nº 14.133/2021 substituiu a Lei nº 8.666/1993, a Lei do Pregão (10.520/2002) e o RDC.</p>',
    basico: '<ul>' +
      '<li><b>Modalidades (art. 28):</b> pregão, concorrência, concurso, leilão e diálogo competitivo. <b>Convite e tomada de preços deixaram de existir.</b></li>' +
      '<li><b>Pregão:</b> obrigatório para bens e serviços comuns (critério menor preço ou maior desconto).</li>' +
      '<li><b>Princípios (art. 5º):</b> legalidade, impessoalidade, moralidade, publicidade, eficiência, interesse público, probidade, igualdade, planejamento, transparência, vinculação ao edital, julgamento objetivo, segurança jurídica, economicidade, entre outros.</li>' +
      '<li><b>Licitação é a regra.</b> As exceções são a <b>dispensa</b> (art. 75, competição possível mas dispensada por lei, como contratações de baixo valor) e a <b>inexigibilidade</b> (art. 74, competição inviável, como fornecedor exclusivo).</li>' +
      '<li><b>Publicidade:</b> os atos são divulgados no <b>Portal Nacional de Contratações Públicas (PNCP)</b>.</li></ul>',
    aprofundado: '<ul>' +
      '<li><b>Fases (art. 17):</b> preparatória, divulgação do edital, apresentação de propostas e lances, julgamento, habilitação, recursal e homologação. Como regra, o <b>julgamento vem antes da habilitação</b>.</li>' +
      '<li>O processo é conduzido pelo <b>agente de contratação</b>, com apoio de equipe; no pregão, o agente é chamado de <b>pregoeiro</b>.</li>' +
      '<li>Os valores de dispensa por baixo valor são atualizados por decreto; confira o valor vigente em vez de decorar.</li>' +
      '<li>A Lei também prevê <b>sanções</b> a fornecedores (advertência, multa, impedimento de licitar e declaração de inidoneidade) e crimes em licitações, inseridos no Código Penal.</li></ul>'
  });
  leg.topicos.push({
    id: 'lbi', titulo: 'Lei Brasileira de Inclusão (Lei nº 13.146/2015)', conf: true, nv: nv,
    busca: 'lei brasileira de inclusão 13146 estatuto da pessoa com deficiência resumo educação acessibilidade',
    contexto: '<p>O Estatuto da Pessoa com Deficiência garante igualdade de condições e inclusão. Na escola, mexe com <b>matrícula, acessibilidade e atendimento</b>: tema certo de quem atende o público.</p>',
    basico: '<ul>' +
      '<li><b>Pessoa com deficiência (art. 2º):</b> quem tem impedimento de <b>longo prazo</b> de natureza física, mental, intelectual ou sensorial que, em interação com barreiras, pode obstruir sua participação plena na sociedade. A avaliação é <b>biopsicossocial</b>, feita por equipe multiprofissional.</li>' +
      '<li><b>Acessibilidade:</b> possibilidade de utilizar com segurança e autonomia espaços, serviços, informação e comunicação. <b>Desenho universal:</b> produtos e ambientes usáveis por todos.</li>' +
      '<li><b>Barreiras:</b> urbanísticas, arquitetônicas, nos transportes, nas comunicações e na informação, atitudinais e tecnológicas.</li>' +
      '<li><b>Atendimento prioritário (art. 9º):</b> assegurado à pessoa com deficiência.</li>' +
      '<li><b>Educação (arts. 27 e 28):</b> sistema educacional <b>inclusivo</b> em todos os níveis; projeto pedagógico com atendimento educacional especializado; <b>profissional de apoio escolar</b> quando necessário. Nas escolas privadas é vedado cobrar valor adicional pela inclusão.</li></ul>',
    aprofundado: '<ul>' +
      '<li><b>Tecnologia assistiva:</b> recursos e serviços que ampliam a autonomia (cadeira de rodas, leitor de tela, prancha de comunicação).</li>' +
      '<li><b>Capacidade legal (art. 84):</b> a pessoa com deficiência tem capacidade legal em igualdade de condições com as demais; a curatela é medida excepcional e proporcional.</li>' +
      '<li><b>Discriminação (art. 88):</b> praticar, induzir ou incitar discriminação em razão da deficiência é crime (reclusão de 1 a 3 anos e multa).</li>' +
      '<li>Recusar, cobrar valores adicionais ou suspender matrícula por motivo de deficiência também é conduta tipificada.</li></ul>'
  });
  leg.topicos.push({
    id: 'plano-carreira', titulo: 'Plano de Carreira dos Profissionais da Educação (Leis municipais nº 360/2009 e nº 391/2010)', conf: true, nv: nv,
    busca: 'Lei Municipal 360/2009 e 391/2010 Porto Velho plano de carreira cargos e remuneração profissionais da educação',
    contexto: '<p>Mostra como funcionam <b>cargos, carreira e salário</b> dos profissionais da educação da rede municipal de Porto Velho. O edital cita as duas leis, mas <b>os artigos cobrados não estão na lista</b>: leia o texto oficial.</p><p class="aviso"><b>A CONFIRMAR NO EDITAL:</b> quais artigos serão cobrados. O resumo abaixo trata dos conceitos gerais de plano de carreira, não do texto da lei local.</p>',
    basico: '<ul>' +
      '<li><b>Cargo:</b> conjunto de atribuições e responsabilidades previstas em lei, com número certo de vagas e denominação própria.</li>' +
      '<li><b>Carreira:</b> o conjunto de classes ou níveis em que o servidor pode avançar ao longo da vida funcional.</li>' +
      '<li><b>Progressão:</b> avanço do servidor dentro da carreira, em regra por tempo de serviço e avaliação ou por titulação.</li>' +
      '<li><b>Vencimento:</b> valor base do cargo; <b>remuneração</b> é o vencimento mais as vantagens permanentes.</li>' +
      '<li>Tratar pessoal da educação é tema de <b>lei municipal</b> (art. 39 da CF exige planos de carreira).</li></ul>',
    aprofundado: '<ul>' +
      '<li>Como estudar: baixe as Leis nº 360/2009 e nº 391/2010 no site da Prefeitura ou da Câmara de Porto Velho, marque os conceitos (cargo, classe, nível, progressão, gratificações) e os cargos de apoio.</li>' +
      '<li>Atenção às <b>atribuições</b> do cargo de Agente de Secretaria Escolar (Anexo II do edital): costumam virar questão de Específicos.</li></ul>'
  });
})();

QX(G, 'cf-estrutura', 1, 'Segundo o art. 2º da Constituição Federal, são Poderes da União, independentes e harmônicos entre si:',
  ['Executivo, Legislativo e Moderador', 'Legislativo, Executivo e Judiciário', 'Federal, Estadual e Municipal', 'Executivo, Judiciário e Ministério Público', 'Legislativo, Judiciário e Tribunal de Contas'], 1,
  'Art. 2º: Legislativo, Executivo e Judiciário.',
  ['O Poder Moderador existiu no Império, não na CF/88.', 'Correta: art. 2º da CF/88.', 'São esferas da federação, não Poderes.', 'O Ministério Público não é um dos três Poderes.', 'O Tribunal de Contas auxilia o Legislativo, não é um Poder.']);
QX(G, 'cf-estrutura', 2, 'No art. 6º da Constituição Federal, são direitos sociais, EXCETO:',
  ['educação', 'moradia', 'transporte', 'previdência social', 'propriedade industrial'], 4,
  'Propriedade industrial é direito individual (art. 5º, XXIX), não direito social do art. 6º.',
  ['Educação está no art. 6º.', 'Moradia está no art. 6º.', 'Transporte está no art. 6º.', 'Previdência social está no art. 6º.', 'Correta: é direito individual do art. 5º, não direito social.']);
QX(G, 'cf-estrutura', 2, 'Segundo o art. 30 da Constituição, compete aos Municípios, entre outras atribuições:',
  ['legislar sobre direito penal', 'manter, com cooperação da União e do Estado, programas de educação infantil e de ensino fundamental', 'declarar guerra', 'organizar a política nacional de defesa', 'emitir moeda'], 1,
  'Art. 30, VI.',
  ['Direito penal é de competência privativa da União.', 'Correta: art. 30, VI.', 'É competência da União.', 'É competência da União.', 'É competência da União.']);
QX(G, 'cf-estrutura', 2, 'Servidor público da administração direta eleito prefeito deverá:',
  ['acumular o cargo de servidor e o de prefeito', 'ser afastado do cargo, emprego ou função, optando pela sua remuneração', 'continuar trabalhando e receber as duas remunerações', 'renunciar ao concurso', 'ser demitido'], 1,
  'Art. 38, II: afasta-se do cargo e pode optar pela remuneração.',
  ['Só o vereador pode acumular, havendo compatibilidade de horários.', 'Correta: art. 38, II.', 'Não recebe as duas remunerações.', 'Não precisa renunciar ao concurso.', 'Não há demissão automática.']);
QX(G, 'licitacoes', 1, 'Na Lei nº 14.133/2021, o pregão é a modalidade adequada para:',
  ['obras de grande vulto', 'bens e serviços comuns', 'alienação de bens', 'escolha de trabalho técnico ou artístico', 'serviços exclusivamente intelectuais'], 1,
  'Art. 6º, XLI: pregão para aquisição de bens e serviços comuns.',
  ['Obras geralmente seguem concorrência.', 'Correta.', 'Alienação de bens pode ser leilão.', 'Isso é concurso.', 'Serviços intelectuais não são "comuns".']);
QX(G, 'licitacoes', 2, 'Deixaram de existir com a Lei nº 14.133/2021 as modalidades:',
  ['pregão e leilão', 'convite e tomada de preços', 'concorrência e concurso', 'diálogo competitivo e concurso', 'pregão e concorrência'], 1,
  'A nova lei não prevê convite nem tomada de preços.',
  ['Continuam existindo.', 'Correta.', 'Continuam existindo.', 'O diálogo competitivo é novidade da lei.', 'Continuam existindo.']);
QX(G, 'licitacoes', 2, 'A contratação direta por inexigibilidade de licitação acontece, em regra, quando:',
  ['o valor da compra é baixo', 'há inviabilidade de competição, como no caso de fornecedor exclusivo', 'o gestor prefere um fornecedor', 'não há tempo de organizar a licitação', 'o objeto é de qualquer natureza'], 1,
  'Art. 74: inexigibilidade decorre da inviabilidade de competição.',
  ['Isso é hipótese de dispensa por valor (art. 75).', 'Correta.', 'Preferência pessoal fere a impessoalidade.', 'Pressa não justifica sem a hipótese legal.', 'Não vale para qualquer objeto.']);
QX(G, 'lbi', 1, 'Segundo a Lei Brasileira de Inclusão, a avaliação da deficiência, quando necessária, será:',
  ['feita por qualquer pessoa', 'biopsicossocial, realizada por equipe multiprofissional e interdisciplinar', 'apenas médica', 'apenas social', 'feita por declaração própria'], 1,
  'Art. 2º, § 1º: avaliação biopsicossocial.',
  ['Exige equipe técnica.', 'Correta.', 'Não é só médica.', 'Não é só social.', 'Não basta a declaração.']);
QX(G, 'lbi', 2, 'Em relação a escolas privadas, a Lei Brasileira de Inclusão determina que é vedado:',
  ['aceitar matrícula de aluno com deficiência', 'cobrar valores adicionais nas mensalidades e matrículas para a inclusão', 'oferecer atendimento educacional especializado', 'adaptar o currículo', 'contratar profissional de apoio'], 1,
  'Art. 28, § 1º: é proibida a cobrança de valores adicionais.',
  ['Recusar matrícula é discriminação.', 'Correta.', 'O atendimento é um dever.', 'Adaptações são previstas.', 'O profissional de apoio é previsto.']);
QX(G, 'lbi', 2, '"Barreira atitudinal" é aquela que se refere a:',
  ['obstáculos em calçadas', 'comportamentos e atitudes que impedem ou prejudicam a participação da pessoa com deficiência', 'obstáculos em prédios', 'dificuldades com aplicativos', 'dificuldades no transporte'], 1,
  'Barreiras atitudinais são atitudes ou comportamentos discriminatórios.',
  ['Isso é urbanística.', 'Correta.', 'Isso é arquitetônica.', 'Isso é tecnológica.', 'Isso é barreira nos transportes.']);
QX(G, 'plano-carreira', 1, 'Em um plano de carreira, "progressão" significa:',
  ['demissão do servidor', 'avanço do servidor dentro da carreira, de acordo com os critérios da lei', 'mudança de município', 'redução salarial', 'perda do cargo'], 1,
  'Progressão é o avanço na carreira por critérios legais (tempo, avaliação, titulação).',
  ['Demissão é desligamento.', 'Correta.', 'Não tem relação.', 'Progressão não reduz salário.', 'Perda do cargo é outro tema.']);
QX(G, 'plano-carreira', 2, 'A diferença entre vencimento e remuneração, em regra, é que:',
  ['são sinônimos exatos', 'remuneração é o vencimento mais as vantagens permanentes', 'vencimento inclui qualquer indenização', 'remuneração é sempre menor', 'vencimento é pago só em dezembro'], 1,
  'Remuneração = vencimento + vantagens permanentes (conceito geral).',
  ['Não são sinônimos.', 'Correta.', 'Indenizações em regra não integram o vencimento.', 'Remuneração é igual ou maior.', 'Não há essa regra.']);
