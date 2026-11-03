/* Lei Complementar nº 385/2010 (Regime Jurídico dos Servidores Públicos Municipais de Porto Velho): conteúdo confirmado no Anexo IV
   (retificação nº 27/2026). Resumo feito a partir do texto consolidado publicado no SAPL da Câmara Municipal (vigência a partir de 21/05/2019);
   alterações posteriores podem existir: confira o texto atual. Carregado depois de edital-legislacao.js. */
(function () {
  var leg = CONC.materias.filter(function (m) { return m.id === 'legislacao'; })[0];
  var nv = ['medio', 'superior'];
  var aviso = '<p class="aviso">Resumo do texto consolidado da LC nº 385/2010 no SAPL da Câmara de Porto Velho (vigência a partir de 21/05/2019). Leis posteriores podem ter alterado artigos: <b>confira o texto atual</b> em sapl.portovelho.ro.leg.br antes da prova.</p>';
  leg.topicos.push({
    id: 'lc385-provimento', titulo: 'LC 385/2010: provimento, posse, exercício, estágio probatório e estabilidade', conf: true, nv: nv,
    busca: 'Lei Complementar 385 2010 Porto Velho regime jurídico servidores posse exercício estágio probatório estabilidade',
    contexto: '<p>É a "constituição do servidor municipal": diz como se entra no cargo, em quais prazos e quando se fica estável. O edital da SEMED cita expressamente a Lei Municipal nº 385/2010.</p>' + aviso,
    basico: '<ul>' +
      '<li><b>Servidor</b> é a pessoa legalmente investida em cargo público (art. 2º). <b>Cargo efetivo:</b> exige concurso. <b>Cargo em comissão:</b> livre nomeação e exoneração, só para direção, chefia e assessoramento. <b>Função de confiança:</b> só para servidor efetivo.</li>' +
      '<li><b>Requisitos (art. 4º):</b> nacionalidade brasileira, <b>18 anos</b>, direitos políticos, quitação militar e eleitoral, escolaridade exigida e aptidão física e mental.</li>' +
      '<li><b>Pessoa com deficiência (art. 5º):</b> <b>10%</b> das vagas do cargo. O candidato passa por junta médica municipal, que decide se a deficiência é compatível com o cargo.</li>' +
      '<li><b>Concurso (art. 9º):</b> validade de até <b>2 anos</b>, prorrogável <b>uma vez</b> por igual período.</li>' +
      '<li><b>Posse (art. 12):</b> assinatura do termo; prazo de <b>30 dias</b> contados da publicação do ato de provimento, prorrogável por mais <b>30 dias</b>, a requerimento. Perdido o prazo, o ato de provimento fica sem efeito. Só há posse na nomeação (art. 15).</li>' +
      '<li><b>Exercício (art. 16):</b> <b>15 dias</b> depois da posse; se não entrar em exercício, é <b>exonerado</b>. Só recebe remuneração após entrar em exercício.</li>' +
      '<li><b>Jornada (art. 21):</b> no máximo <b>40 horas semanais</b>, entre 6 e 8 horas diárias.</li></ul>',
    aprofundado: '<ul>' +
      '<li><b>Formas de provimento (art. 7º):</b> nomeação, promoção, reintegração, reversão, aproveitamento e readaptação.</li>' +
      '<li><b>Estágio probatório (art. 23):</b> <b>3 anos</b>, avaliando assiduidade, disciplina, capacidade de iniciativa, produtividade e responsabilidade. A avaliação é homologada <b>3 meses antes</b> do fim do estágio. Quem não passa é exonerado (ou reconduzido, se for estável).</li>' +
      '<li><b>Estabilidade (art. 25):</b> após <b>3 anos de efetivo exercício</b>, exigida avaliação especial de desempenho. O estável só perde o cargo por sentença judicial transitada em julgado, por processo administrativo com ampla defesa ou por avaliação periódica de desempenho.</li>' +
      '<li><b>Progressão funcional (art. 34):</b> de uma referência para outra na mesma classe, com interstício de <b>2 anos</b> e avaliação de desempenho. <b>Promoção:</b> da última referência de uma classe para a primeira da seguinte, também com interstício de 2 anos, avaliação e curso de aperfeiçoamento.</li>' +
      '<li><b>Vacância (art. 35):</b> exoneração, demissão, promoção, readaptação, aposentadoria, posse em outro cargo inacumulável e falecimento.</li>' +
      '<li><b>Readaptação:</b> cargo compatível com a limitação física ou mental. <b>Reintegração:</b> volta do estável cuja demissão foi anulada. <b>Reversão:</b> volta do aposentado (não pode reverter quem completou 70 anos). <b>Recondução:</b> volta do estável ao cargo anterior.</li></ul>'
  });
  leg.topicos.push({
    id: 'lc385-direitos', titulo: 'LC 385/2010: remuneração, férias e licenças', conf: true, nv: nv,
    busca: 'Lei Complementar 385 2010 Porto Velho férias licenças remuneração vencimento adicional de férias servidor municipal',
    contexto: '<p>Trata do que o servidor recebe e de quando pode se afastar. As questões costumam cobrar <b>prazos e números</b>.</p>' + aviso,
    basico: '<ul>' +
      '<li><b>Vencimento básico:</b> retribuição pelo efetivo exercício do cargo, fixada em lei. <b>Vencimentos:</b> vencimento básico mais as vantagens de caráter permanente. <b>Remuneração:</b> vencimentos mais adicionais individuais e demais vantagens (art. 44).</li>' +
      '<li><b>Perde a remuneração do dia</b> quem falta sem motivo justificado (art. 45). Atrasos de <b>15 minutos ou mais</b> também geram desconto proporcional.</li>' +
      '<li><b>Reposição ao erário (art. 47):</b> descontada em parcelas mensais que <b>não excedam 10%</b> do vencimento básico. Quem sai com débito tem <b>60 dias</b> para quitar (art. 48).</li>' +
      '<li><b>Férias (art. 90):</b> <b>30 dias</b> por ano, com período aquisitivo de <b>12 meses</b>; podem ser acumuladas até <b>2 períodos</b> por necessidade do serviço. É vedado levar falta à conta de férias.</li>' +
      '<li><b>Adicional de férias (art. 89):</b> <b>1/3</b> da remuneração, pago no mês anterior ao gozo.</li>' +
      '<li><b>Licenças (art. 94):</b> doença em pessoa da família; afastamento do cônjuge; serviço militar; atividade política; prêmio por assiduidade; interesses particulares; mandato classista; gestante, adotante e paternidade; tratamento de saúde.</li></ul>',
    aprofundado: '<ul>' +
      '<li><b>Conversão de férias em dinheiro:</b> pode converter até <b>1/3</b>, com requerimento feito com no mínimo <b>60 dias</b> de antecedência e disponibilidade financeira (art. 90, § 4º). É vedada a conversão integral.</li>' +
      '<li><b>Parcelamento:</b> as férias podem ser parceladas a pedido do servidor e no interesse da administração, sem etapa inferior a <b>10 dias</b>. O texto consolidado traz mais de uma redação sobre o número de etapas (duas ou três): confira a versão atual.</li>' +
      '<li><b>Interrupção das férias (art. 93):</b> só por calamidade pública, comoção interna, convocação para júri, serviço militar ou eleitoral, ou necessidade do serviço declarada pelo Prefeito.</li>' +
      '<li><b>Exonerado:</b> recebe indenização das férias na proporção de 1/12 por mês de efetivo exercício, ou fração superior a 14 dias.</li>' +
      '<li><b>Licença por doença em pessoa da família (art. 96):</b> a cada 12 meses, até <b>60 dias</b> com remuneração e até <b>90 dias</b> sem remuneração (somados, não passam desses limites), mediante junta médica oficial. É vedado exercer atividade remunerada nesse período.</li>' +
      '<li>Uma licença da mesma espécie concedida dentro de <b>60 dias</b> do fim de outra é considerada prorrogação (art. 95).</li>' +
      '<li>O servidor em estágio probatório só pode receber algumas licenças (incisos I, II, III, IV, VIII e IX do art. 94), e o estágio fica suspenso durante elas.</li></ul>'
  });
  leg.topicos.push({
    id: 'lc385-disciplinar', titulo: 'LC 385/2010: deveres, proibições, penalidades e processo disciplinar', conf: true, nv: nv,
    busca: 'Lei Complementar 385 2010 Porto Velho deveres proibições penalidades repreensão suspensão demissão sindicância processo disciplinar prescrição',
    contexto: '<p>É o "regime disciplinar": o que o servidor deve fazer, o que não pode, quais as punições e como se apura. Cai muito em prova municipal porque tem <b>números fáceis de cobrar</b>.</p>' + aviso,
    basico: '<ul>' +
      '<li><b>Deveres (art. 140):</b> zelo e dedicação, lealdade às instituições, observar normas, cumprir ordens superiores (exceto manifestamente ilegais), atender com presteza, informar irregularidades, zelar pelo patrimônio, guardar sigilo, conduta compatível com a moralidade, assiduidade e pontualidade, urbanidade.</li>' +
      '<li><b>Proibições (art. 141):</b> ausentar-se sem autorização do chefe, retirar documento ou objeto da repartição, valer-se do cargo para proveito pessoal, receber propina, comissão ou presente em razão do cargo, usar pessoal ou material da repartição em atividade particular, assediar sexual ou moralmente, exercer comércio (exceto como acionista, cotista ou comanditário) e gerir sociedade privada, entre outras.</li>' +
      '<li><b>Acumulação (art. 142):</b> em regra proibida, salvo exceções da Constituição; mesmo lícita, exige compatibilidade de horários e a soma das cargas <b>não pode passar de 65 horas semanais</b>. Descoberta a acumulação ilícita, o servidor tem <b>10 dias</b> para optar (art. 145).</li>' +
      '<li><b>Responsabilidade (arts. 146 a 151):</b> civil, penal e administrativa; as sanções <b>acumulam-se e são independentes</b>. A absolvição criminal que nega o fato ou a autoria afasta a responsabilidade administrativa.</li>' +
      '<li><b>Penalidades (art. 152):</b> repreensão, suspensão, demissão, cassação de aposentadoria ou disponibilidade e destituição de cargo em comissão ou função de confiança.</li></ul>',
    aprofundado: '<ul>' +
      '<li><b>Repreensão</b> (por escrito): violação das proibições dos incisos I a IX do art. 141. <b>Suspensão:</b> reincidência e infrações mais graves, <b>não podendo exceder 90 dias</b>; pode ser convertida em multa de 50% por dia da remuneração (art. 155).</li>' +
      '<li><b>Demissão (art. 156):</b> crime contra a administração pública, improbidade, abandono de cargo, inassiduidade habitual, incontinência pública, insubordinação grave, ofensa física em serviço, aplicação irregular de dinheiro público, revelação de segredo, lesão aos cofres públicos, corrupção, acumulação ilegal, entre outras.</li>' +
      '<li><b>Abandono de cargo:</b> ausência intencional por <b>mais de 30 dias consecutivos</b>. <b>Inassiduidade habitual:</b> faltas sem justificativa por <b>60 dias</b>, interpoladamente, em <b>12 meses</b>.</li>' +
      '<li><b>Competência (art. 159):</b> o <b>Prefeito</b> aplica demissão, cassação, destituição e suspensão superior a 30 dias; o <b>Procurador-Geral do Município</b> aplica repreensão e suspensão de até 30 dias.</li>' +
      '<li><b>Prescrição (art. 160):</b> <b>5 anos</b> (demissão, cassação), <b>3 anos</b> (suspensão acima de 30 dias), <b>1 ano</b> (suspensão de até 30 dias) e <b>180 dias</b> (repreensão), contados da ciência do fato.</li>' +
      '<li><b>Afastamento preventivo (art. 165):</b> até <b>60 dias</b>, sem prejuízo da remuneração, prorrogável por igual prazo.</li>' +
      '<li><b>Sindicância</b> (repreensão ou suspensão de até 30 dias): conclusão em <b>30 dias</b>, prorrogável por igual prazo. <b>Processo administrativo disciplinar</b> (suspensão acima de 30 dias, demissão etc.): conclusão em <b>60 dias</b>, prorrogável por igual prazo; fases: instauração, inquérito (instrução, indiciação, defesa e relatório) e julgamento. A comissão tem <b>3 servidores estáveis</b>.</li>' +
      '<li>Os registros de repreensão e de suspensão são cancelados após <b>3 e 5 anos</b> de efetivo exercício, sem nova infração (art. 164).</li></ul>'
  });
})();

