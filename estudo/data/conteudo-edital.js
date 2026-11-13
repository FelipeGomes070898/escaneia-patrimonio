/* Conteúdo alinhado aos editais lidos: IPAM (edital de 29/10/2026) e PF (edital de 2025, como referência).
   Usa PFT (pf.js), QX (extra.js) e Cd (cards.js, só no site). Carregado depois de previdencia.js. */
(function () {
  function mat(id) { return CONC.materias.filter(function (m) { return m.id === id; })[0]; }
  function add(mid, t, so) { t.so = so; mat(mid).topicos.push(t); }
  var BASE = ['policial', 'base'];

  /* ---------- Informática (Bloco II da PF = 36 itens; Informática Básica do IPAM) ---------- */
  add('pf-info', PFT('windows-office', 'Windows, Office/LibreOffice e produtividade', 'windows 10 11 atalhos explorador de arquivos excel calc funções soma média se referência absoluta concursos',
    'Informática Básica está no edital do IPAM e vale 36 dos 120 itens da PF. Atalhos e fórmulas são perguntas rápidas e certeiras.',
    ['<b>Atalhos do Windows:</b> Ctrl+C copia, Ctrl+X recorta, Ctrl+V cola, Ctrl+Z desfaz, Ctrl+Y refaz, Ctrl+A seleciona tudo, Alt+Tab alterna janelas, Win+D mostra a área de trabalho, Win+E abre o Explorador de Arquivos, Win+L bloqueia a tela, Ctrl+Shift+Esc abre o Gerenciador de Tarefas.',
     '<b>Arquivos:</b> F2 renomeia; F5 atualiza; Delete manda para a Lixeira (dá para restaurar); <b>Shift+Delete</b> exclui permanentemente, sem passar pela Lixeira.',
     '<b>Planilhas (Excel/Calc):</b> toda fórmula começa com <b>=</b>. Funções: SOMA, MÉDIA, MÁXIMO, MÍNIMO, SE, CONT.SE, PROCV.',
     '<b>Referências:</b> relativa (A1) muda ao copiar; <b>absoluta ($A$1)</b> não muda; mista ($A1 ou A$1) trava só coluna ou linha. A tecla F4 alterna entre elas.',
     '<b>Ordem das operações:</b> parênteses, potência, multiplicação e divisão, depois soma e subtração.',
     '<b>Compactação:</b> ZIP e RAR reduzem o tamanho e agrupam arquivos; arquivo compactado também pode ser protegido por senha.'],
    ['=SE(teste; valor_se_verdadeiro; valor_se_falso): ex.: =SE(A1>=7;"Aprovado";"Reprovado").',
     '=PROCV(valor; tabela; coluna; falso) procura na primeira coluna da tabela e devolve outra coluna da mesma linha; com o último argumento FALSO, busca o valor exato.',
     '=CONT.SE(intervalo; critério) conta as células que atendem ao critério.',
     'No LibreOffice, o separador de argumentos costuma ser ponto e vírgula e a planilha se chama Calc; o editor de texto é o Writer.',
     'Tabelas dinâmicas resumem dados; filtros ocultam linhas que não atendem ao critério sem apagá-las.',
     'Windows 10 e 11: a pesquisa da barra de tarefas encontra arquivos, aplicativos e configurações; a Lixeira guarda arquivos excluídos até ser esvaziada.']), BASE);
  add('pf-info', PFT('internet-nuvem', 'Internet, e-mail, nuvem e trabalho colaborativo', 'internet e-mail cco cópia oculta nuvem iaas paas saas navegador cookies https colaboração concursos',
    'Navegar, enviar e-mail e guardar arquivos na nuvem com segurança é rotina de qualquer servidor.',
    ['<b>URL:</b> protocolo (https), domínio (www.exemplo.com.br) e caminho. HTTPS usa criptografia e mostra um cadeado no navegador.',
     '<b>E-mail:</b> <b>Para</b> (destinatário principal), <b>Cc</b> (cópia, todos veem) e <b>Cco</b> (cópia oculta: os outros não veem quem recebeu).',
     '<b>Nuvem:</b> armazenar e acessar arquivos pela internet (Google Drive, OneDrive). Vantagens: acesso de qualquer lugar e backup; risco: depende de conexão e de boas práticas de segurança.',
     '<b>Modelos de serviço:</b> IaaS (infraestrutura), PaaS (plataforma) e SaaS (software pronto, como um e-mail na web).',
     '<b>Cookies</b> guardam preferências e sessões; o histórico e o cache são cópias locais de navegação.',
     '<b>Intranet</b> é a rede interna de uma organização; <b>extranet</b> é a intranet aberta a parceiros.'],
    ['<b>Phishing:</b> mensagem falsa para roubar dados. Desconfie de urgência, erros de português e links encurtados; confira o endereço real antes de clicar.',
     '<b>Autenticação multifator (MFA)</b> combina senha com um segundo fator (código no celular, biometria) e reduz muito o risco de invasão de contas.',
     '<b>Videoconferência e colaboração:</b> chats, compartilhamento de tela e edição simultânea de documentos exigem controle de quem pode editar, comentar ou apenas ver.',
     '<b>Versionamento:</b> guarda versões anteriores de um arquivo, permitindo desfazer alterações.',
     'Boas práticas de proteção de dados pessoais: compartilhar só o necessário, usar senhas fortes e únicas, atualizar sistemas e desconfiar de anexos inesperados.']), BASE);

  /* ---------- Administração pública, autarquias, LGPD ---------- */
  add('pf-adm', PFT('adm-autarquias-lgpd', 'Administração direta e indireta, autarquias, LAI e LGPD', 'administração direta indireta autarquias descentralização desconcentração LGPD lei 13709 controlador operador encarregado dado sensível concursos',
    'O edital do IPAM pede administração direta e indireta, autarquias, acesso à informação e proteção de dados. O IPAM é uma autarquia: conhecer o conceito é pontuar de graça.',
    ['<b>Administração direta:</b> os próprios entes políticos (União, Estados, DF e Municípios) e seus órgãos. <b>Administração indireta:</b> autarquias, fundações públicas, empresas públicas e sociedades de economia mista, com <b>personalidade jurídica própria</b>.',
     '<b>Autarquia:</b> pessoa jurídica de direito público, criada por <b>lei específica</b> (CF, art. 37, XIX), para atividade típica de Estado, com autonomia administrativa e financeira. O <b>IPAM</b> é autarquia municipal.',
     '<b>Descentralização:</b> o Estado transfere atividade para outra pessoa jurídica (a autarquia, por exemplo). <b>Desconcentração:</b> distribui competências dentro da mesma pessoa jurídica (secretarias, divisões).',
     '<b>LAI (Lei 12.527/2011):</b> publicidade é a regra e o sigilo, a exceção; prazo de resposta de 20 dias, prorrogável por mais 10.',
     '<b>LGPD (Lei 13.709/2018):</b> <b>dado pessoal</b> é a informação relacionada a pessoa natural identificada ou identificável; <b>dado sensível</b> trata de origem racial ou étnica, convicção religiosa, opinião política, filiação sindical, saúde, vida sexual, dado genético ou biométrico.',
     '<b>Agentes da LGPD:</b> <b>controlador</b> (decide sobre o tratamento), <b>operador</b> (trata os dados em nome do controlador), <b>encarregado (DPO)</b> (canal de comunicação com os titulares e a ANPD).'],
    ['<b>Bases legais (art. 7º):</b> consentimento; cumprimento de obrigação legal ou regulatória; execução de políticas públicas pela administração; estudos por órgão de pesquisa; execução de contrato; exercício regular de direitos; proteção da vida; tutela da saúde; legítimo interesse; proteção do crédito.',
     '<b>Direitos do titular:</b> confirmação da existência de tratamento, acesso, correção, anonimização ou bloqueio, portabilidade, eliminação, informação sobre compartilhamento e revogação do consentimento.',
     '<b>Sanções (art. 52):</b> advertência, multa simples de até 2% do faturamento, limitada a R$ 50 milhões por infração, e outras. A multa não se aplica ao poder público, mas ele responde pelas demais sanções.',
     '<b>Princípios:</b> finalidade, adequação, necessidade, livre acesso, qualidade dos dados, transparência, segurança, prevenção, não discriminação e responsabilização.',
     'A <b>Lei 14.133/2021</b> (noções): princípios, agentes de contratação, fases da licitação, fiscalização e gestão contratual (ver o tópico de Licitações em Legislação).']), BASE);

  /* ---------- LC 404/2010: RPPS do IPAM (matéria Previdência) ---------- */
  var avisoLC = '<p class="aviso">Resumo do texto consolidado da LC nº 404/2010 (SAPL da Câmara de Porto Velho, consultado em 13/11/2026), com as alterações indicadas no próprio texto. O edital cobra a LC 404/2010 "e alterações posteriores": confira o texto atual e leia também a EC nº 103/2019, que pode superar regras antigas.</p>';
  add('previdencia', PFT('lc404-segurados', 'LC 404/2010: o RPPS/IPAM, segurados, dependentes e gestão', 'Lei Complementar 404 2010 Porto Velho RPPS IPAM segurados dependentes classes conselho municipal de previdência',
    'O edital do IPAM cobra expressamente a LC nº 404/2010: finalidades, segurados, dependentes, benefícios e custeio. Este tópico cobre quem é quem no regime.' + '</p>' + avisoLC + '<p>',
    ['<b>Natureza (art. 1º):</b> o RPPS/IPAM é órgão da administração municipal indireta, com personalidade jurídica de natureza <b>autárquica</b>, vinculado à Secretaria Municipal de Administração (SEMAD), com autonomia administrativa, jurídica, patrimonial e financeira.',
     '<b>Finalidades (art. 2º):</b> garantir meios de subsistência nos eventos de doença, invalidez, acidente em serviço, inatividade, falecimento e reclusão, e proteger a maternidade e a família.',
     '<b>Segurados titulares (art. 4º):</b> o servidor municipal titular de <b>cargo efetivo</b> (Executivo, autarquias, fundações e Legislativo) e os aposentados nesses cargos. <b>Excluídos:</b> quem ocupa exclusivamente cargo em comissão, cargo temporário ou emprego público (vão para o RGPS).',
     '<b>Perda da condição de segurado (art. 8º):</b> morte, exoneração ou demissão, cassação de aposentadoria e falta de recolhimento das contribuições.',
     '<b>Dependentes (art. 9º):</b> <b>Classe I</b> cônjuge, companheiro(a) e filho não emancipado, menor ou inválido; <b>Classe II</b> pais; <b>Classe III</b> irmão não emancipado, menor ou inválido. A dependência da Classe I é <b>presumida</b>; as demais precisam ser comprovadas. A existência de dependente de uma classe exclui os das classes seguintes.'],
    ['A inscrição do segurado é <b>inerente à investidura</b> no cargo efetivo (art. 11); ao segurado cabe inscrever os dependentes (art. 12). A inscrição de dependente inválido exige laudo médico-pericial do IPAM.',
     '<b>Unidade gestora (art. 13):</b> o IPAM administra e paga os benefícios; o <b>Fundo de Previdência Social (FPS)</b> garante o plano de benefícios, sob gestão da Diretoria Executiva e fiscalização do Conselho.',
     '<b>Conselho Municipal de Previdência (CMP):</b> órgão superior de deliberação, membros nomeados pelo Prefeito, <b>mandato de 3 anos</b>, reunião ordinária mensal; decide por maioria absoluta dos presentes, com voto de desempate do presidente (arts. 32 a 34).',
     '<b>Diretoria Executiva (art. 37):</b> 4 membros: Diretor-Presidente, Coordenador Administrativo e Financeiro, Coordenador de Previdência e Coordenador de Assistência.',
     'O filho equiparado (enteado e menor sob tutela) exige declaração do segurado e comprovação da dependência; <b>menor sob guarda judicial não pode ser inscrito</b> como dependente (art. 9º, § 6º).']), ['previdencia']);
  add('previdencia', PFT('lc404-custeio', 'LC 404/2010: custeio, contribuições e recursos do RPPS', 'Lei Complementar 404 2010 Porto Velho custeio contribuição 14% segregação de massa fundo financeiro taxa de administração IPAM',
    'Custeio é onde estão os percentuais: banca adora cobrar "quanto" e "quem paga".' + '</p>' + avisoLC + '<p>',
    ['<b>Contribuição do servidor ativo:</b> <b>14%</b> sobre a remuneração de contribuição (redação da LC nº 834/2021).',
     '<b>Aposentados e pensionistas:</b> contribuem com 14% sobre a parcela dos proventos que <b>supere o teto do RGPS</b>.',
     '<b>Contribuição patronal (Município):</b> <b>14%</b> para o grupo de servidores em atividade até 12/11/2019; <b>14,36%</b> para os servidores que ingressaram por concurso a partir de 13/11/2019; <b>19%</b> para o grupo magistério (Professor e Especialista em Educação).',
     '<b>Segregação da massa (art. 15):</b> dois grupos de segurados, um do <b>Fundo Financeiro</b> (repartição simples) e outro dos novos servidores (capitalização). O ente cobre insuficiências financeiras.',
     '<b>Plano de custeio (art. 17):</b> revisto <b>anualmente</b> por avaliação atuarial; o DRAA é enviado ao Ministério da Previdência até 31 de março.'],
    ['<b>Recursos do RPPS</b> ficam em contas distintas das do Tesouro Municipal (art. 18) e só podem pagar benefícios, taxa de administração e compensação previdenciária (art. 30).',
     '<b>Base de cálculo (art. 22):</b> subsídio ou vencimento, adicionais individuais e vantagens permanentes. Não integram: diárias, ajuda de custo, auxílio-transporte, salário-família, auxílio-alimentação, jetons, plantão extra, entre outras.',
     '<b>Contribuição em atraso:</b> correção monetária e juros de 0,5% ao mês, com IPCA (art. 20). Salvo recolhimento indevido, <b>não há restituição</b> ao segurado (art. 21).',
     '<b>Taxa de administração (art. 31):</b> na redação dada pela LC 922/2022, soma de 1,7% (funcionamento do gestor) e 0,34% (Pró-Gestão, 20% do primeiro percentual), totalizando 2,04% sobre as remunerações brutas de servidores, aposentados e pensionistas do exercício anterior.',
     'O servidor afastado ou licenciado sem remuneração só conta o tempo para aposentadoria se recolher a contribuição, até o dia 15 do mês seguinte (art. 27).']), ['previdencia']);
  add('previdencia', PFT('lc404-beneficios', 'LC 404/2010: plano de benefícios do RPPS/IPAM', 'Lei Complementar 404 2010 Porto Velho benefícios aposentadoria invalidez compulsória voluntária auxílio-doença salário-maternidade pensão por morte IPAM',
    'O plano de benefícios é o capítulo mais cobrado da LC 404. Decore o rol e os números-chave.' + '</p>' + avisoLC + '<p>',
    ['<b>Rol (art. 39):</b> para o servidor: aposentadoria por invalidez, compulsória, voluntária por idade e tempo de contribuição, voluntária por idade, especial do professor, auxílio-doença, salário-maternidade e salário-família. Para o dependente: <b>pensão por morte</b> e <b>auxílio-reclusão</b>.',
     '<b>Aposentadoria por invalidez (arts. 40 e 41):</b> quando o servidor é incapaz e insuscetível de readaptação; o aposentado faz <b>perícia médica a cada 2 anos</b> (bienal); o não comparecimento suspende o pagamento.',
     '<b>Aposentadoria voluntária por idade (art. 43):</b> 10 anos de serviço público, 5 anos no cargo e <b>65 anos de idade (homem) ou 60 (mulher)</b>. O <b>professor</b> tem os requisitos reduzidos em 5 anos (art. 44).',
     '<b>Auxílio-doença (art. 45):</b> incapacidade por mais de <b>15 dias consecutivos</b>, no valor da última remuneração do cargo efetivo.',
     '<b>Salário-maternidade (art. 47):</b> <b>120 dias</b>, começando entre 28 dias antes do parto e a data do parto; na adoção: 120 dias (criança até 1 ano), 60 dias (1 a 4 anos) e 30 dias (4 a 8 anos) (art. 48).'],
    ['<b>Aposentadoria compulsória:</b> o texto consolidado da LC 404 (art. 42) fala em 70 anos com proventos proporcionais; a Constituição, após a LC 152/2015, fixa <b>75 anos</b>. Em prova, confira qual norma a questão cita.',
     '<b>Salário-família (art. 49):</b> por filho até 14 anos incompletos ou inválido; condiciona-se à certidão de nascimento e, anualmente, ao atestado de vacinação e à comprovação de frequência escolar (art. 52).',
     '<b>Pensão por morte (arts. 54 e 55):</b> paga ao conjunto de dependentes; o texto prevê a totalidade dos proventos ou da remuneração até o teto do RGPS, mais 70% do que exceder o teto. Devida a contar do óbito se requerida em até <b>30 dias</b>; depois, da data do requerimento.',
     'A <b>EC nº 103/2019</b> e a legislação federal posterior mudaram regras de pensão e de aposentadoria; o edital cita "alterações posteriores", então confira as regras vigentes antes da prova.',
     'O <b>abono de permanência</b> (capítulo VIII) é pago ao servidor que já cumpriu os requisitos da aposentadoria voluntária e opta por continuar trabalhando.']), ['previdencia']);

  /* Tópicos de Legislação (SEMED) que também valem para o IPAM */
  var also = ['cf-art37', 'transparencia-etica', 'licitacoes', 'lbi', 'lc385-provimento', 'lc385-direitos', 'lc385-disciplinar', 'lei-organica', 'servidores'];
  mat('legislacao').topicos.forEach(function (t) { if (also.indexOf(t.id) >= 0) t.also = ['previdencia']; });

  /* ---------- Direitos Humanos (Bloco I da PF) ---------- */
  M({
    id: 'pf-dh', nome: 'Direitos Humanos', cor: '#9333ea', questoes: 6, peso: 'estimado',
    banca: 'No edital da PF de 2025 (Bloco I) a lista inclui a Constituição, convenções da ONU, uso da força (Lei 13.060/2014 e Decreto 12.341/2024) e Havana. Conteúdo conforme o edital de referência; o novo edital pode mudar.',
    topicos: []
  });
  add('pf-dh', PFT('dh-sistemas', 'Direitos humanos na Constituição e no sistema internacional', 'direitos humanos constituição art 5 §3 tratados status supralegal ONU OEA convenção refugiados genocídio discriminação racial tortura',
    'Cebraspe cobra o texto das convenções e o status dos tratados no Brasil. Poucos conceitos rendem muitos itens.',
    ['<b>Constituição:</b> dignidade da pessoa humana é fundamento da República (art. 1º, III); nas relações internacionais o Brasil rege-se pela <b>prevalência dos direitos humanos</b> (art. 4º, II).',
     '<b>Status dos tratados (art. 5º, §§ 2º e 3º):</b> tratados de direitos humanos aprovados em cada Casa do Congresso, em dois turnos, por <b>3/5</b> dos membros, equivalem a <b>emendas constitucionais</b>. Os aprovados sem esse quórum têm status <b>supralegal</b> (acima da lei, abaixo da Constituição), segundo o STF.',
     '<b>Sistemas:</b> o <b>global</b> (ONU: Declaração Universal de 1948, Pactos de 1966) e o <b>regional</b> (OEA: Convenção Americana de Direitos Humanos, o Pacto de San José, de 1969, com Comissão e Corte Interamericana).',
     '<b>Convenção contra o Genocídio (1948):</b> atos cometidos com a intenção de destruir, no todo ou em parte, um grupo nacional, étnico, racial ou religioso.',
     '<b>Refugiados (1951 e Protocolo de 1967):</b> refugiado é quem, por temor fundado de perseguição por raça, religião, nacionalidade, grupo social ou opiniões políticas, está fora do seu país. Princípio da <b>não devolução (non-refoulement)</b>: não se devolve o refugiado a território onde sua vida ou liberdade corra risco.'],
    ['<b>Convenção sobre a Eliminação de Todas as Formas de Discriminação Racial (1965)</b> e <b>sobre a Eliminação de Todas as Formas de Discriminação contra a Mulher (1979)</b> obrigam os Estados a adotar políticas de eliminação da discriminação.',
     '<b>Convenção contra a Tortura (1984):</b> tortura é a dor ou sofrimento intenso infligido por agente público ou com sua anuência para obter informação, castigar ou intimidar; nenhuma circunstância excepcional a justifica.',
     '<b>Convenção contra o Desaparecimento Forçado (2006)</b> e as <b>Regras Mínimas da ONU para o tratamento de presos</b> (Regras de Nelson Mandela) protegem a dignidade da pessoa presa.',
     'A <b>Declaração Universal de 1948</b> é uma resolução da Assembleia Geral: não é tratado, mas tem enorme força moral e jurídica.',
     'O <b>Tribunal Penal Internacional</b> tem a adesão do Brasil prevista no art. 5º, § 4º, da Constituição.']), ['policial']);
  add('pf-dh', PFT('dh-forca', 'Uso da força e de armas de fogo (Lei 13.060/2014, Decreto 12.341/2024 e Havana)', 'uso da força armas de fogo lei 13060 2014 decreto 12341 2024 princípios básicos Havana instrumentos de menor potencial ofensivo',
    'Todo policial federal usa a força: este é o tema "de ouro" de Direitos Humanos.',
    ['<b>Lei 13.060/2014:</b> os órgãos de segurança pública devem <b>priorizar instrumentos de menor potencial ofensivo</b>, desde que isso não coloque em risco a integridade física ou psíquica dos policiais, obedecendo aos princípios da <b>legalidade, necessidade, razoabilidade e proporcionalidade</b>.',
     '<b>Não é legítimo o uso de arma de fogo</b> contra pessoa em fuga desarmada ou que, mesmo armada, não represente risco imediato de morte ou lesão aos agentes ou a terceiros; nem contra veículo que desrespeite bloqueio policial, salvo ameaça imediata de morte ou lesão (art. 2º, parágrafo único).',
     '<b>Princípios Básicos de Havana (1990):</b> a força e as armas de fogo só devem ser usadas quando outros meios forem ineficazes; armas de fogo apenas em legítima defesa ou defesa de outras pessoas contra ameaça iminente de morte ou lesão grave, para prevenir crime particularmente grave ou para deter pessoa que represente esse perigo.',
     'Antes de usar a arma de fogo, o policial deve <b>identificar-se e dar aviso claro</b> da sua intenção, com tempo suficiente, salvo se isso aumentar o risco.',
     'O <b>Decreto 12.341/2024</b> regulamenta a Lei 13.060 para disciplinar o uso da força e dos instrumentos de menor potencial ofensivo pelos profissionais de segurança pública.'],
    ['Após o uso da força, é dever prestar <b>socorro e assistência médica</b> aos feridos e comunicar o fato à autoridade competente.',
     'O uso de força além do necessário é <b>excesso punível</b> e pode configurar abuso de autoridade (Lei 13.869/2019) e outros crimes.',
     '<b>Instrumentos de menor potencial ofensivo</b> são equipamentos e munições desenvolvidos para conter, debilitar ou incapacitar temporariamente, com baixa probabilidade de causar morte.',
     'Os princípios <b>necessidade</b> (só quando indispensável) e <b>proporcionalidade</b> (intensidade compatível com a ameaça) são os mais cobrados.',
     'A hierarquia do uso da força vai da presença e verbalização à contenção física, aos instrumentos de menor potencial ofensivo e, por último, à arma de fogo.']), ['policial']);
  add('pf-dh', PFT('dh-tortura', 'Crime de tortura (Lei 9.455/1997)', 'lei 9455 1997 crime de tortura pena reclusão 2 a 8 anos agente público perda do cargo inafiançável',
    'A tortura é o crime que liga Direitos Humanos ao Direito Penal e aparece nos editais da PF todos os anos.',
    ['<b>Tipo (art. 1º, I):</b> constranger alguém com violência ou grave ameaça, causando sofrimento físico ou mental, para obter informação, declaração ou confissão; para provocar ação ou omissão criminosa; ou em razão de discriminação racial ou religiosa. <b>Pena:</b> reclusão de 2 a 8 anos.',
     '<b>Tortura-castigo (art. 1º, II):</b> submeter quem está sob guarda, poder ou autoridade, com violência ou grave ameaça, a intenso sofrimento como forma de aplicar castigo pessoal ou medida de caráter preventivo. Mesma pena.',
     '<b>Pessoa presa (art. 1º, § 1º):</b> submeter pessoa presa ou sujeita a medida de segurança a sofrimento físico ou mental por ato não previsto em lei ou não resultante de medida legal. Mesma pena.',
     '<b>Omissão (§ 2º):</b> quem se omite diante dessas condutas, tendo o dever de evitá-las ou apurá-las: detenção de 1 a 4 anos.',
     '<b>Resultados (§ 3º):</b> lesão corporal grave ou gravíssima: reclusão de 4 a 10 anos; morte: reclusão de 8 a 16 anos.'],
    ['<b>Aumento de pena de 1/6 a 1/3 (§ 4º)</b> se o crime é cometido por agente público, contra criança, gestante, pessoa com deficiência, adolescente ou maior de 60 anos, ou mediante sequestro.',
     '<b>Efeito da condenação (§ 5º):</b> perda do cargo, função ou emprego público e interdição para seu exercício pelo <b>dobro do prazo da pena</b>.',
     '<b>Natureza (§ 6º):</b> crime <b>inafiançável e insuscetível de graça ou anistia</b>, como manda a Constituição (art. 5º, XLIII).',
     'O condenado cumprirá a pena em regime inicialmente fechado, na forma do § 7º do art. 1º.',
     'A lei se aplica também ao crime cometido fora do território nacional, se a vítima for brasileira ou o agente estiver em local sob jurisdição brasileira (art. 2º).']), ['policial']);

  /* ---------- Contabilidade Geral (Bloco III da PF = 24 itens, Agente) ---------- */
  M({
    id: 'pf-contab', nome: 'Contabilidade Geral', cor: '#0891b2', questoes: 24, peso: 'estimado',
    banca: 'No edital da PF de 2025, o Bloco III do Agente (24 itens) é Contabilidade Geral: patrimônio, atos e fatos, contas, escrituração, balancete, balanço e DRE. Referência: o novo edital pode mudar.',
    topicos: []
  });
  add('pf-contab', PFT('patrimonio-fatos', 'Patrimônio, atos e fatos contábeis', 'contabilidade geral patrimônio ativo passivo patrimônio líquido equação fatos permutativos modificativos mistos',
    'O Bloco III vale 24 itens e quase todos partem da equação do patrimônio. Quem entende isso resolve metade da prova.',
    ['<b>Patrimônio:</b> conjunto de <b>bens</b> (coisas úteis), <b>direitos</b> (a receber) e <b>obrigações</b> (a pagar). <b>Ativo</b> = bens + direitos. <b>Passivo exigível</b> = obrigações com terceiros.',
     '<b>Patrimônio líquido (situação líquida) = Ativo − Passivo exigível.</b> Equação fundamental: <b>Ativo = Passivo + Patrimônio Líquido.</b>',
     '<b>Fatos permutativos</b> trocam elementos do patrimônio sem alterar o patrimônio líquido (compra de mercadoria à vista).',
     '<b>Fatos modificativos</b> alteram o patrimônio líquido: <b>aumentativos</b> (receitas) e <b>diminutivos</b> (despesas).',
     '<b>Fatos mistos</b> têm parte permutativa e parte modificativa (pagamento de uma dívida com juros).'],
    ['<b>Atos administrativos</b> (contrato assinado, procuração) não alteram o patrimônio; <b>fatos administrativos</b> alteram.',
     'Exemplo: Ativo de R$ 500 mil e Passivo de R$ 200 mil dão Patrimônio Líquido de R$ 300 mil. Se há passivo a descoberto, o PL é negativo.',
     'O <b>ativo circulante</b> reúne bens e direitos realizáveis até o fim do exercício seguinte; o <b>não circulante</b>, os de longo prazo e permanentes.',
     'O <b>passivo circulante</b> reúne obrigações com vencimento no curto prazo.',
     'A <b>depreciação</b> é a perda de valor dos bens do imobilizado por desgaste, uso ou obsolescência; é <b>despesa</b> que reduz o patrimônio líquido.']), ['policial']);
  add('pf-contab', PFT('contas-escrituracao', 'Contas, partidas dobradas, regimes e demonstrações', 'contabilidade geral contas débito crédito partidas dobradas regime de competência regime de caixa balancete balanço patrimonial DRE',
    'Débito e crédito não são "bom" e "ruim": cada conta tem sua natureza. A regra dos regimes e das demonstrações fecha o bloco.',
    ['<b>Contas devedoras:</b> Ativo e Despesas. <b>Contas credoras:</b> Passivo, Patrimônio Líquido e Receitas.',
     '<b>Débito aumenta</b> Ativo e Despesas; <b>crédito aumenta</b> Passivo, Patrimônio Líquido e Receitas. Débito diminui contas credoras; crédito diminui contas devedoras.',
     '<b>Método das partidas dobradas:</b> todo lançamento tem débito e crédito de igual valor; a soma dos débitos é igual à soma dos créditos.',
     '<b>Regime de competência:</b> receitas e despesas são reconhecidas no período em que ocorre o fato gerador, independentemente de recebimento ou pagamento. <b>Regime de caixa:</b> só no recebimento ou pagamento.',
     '<b>Balancete de verificação:</b> relação dos saldos de todas as contas, para conferir se débitos e créditos fecham.'],
    ['<b>Balanço Patrimonial:</b> mostra a posição do patrimônio num momento (Ativo, Passivo e Patrimônio Líquido).',
     '<b>Demonstração do Resultado do Exercício (DRE):</b> mostra receitas, custos e despesas do período e chega ao resultado (lucro ou prejuízo): Receitas − Custos − Despesas.',
     'A <b>Lei nº 6.404/1976</b> (Lei das S.A.) e os pronunciamentos do <b>CPC</b> regulam a escrituração e as demonstrações; a <b>NBC TSP</b> trata da contabilidade do setor público.',
     '<b>Escrituração:</b> registro dos fatos nos livros contábeis (Diário e Razão). O Diário registra em ordem cronológica; o Razão agrupa por conta.',
     'Pagar salários do mês é fato <b>modificativo diminutivo</b> (despesa); receber uma duplicata de cliente é <b>permutativo</b> (troca "Duplicatas a receber" por "Caixa").']), ['policial']);
})();

