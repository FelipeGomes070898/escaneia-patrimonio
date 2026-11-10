/* Trilha do IPAM e de institutos de previdência: seguridade social, RPPS e noções de RGPS, assistência e saúde.
   Conteúdo PROVÁVEL (o Anexo III do edital do IPAM não foi lido): A CONFIRMAR NO EDITAL. Aparece só para a trilha 'previdencia'. */
M({
  id: 'previdencia', nome: 'Noções de Previdência e Seguridade', cor: '#0d9488', questoes: 5, peso: 'estimado',
  banca: 'Segundo notícias, a prova do IPAM (IBADE) tem uma disciplina de Noções de Legislação Institucional, Previdenciária e de Assistência à Saúde (5 questões). Conteúdo provável: A CONFIRMAR NO ANEXO III DO EDITAL.',
  topicos: [
    PFT('seguridade', 'Seguridade social na Constituição (arts. 194 a 204)', 'seguridade social constituição art 194 195 196 201 203 saúde previdência assistência princípios resumo concursos',
      'Seguridade social é o tripé saúde, previdência e assistência social. É o ponto de partida de qualquer prova de previdência.',
      ['<b>Conceito (art. 194):</b> conjunto integrado de ações dos Poderes Públicos e da sociedade para assegurar os direitos à <b>saúde</b>, à <b>previdência</b> e à <b>assistência social</b>.',
       '<b>Saúde (art. 196):</b> direito de todos e dever do Estado, universal e sem exigir contribuição.',
       '<b>Previdência (art. 201):</b> de caráter <b>contributivo</b> e de <b>filiação obrigatória</b>, com equilíbrio financeiro e atuarial.',
       '<b>Assistência social (art. 203):</b> prestada a quem dela necessitar, <b>independentemente de contribuição</b>.',
       '<b>Princípios (art. 194, parágrafo único):</b> universalidade da cobertura e do atendimento; uniformidade e equivalência entre populações urbanas e rurais; seletividade e distributividade; irredutibilidade do valor dos benefícios; equidade no custeio; diversidade da base de financiamento; caráter democrático e descentralizado da administração (gestão quadripartite).'],
      ['<b>Financiamento (art. 195):</b> toda a sociedade, de forma direta e indireta, com recursos dos orçamentos da União, dos Estados, do Distrito Federal e dos Municípios e das contribuições sociais (empregador, trabalhador, receita de concursos de prognósticos, importador).',
       '<b>Precedência da fonte de custeio (art. 195, § 5º):</b> nenhum benefício ou serviço pode ser criado, majorado ou estendido sem a correspondente fonte de custeio total.',
       '<b>Anterioridade nonagesimal (art. 195, § 6º):</b> as contribuições sociais só podem ser exigidas após 90 dias da publicação da lei que as instituiu ou aumentou.',
       'A gestão da seguridade é <b>quadripartite</b>: trabalhadores, empregadores, aposentados e Poder Público.',
       'A seguridade social é organizada pelo Poder Público com <b>objetivos</b> como universalidade e redução das desigualdades; o orçamento da seguridade é distinto do orçamento fiscal.']),
    PFT('rpps', 'Regime Próprio de Previdência dos servidores (RPPS)', 'RPPS regime próprio de previdência art 40 constituição lei 9717 servidor efetivo aposentadoria compulsória 75 anos',
      'O IPAM gere a previdência dos servidores efetivos de Porto Velho: é um RPPS. Entender a lógica do regime próprio é o coração da prova.',
      ['<b>Art. 40 da CF:</b> o regime próprio dos titulares de cargo efetivo tem caráter <b>contributivo e solidário</b>, com contribuição do ente federativo, dos servidores ativos, dos aposentados e dos pensionistas, preservando o <b>equilíbrio financeiro e atuarial</b>.',
       '<b>Quem participa do RPPS:</b> titulares de cargo <b>efetivo</b>. Quem ocupa só cargo em comissão, cargo temporário ou emprego público fica no <b>Regime Geral</b> (INSS).',
       '<b>Benefícios típicos do RPPS:</b> aposentadorias e pensão por morte.',
       '<b>Aposentadoria compulsória:</b> aos <b>75 anos</b> de idade (LC nº 152/2015).',
       '<b>Lei nº 9.717/1998:</b> traz regras gerais de organização e funcionamento dos regimes próprios dos entes federativos, que devem ter cobertura ao menos de aposentadoria e pensão.'],
      ['Após a <b>EC nº 103/2019</b>, estados e municípios definem em <b>lei própria</b> as regras de idade e tempo de contribuição do seu RPPS: confira a lei do IPAM e do município.',
       'O RPPS tem <b>caráter contributivo e solidário</b>: não é uma poupança individual; os ativos ajudam a financiar os benefícios.',
       '<b>Equilíbrio financeiro e atuarial:</b> as receitas e os benefícios futuros precisam se equilibrar, calculados por avaliação atuarial periódica.',
       'Um mesmo ente não pode ter mais de um RPPS (regra de unicidade do regime próprio).',
       'O instituto de previdência (como o IPAM) é uma <b>autarquia</b> que gere o regime e paga os benefícios.']),
    PFT('rgps-assistencia', 'RGPS, assistência social e saúde (noções)', 'RGPS lei 8213 segurados obrigatórios carência BPC LOAS 8742 SUS lei 8080 resumo concursos',
      'Para entender a seguridade é preciso saber como o Regime Geral (INSS), a assistência social e o SUS se diferenciam do regime próprio.',
      ['<b>Segurados obrigatórios do RGPS (Lei nº 8.213/1991, art. 11):</b> empregado, empregado doméstico, contribuinte individual, trabalhador avulso e segurado especial. O <b>segurado facultativo</b> se filia por vontade própria.',
       '<b>Benefícios do RGPS:</b> aposentadorias, auxílio por incapacidade temporária (antigo auxílio-doença), salário-maternidade, pensão por morte, auxílio-reclusão e salário-família.',
       '<b>Carência (regra geral):</b> 12 contribuições para o auxílio por incapacidade temporária e para a aposentadoria por incapacidade permanente; o salário-maternidade da contribuinte individual exige 10 contribuições; a empregada não tem carência.',
       '<b>Assistência social (LOAS, Lei nº 8.742/1993):</b> o <b>BPC</b> paga um salário mínimo ao idoso com 65 anos ou mais e à pessoa com deficiência de longo prazo cuja renda familiar per capita seja inferior a <b>1/4 do salário mínimo</b>.',
       '<b>SUS (Lei nº 8.080/1990):</b> princípios de universalidade, integralidade e equidade; direção única em cada esfera e descentralização.'],
      ['O BPC <b>não exige contribuição</b> e não gera pensão por morte.',
       'O <b>RGPS</b> (INSS) é regime de filiação obrigatória e contributivo, e atende os trabalhadores privados e os servidores sem regime próprio.',
       'Os regimes próprios <b>não são</b> regidos pela Lei nº 8.213/1991, mas pela lei do respectivo ente e pela Lei nº 9.717/1998.',
       'A saúde é <b>universal</b>: não depende de contribuição direta, ao contrário da previdência.',
       'Os valores e regras de carência podem mudar por lei: confira a redação vigente antes da prova.'])
  ]
});
CONC.materias.filter(function (m) { return m.id === 'previdencia'; })[0].topicos.forEach(function (t) { t.so = ['previdencia']; });