QX(G, 'lc385-provimento', 1, 'Pela Lei Complementar nº 385/2010, o prazo para o servidor tomar posse, contado da publicação do ato de provimento, é de:',
  ['15 dias, improrrogáveis', '30 dias, prorrogáveis por mais 30 a requerimento', '60 dias, improrrogáveis', '10 dias, prorrogáveis por mais 10', '90 dias, prorrogáveis por mais 90'], 1,
  'Art. 12, § 1º: 30 dias, prorrogáveis por mais 30 a requerimento do interessado.',
  ['É o prazo para entrar em exercício, não para a posse.', 'Correta: art. 12, § 1º.', 'Não é o prazo previsto.', 'Não é o prazo previsto.', 'Não é o prazo previsto.']);
QX(G, 'lc385-provimento', 1, 'Depois da posse, o servidor tem para entrar em exercício o prazo de:',
  ['2 dias', '5 dias', '15 dias', '30 dias', '60 dias'], 2,
  'Art. 16, § 1º: 15 dias contados da posse; se não entrar, é exonerado.',
  ['É o prazo de quem foi movimentado (art. 40).', 'Não é o prazo da lei.', 'Correta: art. 16, § 1º.', 'É o prazo da posse.', 'Não é o prazo da lei.']);
QX(G, 'lc385-provimento', 2, 'O estágio probatório do servidor efetivo tem duração de:',
  ['1 ano', '2 anos', '3 anos', '4 anos', '5 anos'], 2,
  'Art. 23: 3 anos, avaliando assiduidade, disciplina, iniciativa, produtividade e responsabilidade.',
  ['Não é o prazo da lei.', 'Não é o prazo da lei.', 'Correta: art. 23.', 'Não é o prazo da lei.', 'É o prazo da prescrição de infrações puníveis com demissão, não do estágio.']);