/* ===== Questões ===== */
QX('pf-info', 'windows-office', 1, 'No Windows, o atalho de teclado que bloqueia a tela do computador é:',
  ['Ctrl+Alt+Del', 'Win+L', 'Alt+F4', 'Win+D', 'Ctrl+Shift+Esc'], 1,
  'Win+L bloqueia a sessão.',
  ['Abre a tela de segurança (com opção de bloquear), mas não é o atalho direto.', 'Correta: Win+L.', 'Fecha a janela ativa.', 'Mostra a área de trabalho.', 'Abre o Gerenciador de Tarefas.']);
QX('pf-info', 'windows-office', 1, 'O atalho Ctrl+Z, na maioria dos programas do Windows, serve para:',
  ['colar', 'copiar', 'recortar', 'desfazer a última ação', 'salvar'], 3,
  'Ctrl+Z desfaz; Ctrl+Y refaz.',
  ['Colar é Ctrl+V.', 'Copiar é Ctrl+C.', 'Recortar é Ctrl+X.', 'Correta.', 'Salvar costuma ser Ctrl+S ou Ctrl+B conforme o programa.']);
QX('pf-info', 'windows-office', 2, 'No Explorador de Arquivos do Windows, excluir um arquivo com Shift+Delete:',
  ['envia o arquivo para a Lixeira', 'exclui o arquivo permanentemente, sem passar pela Lixeira', 'copia o arquivo para a nuvem', 'move o arquivo para a Área de Trabalho', 'apenas oculta o arquivo'], 1,
  'Shift+Delete pula a Lixeira, com confirmação.',
  ['Isso é o Delete simples.', 'Correta.', 'Não envia para a nuvem.', 'Não move o arquivo.', 'Não é ocultar.']);