QX('previdencia', 'seguridade', 1, 'Segundo a Constituição, a seguridade social compreende um conjunto integrado de ações destinadas a assegurar os direitos relativos à:',
  ['saúde, previdência e assistência social', 'saúde, educação e segurança', 'previdência, trabalho e moradia', 'assistência, cultura e lazer', 'educação, previdência e transporte'], 0,
  'Art. 194: saúde, previdência e assistência social.',
  ['Correta: art. 194 da CF.', 'Educação e segurança não integram a seguridade social.', 'Trabalho e moradia são direitos sociais, mas não compõem a seguridade.', 'Cultura e lazer não compõem a seguridade.', 'Educação e transporte não compõem a seguridade.']);
QX('previdencia', 'seguridade', 2, 'A assistência social será prestada a quem dela necessitar:',
  ['mediante contribuição obrigatória', 'independentemente de contribuição à seguridade social', 'apenas a aposentados', 'somente a servidores públicos', 'só em caso de desemprego'], 1,
  'Art. 203 da CF.',
  ['A assistência não exige contribuição.', 'Correta: art. 203.', 'Não é restrita a aposentados.', 'Não é restrita a servidores.', 'Não se limita ao desemprego.']);
QX('previdencia', 'seguridade', 2, 'O princípio segundo o qual nenhum benefício da seguridade social pode ser criado, majorado ou estendido sem a correspondente fonte de custeio total é o da:',
  ['universalidade', 'seletividade', 'precedência da fonte de custeio', 'irredutibilidade do valor dos benefícios', 'uniformidade'], 2,
  'Art. 195, § 5º.',
  ['Universalidade trata da cobertura e do atendimento.', 'Seletividade trata da escolha dos benefícios e serviços.', 'Correta: art. 195, § 5º.', 'Irredutibilidade protege o valor já concedido.', 'Uniformidade trata da equivalência entre urbanos e rurais.']);