QX(G, 'lc385-provimento', 2, 'Não é fator de avaliação do estágio probatório segundo a LC nº 385/2010:',
  ['assiduidade', 'disciplina', 'capacidade de iniciativa', 'produtividade', 'nível de escolaridade'], 4,
  'Art. 23: assiduidade, disciplina, capacidade de iniciativa, produtividade e responsabilidade.',
  ['É fator.', 'É fator.', 'É fator.', 'É fator.', 'Correta: escolaridade é requisito de investidura, não fator do estágio.']);
QX(G, 'lc385-provimento', 2, 'Pessoas com deficiência têm reservado, do total das vagas oferecidas para o cargo, o percentual de:',
  ['2%', '5%', '10%', '20%', '30%'], 2,
  'Art. 5º: 10% das vagas, com arredondamento para número inteiro se a fração for igual ou superior a meio.',
  ['Não é o percentual da lei municipal.', 'Não é o percentual da lei municipal.', 'Correta: art. 5º.', 'Não é o percentual da lei municipal.', 'Não é o percentual da lei municipal.']);
QX(G, 'lc385-provimento', 2, 'A progressão funcional do servidor, de uma referência para outra dentro da mesma classe, exige o interstício de:',
  ['6 meses', '1 ano', '2 anos', '3 anos', '5 anos'], 2,
  'Art. 34, § 1º: interstício de 2 anos e avaliação de desempenho.',
  ['Não é o interstício da lei.', 'Não é o interstício da lei.', 'Correta: art. 34, § 1º.', 'É o prazo do estágio probatório.', 'Não é o interstício da lei.']);