QX('pf-info', 'windows-office', 2, 'Em uma planilha, se A1=2, A2=4 e A3=6, o resultado de =MÉDIA(A1:A3) é:',
  ['3', '4', '6', '12', '2'], 1,
  '(2 + 4 + 6) ÷ 3 = 4.',
  ['Erro de conta.', 'Correta.', 'É o maior valor.', 'É a soma.', 'É o menor valor.']);
QX('pf-info', 'windows-office', 2, 'Em uma planilha, a referência $A$1 é:',
  ['relativa', 'absoluta, pois não muda ao copiar a fórmula', 'mista, travando só a coluna', 'mista, travando só a linha', 'inválida'], 1,
  'Cifrões travam coluna e linha.',
  ['Relativa seria A1.', 'Correta.', 'Mista com coluna travada seria $A1.', 'Mista com linha travada seria A$1.', 'É uma referência válida.']);
QX('pf-info', 'windows-office', 2, 'Se A1 contém 6,5, o resultado de =SE(A1>=7;"Aprovado";"Reprovado") é:',
  ['Aprovado', 'Reprovado', '6,5', 'Erro', 'FALSO'], 1,
  '6,5 não é maior ou igual a 7: devolve o valor se falso.',
  ['A condição é falsa.', 'Correta.', 'A função devolve texto.', 'A fórmula é válida.', 'Devolve o texto indicado.']);