QX('previdencia', 'seguridade', 2, 'As contribuições sociais da seguridade só podem ser exigidas após decorridos:',
  ['30 dias da publicação da lei', '60 dias da publicação da lei', '90 dias da publicação da lei', '180 dias da publicação da lei', 'um ano da publicação da lei'], 2,
  'Art. 195, § 6º: noventena nonagesimal.',
  ['Prazo diferente do previsto.', 'Prazo diferente do previsto.', 'Correta: art. 195, § 6º.', 'Prazo diferente do previsto.', 'Prazo diferente do previsto.']);
QX('previdencia', 'rpps', 1, 'O regime próprio de previdência social dos servidores titulares de cargo efetivo tem caráter:',
  ['facultativo e individual', 'contributivo e solidário', 'exclusivamente assistencial', 'gratuito e sem contribuição', 'privado e de capitalização individual'], 1,
  'Art. 40 da CF: contributivo e solidário, com equilíbrio financeiro e atuarial.',
  ['A filiação ao RPPS é obrigatória para o servidor efetivo.', 'Correta: art. 40.', 'O RPPS é previdenciário, não assistencial.', 'Há contribuição do ente, dos servidores, aposentados e pensionistas.', 'O RPPS é público e solidário.']);
QX('previdencia', 'rpps', 2, 'Quem ocupa exclusivamente cargo em comissão, sem vínculo efetivo com a administração, é segurado do:',
  ['regime próprio do ente', 'Regime Geral de Previdência Social', 'regime de previdência complementar privado', 'regime militar', 'nenhum regime'], 1,
  'Art. 40, § 13, da CF: vai para o RGPS.',
  ['O RPPS é para titulares de cargo efetivo.', 'Correta: art. 40, § 13.', 'A previdência complementar é facultativa e adicional.', 'O regime militar é de outra categoria.', 'Todo trabalhador está em algum regime.']);
QX('previdencia', 'rpps', 2, 'A aposentadoria compulsória do servidor titular de cargo efetivo ocorre aos:',
  ['65 anos', '70 anos', '75 anos', '80 anos', '60 anos'], 2,
  'LC nº 152/2015: aos 75 anos de idade.',
  ['Não é a idade da compulsória.', 'Era a idade antes da LC 152/2015.', 'Correta: 75 anos.', 'Não é a idade da compulsória.', 'Não é a idade da compulsória.']);
QX('previdencia', 'rpps', 2, 'Após a EC nº 103/2019, as regras de idade e tempo de contribuição do regime próprio de um município são definidas:',
  ['pela Constituição, de forma idêntica para todos', 'pela lei do próprio ente federativo', 'pelo INSS', 'por decreto do Presidente da República', 'pelo Tribunal de Contas'], 1,
  'Estados e municípios definem as regras em lei própria, respeitado o texto constitucional.',
  ['A Constituição traz regras gerais; o detalhe é local.', 'Correta.', 'O INSS gere o regime geral.', 'Não é feito por decreto presidencial.', 'O Tribunal de Contas fiscaliza.']);