QX(G, 'lc385-provimento', 2, 'NÃO é causa de vacância do cargo público, segundo a LC nº 385/2010:',
  ['exoneração', 'demissão', 'aposentadoria', 'falecimento', 'nomeação'], 4,
  'Art. 35: exoneração, demissão, promoção, readaptação, aposentadoria, posse em outro cargo inacumulável e falecimento. Nomeação é forma de provimento.',
  ['É causa de vacância.', 'É causa de vacância.', 'É causa de vacância.', 'É causa de vacância.', 'Correta: nomeação provê o cargo; não o vaga.']);
QX(G, 'lc385-provimento', 2, 'A jornada de trabalho dos servidores observa a duração máxima semanal de:',
  ['30 horas', '36 horas', '40 horas', '44 horas', '48 horas'], 2,
  'Art. 21: máximo de 40 horas semanais, entre 6 e 8 horas diárias.',
  ['Não é o limite da lei.', 'Não é o limite da lei.', 'Correta: art. 21.', 'Não é o limite da lei.', 'Não é o limite da lei.']);
QX(G, 'lc385-direitos', 1, 'O servidor municipal tem direito anual a férias de:',
  ['15 dias', '20 dias', '30 dias', '45 dias', '60 dias'], 2,
  'Art. 90: 30 dias de férias anuais, acumuláveis até 2 períodos por necessidade do serviço.',
  ['Não é o período da lei.', 'É o período de férias de quem opera com raios X, por semestre (art. 92).', 'Correta: art. 90.', 'Não é o período da lei.', 'Não é o período da lei.']);