QX('pf-info', 'internet-nuvem', 1, 'Ao enviar um e-mail para várias pessoas, o campo Cco (cópia oculta) serve para:',
  ['enviar o e-mail só para você', 'enviar a mensagem sem que os destinatários vejam quem mais a recebeu', 'anexar arquivos', 'criptografar a mensagem', 'bloquear respostas'], 1,
  'Quem está em Cco não é exibido aos demais.',
  ['Não é essa a função.', 'Correta.', 'Anexos têm botão próprio.', 'Cco não criptografa.', 'Não bloqueia respostas.']);
QX('pf-info', 'internet-nuvem', 2, 'O modelo de computação em nuvem em que o usuário usa um software pronto pela internet, sem gerenciar servidores, é o:',
  ['IaaS', 'PaaS', 'SaaS', 'DaaS apenas', 'On-premises'], 2,
  'SaaS: software como serviço.',
  ['IaaS entrega infraestrutura.', 'PaaS entrega plataforma de desenvolvimento.', 'Correta.', 'Não é o modelo descrito.', 'On-premises é local, não nuvem.']);
QX('pf-info', 'internet-nuvem', 2, 'A autenticação multifator (MFA) aumenta a segurança porque:',
  ['dispensa o uso de senha', 'combina a senha com um segundo fator, como um código no celular', 'torna a internet mais rápida', 'impede qualquer tipo de phishing', 'apaga cookies'], 1,
  'Segundo fator dificulta o uso de senha roubada.',
  ['Normalmente a senha continua sendo usada.', 'Correta.', 'Não afeta a velocidade.', 'Reduz risco, mas não impede todo phishing.', 'Não trata de cookies.']);