QX('previdencia', 'rgps-assistencia', 1, 'Pela Lei nº 8.213/1991, é segurado obrigatório do Regime Geral:',
  ['o servidor titular de cargo efetivo com regime próprio', 'o empregado', 'o estudante sem renda', 'o menor de 10 anos', 'o aposentado do regime próprio'], 1,
  'Art. 11: empregado, doméstico, contribuinte individual, avulso e segurado especial.',
  ['Ele fica no regime próprio.', 'Correta.', 'Sem atividade remunerada não há filiação obrigatória.', 'Não é segurado obrigatório.', 'Não é a regra do RGPS.']);
QX('previdencia', 'rgps-assistencia', 2, 'O benefício de prestação continuada (BPC) da assistência social paga um salário mínimo ao idoso com 65 anos ou mais ou à pessoa com deficiência que comprove renda familiar per capita inferior a:',
  ['1/8 do salário mínimo', '1/4 do salário mínimo', '1/2 salário mínimo', 'um salário mínimo', 'dois salários mínimos'], 1,
  'LOAS (Lei nº 8.742/1993): menos de 1/4 do salário mínimo per capita.',
  ['Valor menor que o da lei.', 'Correta.', 'É o critério de outros programas.', 'Valor maior que o da lei.', 'Valor maior que o da lei.']);
QX('previdencia', 'rgps-assistencia', 2, 'O BPC (benefício de prestação continuada):',
  ['exige contribuição mínima de 15 anos', 'não exige contribuição do beneficiário', 'gera pensão por morte aos dependentes', 'é pago apenas a trabalhadores formais', 'é uma aposentadoria do regime próprio'], 1,
  'É benefício assistencial: não depende de contribuição e não gera pensão.',
  ['Não há exigência de contribuição.', 'Correta.', 'O BPC não gera pensão por morte.', 'Não depende de vínculo formal.', 'Não é aposentadoria.']);
QX('previdencia', 'rgps-assistencia', 2, 'Constituem princípios do Sistema Único de Saúde (Lei nº 8.080/1990):',
  ['universalidade, integralidade e equidade', 'contribuição prévia, pagamento e capitalização', 'seletividade e focalização exclusiva', 'privatização e livre concorrência', 'filiação obrigatória e carência'], 0,
  'SUS: universalidade, integralidade, equidade, descentralização e direção única.',
  ['Correta.', 'A saúde não depende de contribuição direta.', 'A saúde é universal, não focalizada exclusivamente.', 'O SUS é público.', 'Filiação e carência são conceitos previdenciários.']);

/* Cartões da trilha de previdência (só no site; a página de impressão não carrega os cartões) */
if (typeof Cd === 'function') {
Cd('previdencia', 'seguridade', 'Seguridade social: o que compreende (CF, art. 194)?', 'Saúde, previdência e assistência social.');
Cd('previdencia', 'seguridade', 'Precedência da fonte de custeio e noventena das contribuições?', 'Nenhum benefício sem fonte de custeio total (art. 195, § 5º); contribuições sociais exigíveis após 90 dias (§ 6º).');
Cd('previdencia', 'rpps', 'RPPS: caráter e quem participa?', 'Contributivo e solidário, com equilíbrio financeiro e atuarial; titulares de cargo efetivo. Cargo só em comissão vai para o RGPS.');
Cd('previdencia', 'rpps', 'Aposentadoria compulsória do servidor?', 'Aos 75 anos (LC 152/2015).');
Cd('previdencia', 'rgps-assistencia', 'BPC (LOAS): quem recebe?', 'Idoso com 65 anos ou mais ou pessoa com deficiência, com renda familiar per capita inferior a 1/4 do salário mínimo; não exige contribuição.');
Cd('previdencia', 'rgps-assistencia', 'Segurados obrigatórios do RGPS?', 'Empregado, doméstico, contribuinte individual, trabalhador avulso e segurado especial (Lei 8.213/1991, art. 11).');
}