QX(G, 'lc385-direitos', 2, 'O adicional de férias corresponde a:',
  ['1/10 da remuneração', '1/5 da remuneração', '1/3 da remuneração do período de férias', '50% da remuneração', 'uma remuneração inteira'], 2,
  'Art. 89: 1/3 da remuneração do período das férias, pago no mês anterior ao gozo.',
  ['Não é a fração da lei.', 'Não é a fração da lei.', 'Correta: art. 89.', 'Não é a fração da lei.', 'Não é a fração da lei.']);
QX(G, 'lc385-direitos', 2, 'A conversão de férias em dinheiro, segundo a LC nº 385/2010, pode atingir:',
  ['a totalidade das férias', 'metade das férias', '1/3 das férias, com requerimento feito com no mínimo 60 dias de antecedência', 'dois terços das férias', 'nenhuma parte, pois é proibida'], 2,
  'Art. 90, § 4º: conversão de 1/3, com 60 dias de antecedência e disponibilidade financeira. É vedada a conversão integral.',
  ['A conversão integral é vedada (art. 91, § 4º), salvo morte do servidor ou exoneração.', 'Não é a fração da lei.', 'Correta: art. 90, § 4º.', 'Não é a fração da lei.', 'É permitida, até 1/3.']);
QX(G, 'lc385-direitos', 2, 'A reposição ao erário será descontada em parcelas mensais que não excedam:',
  ['5% do vencimento básico', '10% do vencimento básico', '25% do vencimento básico', '30% do vencimento básico', '50% do vencimento básico'], 1,
  'Art. 47: parcelas que não excedam 10% do vencimento básico.',
  ['Não é o limite da lei.', 'Correta: art. 47.', 'Não é o limite da lei.', 'Não é o limite da lei.', 'Não é o limite da lei.']);
QX(G, 'lc385-direitos', 2, 'Na licença por motivo de doença em pessoa da família, a cada 12 meses, o servidor pode obter até:',
  ['30 dias com remuneração e 30 sem remuneração', '60 dias com remuneração e 90 dias sem remuneração', '90 dias com remuneração e 60 sem remuneração', '120 dias sempre com remuneração', 'um ano sem remuneração'], 1,
  'Art. 96, § 2º: até 60 dias remunerados e até 90 dias sem remuneração, consecutivos ou não.',
  ['Não são os limites da lei.', 'Correta: art. 96, § 2º.', 'Os números estão invertidos.', 'Não são os limites da lei.', 'Não é o limite da lei.']);
QX(G, 'lc385-disciplinar', 1, 'A pena de suspensão, segundo a LC nº 385/2010, não pode exceder:',
  ['15 dias', '30 dias', '60 dias', '90 dias', '180 dias'], 3,
  'Art. 155: não pode exceder 90 dias.',
  ['É o limite da suspensão por recusa a inspeção médica (§ 1º).', 'É o limite da suspensão aplicada pelo Procurador-Geral.', 'Não é o limite da lei.', 'Correta: art. 155.', 'É o prazo de prescrição da repreensão.']);
QX(G, 'lc385-disciplinar', 2, 'Configura abandono de cargo a ausência intencional do servidor por mais de:',
  ['10 dias consecutivos', '15 dias consecutivos', '30 dias consecutivos', '60 dias consecutivos', '90 dias consecutivos'], 2,
  'Art. 156, § 1º: mais de 30 dias consecutivos.',
  ['Não é o prazo da lei.', 'Não é o prazo da lei.', 'Correta: art. 156, § 1º.', 'É o prazo da inassiduidade habitual (interpolado, em 12 meses).', 'Não é o prazo da lei.']);