QX('pf-adm', 'adm-autarquias-lgpd', 1, 'A autarquia, segundo a Constituição, é criada:',
  ['por decreto do prefeito', 'por lei específica', 'por portaria da secretaria', 'por escritura pública', 'por ato do Tribunal de Contas'], 1,
  'Art. 37, XIX, da CF.',
  ['Decreto não cria autarquia.', 'Correta.', 'Portaria não cria autarquia.', 'Não se cria por escritura.', 'O Tribunal de Contas não cria autarquias.']);
QX('pf-adm', 'adm-autarquias-lgpd', 2, 'A distribuição de competências dentro da mesma pessoa jurídica, como entre secretarias de um município, é chamada de:',
  ['descentralização', 'desconcentração', 'delegação de serviço', 'privatização', 'terceirização'], 1,
  'Desconcentração: dentro da mesma pessoa jurídica.',
  ['Descentralização envolve outra pessoa jurídica.', 'Correta.', 'Delegação é outro instituto.', 'Privatização é outro conceito.', 'Terceirização é outro conceito.']);
QX('pf-adm', 'adm-autarquias-lgpd', 2, 'Segundo a LGPD (Lei nº 13.709/2018), são dados pessoais sensíveis, EXCETO:',
  ['origem racial ou étnica', 'convicção religiosa', 'dado referente à saúde', 'dado biométrico', 'o nome completo de uma pessoa, isoladamente considerado'], 4,
  'Nome é dado pessoal comum; os demais são sensíveis.',
  ['É dado sensível.', 'É dado sensível.', 'É dado sensível.', 'É dado sensível.', 'Correta: nome é dado pessoal comum.']);
QX('pf-adm', 'adm-autarquias-lgpd', 2, 'Na LGPD, a pessoa que realiza o tratamento de dados pessoais em nome do controlador é o:',
  ['encarregado', 'operador', 'titular', 'ANPD', 'agente público'], 1,
  'Controlador decide; operador trata em nome dele; encarregado é o canal de comunicação.',
  ['O encarregado é o canal de comunicação.', 'Correta.', 'Titular é a pessoa a quem os dados se referem.', 'A ANPD é a autoridade fiscalizadora.', 'Não é a figura da LGPD.']);
QX('pf-adm', 'adm-autarquias-lgpd', 2, 'A multa simples prevista na LGPD pode chegar a:',
  ['R$ 1 mil por infração', '2% do faturamento, limitada a R$ 50 milhões por infração', '10% do faturamento, sem limite', 'R$ 500 mil por dia', 'não há multa na LGPD'], 1,
  'Art. 52, II.',
  ['Não é o limite da lei.', 'Correta.', 'Não é o percentual da lei.', 'Não é o valor da lei.', 'Há multa, com limites.']);
QX('previdencia', 'lc404-segurados', 1, 'Segundo a LC nº 404/2010, o RPPS/IPAM é órgão da administração municipal indireta, com natureza:',
  ['de empresa pública', 'autárquica, vinculado à Secretaria Municipal de Administração (SEMAD)', 'de sociedade de economia mista', 'de fundação privada', 'de órgão da administração direta sem autonomia'], 1,
  'Art. 1º, parágrafo único.',
  ['Não é empresa pública.', 'Correta.', 'Não é sociedade de economia mista.', 'Não é fundação privada.', 'Tem autonomia administrativa, jurídica, patrimonial e financeira.']);
QX('previdencia', 'lc404-segurados', 2, 'NÃO é segurado titular do RPPS/IPAM:',
  ['o servidor titular de cargo efetivo do Executivo municipal', 'o servidor efetivo do Legislativo municipal', 'o aposentado em cargo efetivo', 'o ocupante exclusivamente de cargo em comissão', 'o servidor efetivo de autarquia municipal'], 3,
  'Art. 4º, § 1º: o ocupante só de cargo em comissão vai para o RGPS.',
  ['É segurado.', 'É segurado.', 'É segurado.', 'Correta: fica no Regime Geral.', 'É segurado.']);
QX('previdencia', 'lc404-segurados', 2, 'Na Classe I de dependentes da LC nº 404/2010 estão:',
  ['os pais', 'o cônjuge, o companheiro, a companheira e o filho não emancipado, menor ou inválido', 'os irmãos', 'os avós', 'os tios'], 1,
  'Art. 9º, a: classe I; dependência presumida.',
  ['Pais são Classe II.', 'Correta.', 'Irmãos são Classe III.', 'Avós não constam.', 'Tios não constam.']);
QX('previdencia', 'lc404-segurados', 2, 'O Conselho Municipal de Previdência (CMP) do IPAM tem membros com mandato de:',
  ['1 ano', '2 anos', '3 anos, admitida a recondução', '4 anos, vedada a recondução', '5 anos'], 2,
  'Art. 32: mandato de três anos.',
  ['Não é o prazo da lei.', 'Não é o prazo da lei.', 'Correta.', 'Não é o prazo da lei.', 'Não é o prazo da lei.']);
QX('previdencia', 'lc404-custeio', 2, 'Segundo a LC nº 404/2010 (redação da LC 834/2021), a contribuição do servidor ativo ao RPPS/IPAM incide sobre a remuneração de contribuição na razão de:',
  ['8%', '11%', '14%', '19%', '22%'], 2,
  'Art. 14, I: 14%.',
  ['Não é a alíquota atual.', 'Era a alíquota anterior à LC 834/2021.', 'Correta.', 'É a patronal do grupo magistério.', 'Não é a alíquota.']);
QX('previdencia', 'lc404-custeio', 2, 'A contribuição patronal do Município para o grupo magistério (Professor e Especialista em Educação) é de:',
  ['11%', '14%', '14,36%', '19%', '22%'], 3,
  'Art. 14, III, c (LC 969/2023): 19%.',
  ['Não é a do magistério.', 'É a patronal do grupo mais antigo.', 'É a patronal dos servidores novos.', 'Correta.', 'Não é a alíquota.']);
QX('previdencia', 'lc404-custeio', 2, 'O plano de custeio do RPPS/IPAM será revisto:',
  ['a cada 5 anos', 'anualmente, observadas as normas gerais de atuária', 'apenas quando o Prefeito quiser', 'a cada 10 anos', 'nunca, pois é fixo'], 1,
  'Art. 17.',
  ['Não é o prazo da lei.', 'Correta.', 'A lei determina revisão anual.', 'Não é o prazo da lei.', 'É revisto.']);
QX('previdencia', 'lc404-beneficios', 1, 'O auxílio-doença do RPPS/IPAM é devido ao segurado incapacitado para o trabalho por mais de:',
  ['3 dias consecutivos', '7 dias consecutivos', '15 dias consecutivos', '30 dias consecutivos', '60 dias consecutivos'], 2,
  'Art. 45.',
  ['Não é o prazo da lei.', 'Não é o prazo da lei.', 'Correta.', 'Não é o prazo da lei.', 'Não é o prazo da lei.']);