QX(G, 'lc385-disciplinar', 2, 'A inassiduidade habitual consiste na falta ao serviço, sem causa justificada, por:',
  ['30 dias consecutivos', '60 dias, interpoladamente, durante 12 meses', '90 dias seguidos', '15 dias em um mês', '10 dias por ano'], 1,
  'Art. 156, § 2º.',
  ['Isso é o abandono de cargo (mais de 30 dias consecutivos).', 'Correta: art. 156, § 2º.', 'Não é o conceito da lei.', 'Não é o conceito da lei.', 'Não é o conceito da lei.']);
QX(G, 'lc385-disciplinar', 2, 'Segundo a lei, a ação disciplinar prescreve em 5 anos quanto às infrações puníveis com:',
  ['repreensão', 'suspensão de até 30 dias', 'suspensão superior a 30 dias', 'demissão, cassação de aposentadoria ou disponibilidade', 'qualquer infração'], 3,
  'Art. 160, I: 5 anos para demissão e cassação; 3 anos para suspensão acima de 30 dias; 1 ano para suspensão de até 30 dias; 180 dias para repreensão.',
  ['Repreensão prescreve em 180 dias.', 'Suspensão de até 30 dias prescreve em 1 ano.', 'Suspensão acima de 30 dias prescreve em 3 anos.', 'Correta: art. 160, I.', 'Cada penalidade tem o seu prazo.']);
QX(G, 'lc385-disciplinar', 2, 'Quanto ao afastamento preventivo do servidor durante o processo disciplinar, a lei prevê o prazo de:',
  ['até 10 dias', 'até 30 dias, improrrogáveis', 'até 60 dias, sem prejuízo da remuneração, prorrogável por igual prazo', 'até 90 dias, sem remuneração', 'tempo indeterminado'], 2,
  'Art. 165 e parágrafo único.',
  ['Não é o prazo da lei.', 'Não é o prazo da lei.', 'Correta: art. 165.', 'A remuneração é mantida.', 'A lei fixa prazo e a prorrogação cessa os efeitos mesmo sem conclusão do processo.']);
QX(G, 'lc385-disciplinar', 2, 'A sindicância e o processo administrativo disciplinar são conduzidos por comissão de:',
  ['1 servidor estável', '2 servidores estáveis', '3 servidores estáveis', '5 servidores quaisquer', '7 servidores, sendo 4 estáveis'], 2,
  'Art. 173: comissão de 3 servidores estáveis do quadro municipal.',
  ['Não é a composição da lei.', 'Não é a composição da lei.', 'Correta: art. 173.', 'Não é a composição da lei.', 'Não é a composição da lei.']);
QX(G, 'lc385-disciplinar', 2, 'Quem aplica a penalidade de demissão ao servidor municipal de Porto Velho é:',
  ['o Procurador-Geral do Município', 'o Prefeito', 'o chefe imediato', 'a comissão processante', 'o Secretário de Administração'], 1,
  'Art. 159, I: o Prefeito aplica demissão, cassação, destituição e suspensão superior a 30 dias.',
  ['Ele aplica repreensão e suspensão de até 30 dias.', 'Correta: art. 159, I.', 'Não tem essa competência.', 'A comissão propõe, não aplica.', 'Não tem essa competência.']);
QX(G, 'lc385-disciplinar', 2, 'Sobre a acumulação lícita de cargos, a LC nº 385/2010 estabelece que a soma das cargas horárias não pode ultrapassar:',
  ['40 horas semanais', '60 horas semanais', '65 horas semanais', '80 horas semanais', '100 horas semanais'], 2,
  'Art. 142, § 2º: não pode ultrapassar 65 horas semanais (há regra especial para profissionais de saúde).',
  ['É a jornada máxima de um cargo.', 'Não é o limite da lei.', 'Correta: art. 142, § 2º.', 'É o limite especial para profissionais de saúde, com plantão, em caso previsto na lei.', 'Não é o limite da lei.']);