QX('previdencia', 'lc404-beneficios', 2, 'A segurada gestante tem direito ao salário-maternidade, no RPPS/IPAM, por:',
  ['60 dias', '90 dias', '120 dias consecutivos', '150 dias', '180 dias'], 2,
  'Art. 47: 120 dias.',
  ['Não é o prazo da lei.', 'Não é o prazo da lei.', 'Correta.', 'Não é o prazo da lei.', 'É o prazo ampliado da licença de programas de prorrogação, não do art. 47.']);
QX('previdencia', 'lc404-beneficios', 2, 'Pela LC nº 404/2010, o aposentado por invalidez deve se submeter a exames médico-periciais:',
  ['mensalmente', 'bienalmente (a cada 2 anos)', 'a cada 10 anos', 'nunca', 'só se for convocado pelo Prefeito'], 1,
  'Art. 41.',
  ['Não é a periodicidade da lei.', 'Correta.', 'Não é a periodicidade da lei.', 'Há reavaliação periódica.', 'A convocação segue o prazo legal.']);
QX('previdencia', 'lc404-beneficios', 2, 'A pensão por morte, no RPPS/IPAM, é devida a contar do dia do óbito se for requerida em até:',
  ['10 dias', '30 dias', '60 dias', '90 dias', '180 dias'], 1,
  'Art. 55, I.',
  ['Não é o prazo da lei.', 'Correta.', 'Não é o prazo da lei.', 'Não é o prazo da lei.', 'Não é o prazo da lei.']);
QX('pf-dh', 'dh-sistemas', 2, 'Segundo o art. 5º, § 3º, da Constituição, os tratados de direitos humanos aprovados com quórum de 3/5 em cada Casa do Congresso, em dois turnos, têm status de:',
  ['lei ordinária', 'norma supralegal', 'emenda constitucional', 'decreto', 'resolução'], 2,
  'Art. 5º, § 3º.',
  ['É o status geral dos tratados comuns.', 'É o status dos tratados de direitos humanos aprovados sem esse quórum.', 'Correta.', 'Não é o status.', 'Não é o status.']);
QX('pf-dh', 'dh-sistemas', 2, 'O princípio da não devolução (non-refoulement) proíbe:',
  ['conceder asilo', 'devolver o refugiado a território onde sua vida ou liberdade corra risco', 'exigir passaporte', 'expulsar qualquer estrangeiro', 'impedir a naturalização'], 1,
  'Convenção de 1951 sobre refugiados.',
  ['Não proíbe conceder asilo.', 'Correta.', 'Não trata de passaporte.', 'Não proíbe toda expulsão.', 'Não trata de naturalização.']);
QX('pf-dh', 'dh-sistemas', 1, 'A Convenção Americana de Direitos Humanos (Pacto de San José) integra o sistema:',
  ['global, da ONU', 'regional interamericano, da OEA', 'europeu', 'africano', 'asiático'], 1,
  'É o tratado central do sistema interamericano.',
  ['O global é o da ONU.', 'Correta.', 'O europeu tem outra convenção.', 'O africano tem outra carta.', 'Não há sistema asiático equivalente.']);
QX('pf-dh', 'dh-forca', 2, 'Segundo a Lei nº 13.060/2014, os órgãos de segurança pública devem priorizar:',
  ['armas de fogo de alto calibre', 'instrumentos de menor potencial ofensivo, desde que não coloquem em risco a integridade dos policiais', 'a força máxima em qualquer abordagem', 'o uso de algemas em todos os casos', 'o uso de cães sempre'], 1,
  'Art. 2º da Lei 13.060/2014.',
  ['A lei manda priorizar o menor potencial ofensivo.', 'Correta.', 'A força deve ser proporcional.', 'O uso de algemas tem regras próprias.', 'Não é regra da lei.']);
QX('pf-dh', 'dh-forca', 2, 'Segundo a Lei nº 13.060/2014, NÃO é legítimo o uso de arma de fogo:',
  ['em legítima defesa contra ameaça iminente de morte', 'contra pessoa em fuga desarmada que não represente risco imediato aos agentes ou a terceiros', 'para proteger a vida de terceiros em risco iminente', 'contra veículo que, em bloqueio, represente ameaça imediata de morte', 'em nenhuma hipótese'], 1,
  'Art. 2º, parágrafo único, I.',
  ['É hipótese de uso legítimo.', 'Correta.', 'É hipótese de uso legítimo.', 'É a exceção da lei: nesse caso o uso pode ser legítimo.', 'A lei admite o uso nas hipóteses legítimas.']);
QX('pf-dh', 'dh-forca', 2, 'Segundo os princípios de uso da força, a conduta deve ser compatível com a gravidade da ameaça. Esse é o princípio da:',
  ['legalidade', 'necessidade', 'proporcionalidade', 'conveniência apenas', 'discricionariedade ilimitada'], 2,
  'Proporcionalidade: intensidade compatível com a ameaça.',
  ['Legalidade: respaldo em lei.', 'Necessidade: só quando indispensável.', 'Correta.', 'Não é o princípio descrito.', 'O uso da força não é ilimitado.']);
QX('pf-dh', 'dh-tortura', 1, 'A pena-base do crime de tortura (Lei nº 9.455/1997, art. 1º, I e II) é de:',
  ['detenção de 1 a 4 anos', 'reclusão de 2 a 8 anos', 'reclusão de 12 a 30 anos', 'detenção de 6 meses a 2 anos', 'apenas multa'], 1,
  'Art. 1º: reclusão de 2 a 8 anos.',
  ['É a pena da tortura omissiva (§ 2º).', 'Correta.', 'É faixa de crimes mais graves.', 'Não é a pena.', 'Há pena de reclusão.']);
QX('pf-dh', 'dh-tortura', 2, 'A condenação por crime de tortura acarreta, como efeito:',
  ['multa automática de 10 salários', 'perda do cargo, função ou emprego público e interdição pelo dobro do prazo da pena', 'apenas advertência', 'suspensão por 30 dias', 'nenhum efeito além da pena'], 1,
  'Art. 1º, § 5º.',
  ['Não é o efeito da lei.', 'Correta.', 'Não é o efeito da lei.', 'Não é o efeito da lei.', 'Há efeitos da condenação.']);
QX('pf-dh', 'dh-tortura', 2, 'O crime de tortura é:',
  ['afiançável e passível de anistia', 'inafiançável e insuscetível de graça ou anistia', 'sempre de ação privada', 'contravenção penal', 'crime de menor potencial ofensivo'], 1,
  'Art. 1º, § 6º, e CF, art. 5º, XLIII.',
  ['É inafiançável.', 'Correta.', 'A ação é pública.', 'É crime, não contravenção.', 'Não é de menor potencial ofensivo.']);
QX('pf-contab', 'patrimonio-fatos', 1, 'Se o Ativo de uma entidade é de R$ 500.000 e o Passivo exigível é de R$ 200.000, o Patrimônio Líquido é de:',
  ['R$ 200.000', 'R$ 300.000', 'R$ 500.000', 'R$ 700.000', 'R$ 100.000'], 1,
  'PL = Ativo − Passivo = 500.000 − 200.000.',
  ['É o valor do passivo.', 'Correta.', 'É o valor do ativo.', 'Soma indevida.', 'Erro de conta.']);
QX('pf-contab', 'patrimonio-fatos', 2, 'A compra de mercadorias à vista, com dinheiro do caixa, é um fato contábil:',
  ['modificativo aumentativo', 'modificativo diminutivo', 'permutativo', 'misto', 'não é fato contábil'], 2,
  'Troca caixa por mercadorias: não altera o PL.',
  ['Aumento de receita não ocorre.', 'Despesa não ocorre na compra.', 'Correta.', 'Não há parte modificativa.', 'Altera elementos do patrimônio, é fato contábil.']);
QX('pf-contab', 'patrimonio-fatos', 2, 'O pagamento de salários do mês, à vista, é um fato:',
  ['permutativo', 'modificativo aumentativo', 'modificativo diminutivo', 'meramente administrativo (ato), sem efeito patrimonial', 'não registrado'], 2,
  'Reconhece despesa e reduz o patrimônio líquido.',
  ['Não é troca neutra.', 'Aumento de PL seria receita.', 'Correta.', 'Altera o patrimônio.', 'É registrado.']);
QX('pf-contab', 'contas-escrituracao', 1, 'São contas de natureza credora:',
  ['Ativo e Despesas', 'Passivo, Patrimônio Líquido e Receitas', 'Apenas o Caixa', 'Bens e Direitos', 'Despesas e Perdas'], 1,
  'Credoras: Passivo, PL e Receitas.',
  ['São devedoras.', 'Correta.', 'Caixa é conta de Ativo, devedora.', 'Bens e Direitos formam o Ativo (devedor).', 'Despesas são devedoras.']);
QX('pf-contab', 'contas-escrituracao', 2, 'No regime de competência, as despesas são reconhecidas:',
  ['quando são pagas', 'no período em que ocorre o fato gerador, independentemente do pagamento', 'apenas no fim do exercício', 'só quando há saldo no caixa', 'quando o contador decidir'], 1,
  'Competência: fato gerador, não caixa.',
  ['Isso é regime de caixa.', 'Correta.', 'O reconhecimento é no período do fato gerador.', 'Não depende do caixa.', 'Segue regra, não preferência.']);
QX('pf-contab', 'contas-escrituracao', 2, 'O débito aumenta o saldo das contas de:',
  ['Passivo', 'Patrimônio Líquido', 'Receitas', 'Ativo e Despesas', 'apenas contas credoras'], 3,
  'Débito aumenta Ativo e Despesas.',
  ['Crédito aumenta Passivo.', 'Crédito aumenta o PL.', 'Crédito aumenta Receitas.', 'Correta.', 'Débito diminui contas credoras.']);
QX('pf-contab', 'contas-escrituracao', 2, 'A Demonstração do Resultado do Exercício (DRE) evidencia:',
  ['a posição do patrimônio em uma data', 'as receitas, custos e despesas do período e o resultado (lucro ou prejuízo)', 'apenas os saldos do caixa', 'o balancete de verificação', 'a escrituração do livro Razão'], 1,
  'DRE mostra o resultado do período.',
  ['Isso é o Balanço Patrimonial.', 'Correta.', 'Não é só o caixa.', 'Balancete é outro relatório.', 'Razão é um livro.']);
QX('pf-contab', 'contas-escrituracao', 2, 'O balancete de verificação serve para:',
  ['apurar o imposto de renda', 'conferir se a soma dos débitos é igual à soma dos créditos, listando os saldos das contas', 'demonstrar o fluxo de caixa', 'substituir o balanço patrimonial', 'registrar as vendas'], 1,
  'Confere o equilíbrio das partidas dobradas.',
  ['Não apura imposto.', 'Correta.', 'Fluxo de caixa é outra demonstração.', 'Não substitui o balanço.', 'Vendas são registradas na escrituração.']);

/* ===== Cartões ===== */
if (typeof Cd === 'function') {
  Cd('previdencia', 'lc404-segurados', 'LC 404/2010: classes de dependentes?', 'Classe I: cônjuge, companheiro(a) e filho menor ou inválido (dependência presumida). Classe II: pais. Classe III: irmão menor ou inválido.');
  Cd('previdencia', 'lc404-segurados', 'LC 404/2010: natureza do IPAM e do CMP?', 'IPAM: autarquia vinculada à SEMAD. CMP: órgão de deliberação, mandato de 3 anos, reunião mensal; Diretoria Executiva com 4 membros.');
  Cd('previdencia', 'lc404-custeio', 'LC 404/2010: alíquotas?', 'Servidor ativo: 14%. Aposentados e pensionistas: 14% sobre o que superar o teto do RGPS. Município: 14%, 14,36% (ingresso desde 13/11/2019) e 19% (magistério).');
  Cd('previdencia', 'lc404-beneficios', 'LC 404/2010: rol de benefícios?', 'Servidor: aposentadorias (invalidez, compulsória, voluntária por idade e tempo, voluntária por idade, professor), auxílio-doença, salário-maternidade e salário-família. Dependente: pensão por morte e auxílio-reclusão.');
  Cd('previdencia', 'lc404-beneficios', 'LC 404/2010: números-chave?', 'Auxílio-doença: mais de 15 dias. Salário-maternidade: 120 dias. Invalidez: perícia bienal. Idade: 65 (H) e 60 (M), 10 anos no serviço público e 5 no cargo. Pensão: óbito se pedida em 30 dias.');
  Cd('pf-dh', 'dh-forca', 'Lei 13.060/2014: princípios e vedação?', 'Legalidade, necessidade, razoabilidade e proporcionalidade; priorizar menor potencial ofensivo. Não é legítimo disparar contra pessoa em fuga desarmada sem risco imediato.');
  Cd('pf-dh', 'dh-tortura', 'Lei 9.455/1997: pena e efeitos?', 'Reclusão de 2 a 8 anos; lesão grave 4 a 10; morte 8 a 16; aumento de 1/6 a 1/3 se agente público; perda do cargo e interdição pelo dobro da pena; inafiançável e sem graça ou anistia.');
  Cd('pf-contab', 'patrimonio-fatos', 'Equação fundamental do patrimônio?', 'Ativo = Passivo + Patrimônio Líquido. PL = Ativo − Passivo exigível.');
  Cd('pf-contab', 'contas-escrituracao', 'Natureza das contas?', 'Devedoras: Ativo e Despesas. Credoras: Passivo, PL e Receitas. Débito aumenta Ativo e Despesas; crédito aumenta Passivo, PL e Receitas.');
  Cd('pf-info', 'windows-office', 'Atalhos essenciais do Windows?', 'Ctrl+Z desfaz; Win+L bloqueia; Win+E abre o Explorador; Shift+Delete exclui sem Lixeira; Alt+Tab alterna janelas.');
  Cd('pf-adm', 'adm-autarquias-lgpd', 'LGPD: agentes?', 'Controlador decide; operador trata em nome do controlador; encarregado (DPO) é o canal com titulares e a ANPD. Multa: até 2% do faturamento, limitada a R$ 50 mi por infração.');
}
