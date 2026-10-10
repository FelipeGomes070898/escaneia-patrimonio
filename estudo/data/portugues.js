M({
  id: 'portugues', nome: 'Língua Portuguesa', cor: '#2563eb', questoes: 10, peso: '20%',
  banca: 'IBGP costuma cobrar texto + gramática aplicada. Treine ler o enunciado até o fim e eliminar alternativas.',
  topicos: [
    {
      id: 'interpretacao', titulo: 'Interpretação de texto, coesão e coerência', provavel: true,
      busca: 'interpretação de texto concursos banca IBGP',
      contexto: `<p>É a base de <b>todas</b> as provas: mesmo Lógica e Legislação exigem leitura atenta. Em Português, geralmente vale mais questões do que qualquer outro assunto da matéria.</p>`,
      basico: `<ul>
<li><b>Ideia central:</b> o que o autor quer dizer em uma frase. Pergunte: "sobre o que é e o que se afirma?".</li>
<li><b>Informação explícita:</b> está escrita no texto. <b>Inferência:</b> conclusão que o texto permite, sem estar escrita.</li>
<li><b>Coesão:</b> liga as partes (conectivos, pronomes). <b>Coerência:</b> faz sentido como um todo.</li>
<li><b>Conectivos:</b> mas, porém (oposição); porque, pois (causa); portanto, logo (conclusão); embora, ainda que (concessão).</li>
<li><b>Gêneros:</b> notícia, crônica, ofício, carta, artigo de opinião, charge, tirinha.</li>
</ul>
<p><b>Dica:</b> leia primeiro as perguntas, depois o texto; sublinhe palavras como <i>NÃO</i>, <i>EXCETO</i>, <i>INCORRETA</i>.</p>`,
      aprofundado: `<ul>
<li><b>Ironia e ambiguidade:</b> o sentido é o oposto do literal. Procure contexto e tom.</li>
<li><b>Vocabulário em contexto:</b> a mesma palavra muda de sentido. Troque pela palavra candidata e veja se o sentido se mantém.</li>
<li><b>Retomadas:</b> pronomes (ele, isso, tal) e substituições (a instituição, o órgão) retomam termos anteriores. Descubra a quem se referem.</li>
<li><b>Armadilha comum:</b> alternativa "verdadeira no mundo" mas que <u>não está no texto</u>. Responda só com base no texto.</li>
</ul>`
    },
    {
      id: 'classes', titulo: 'Classes de palavras', provavel: true,
      busca: 'classes gramaticais resumo para concurso substantivo adjetivo advérbio conjunção',
      contexto: `<p>Saber a classe da palavra ajuda a entender concordância, regência e pontuação. Questões pedem "classifique o termo destacado".</p>`,
      basico: `<ul>
<li><b>Substantivo:</b> dá nome (aluno, escola). <b>Adjetivo:</b> caracteriza o substantivo (aluno <i>aplicado</i>).</li>
<li><b>Verbo:</b> ação, estado ou fenômeno. <b>Advérbio:</b> modifica verbo, adjetivo ou outro advérbio (chegou <i>cedo</i>; <i>muito</i> bom).</li>
<li><b>Pronome:</b> substitui/acompanha o substantivo (ele, meu, este, que).</li>
<li><b>Preposição:</b> liga termos (de, a, em, com, por, para). <b>Conjunção:</b> liga orações ou termos (e, mas, porque, que).</li>
<li><b>Artigo:</b> o, a, um, uma. <b>Numeral:</b> dois, segundo. <b>Interjeição:</b> expressa emoção (Ufa!).</li>
</ul>`,
      aprofundado: `<ul>
<li><b>"Que"</b> pode ser pronome relativo (substitui termo e pode ser trocado por "o qual"), conjunção integrante (<i>Disse <u>que</u> viria</i>), conjunção comparativa etc.</li>
<li><b>Conjunções coordenativas:</b> aditivas (e), adversativas (mas, porém), alternativas (ou), conclusivas (logo, portanto), explicativas (pois, porque).</li>
<li><b>Mesma palavra, classes diferentes:</b> "Ela fala <i>muito</i>" (advérbio) × "<i>muitos</i> alunos" (pronome indefinido/adjetivo).</li>
</ul>`
    },
    {
      id: 'concordancia', titulo: 'Concordância verbal e nominal', provavel: true,
      busca: 'concordância verbal e nominal resumo concursos casos especiais',
      contexto: `<p>Concordância é "combinar" palavras: o verbo combina com o <b>sujeito</b>; o adjetivo, artigo e pronome combinam com o <b>substantivo</b>. Muito usada em ofícios e memorandos.</p>`,
      basico: `<ul>
<li><b>Regra geral (verbal):</b> verbo concorda com o sujeito em número e pessoa. <i>Os alunos chegaram.</i></li>
<li><b>Sujeito composto</b> antes do verbo: verbo no plural. <i>O diretor e a secretária abriram a reunião.</i></li>
<li><b>Verbos impessoais</b> ficam no singular: <i>haver</i> (= existir ou tempo decorrido) e <i>fazer</i> (tempo). <i>Havia muitos alunos. Faz dois anos.</i></li>
<li><b>Nominal:</b> adjetivo/artigo concordam com o substantivo. <i>As crianças estavam cansadas.</i></li>
<li><b>Anexo, obrigado, mesmo, próprio</b> concordam com o substantivo; <b>"em anexo"</b> é invariável.</li>
</ul>`,
      aprofundado: `<ul>
<li><b>"É proibido entrada"</b> × <b>"É proibida a entrada"</b>: com artigo, concorda; sem artigo, fica invariável ("É proibido entrada de animais").</li>
<li><b>Verbo + se:</b> <i>Vendem-se casas</i> (voz passiva, concorda) × <i>Precisa-se de funcionários</i> (sujeito indeterminado, singular).</li>
<li><b>Verbos auxiliares com impessoal:</b> <i>Deve haver erros</i> (não "devem haver").</li>
<li><b>Porcentagem, "a maioria de", "mais de um":</b> há casos com mais de uma possibilidade; só marque se a alternativa errada for evidente.</li>
</ul>`
    },
    {
      id: 'regencia-crase', titulo: 'Regência e crase', provavel: true,
      busca: 'regência verbal e crase resumo para concursos',
      contexto: `<p><b>Regência</b> é a "relação de dependência" entre verbo/nome e a preposição que o acompanha. <b>Crase</b> é a fusão da preposição <i>a</i> com o artigo <i>a(s)</i> ou com pronomes.</p>`,
      basico: `<ul>
<li><b>Crase = a (preposição) + a (artigo/pronome).</b> Teste: troque a palavra por um masculino; se aparecer "ao", há crase. <i>Fui à escola</i> (fui ao colégio).</li>
<li><b>Nunca há crase:</b> antes de verbo (<i>começou a falar</i>), de palavra masculina (<i>a pé</i>), de pronome pessoal (<i>entreguei a ela</i>), entre palavras repetidas (<i>cara a cara</i>).</li>
<li><b>Horas:</b> <i>às 8h</i>. <b>Cidades</b> sem artigo: <i>Cheguei <u>a</u> Porto Velho</i> (sem crase).</li>
<li><b>Regência:</b> <i>assistir ao jogo</i> (ver), <i>aspirar ao cargo</i>, <i>obedecer aos pais</i>, <i>preferir estudar a dormir</i>.</li>
</ul>`,
      aprofundado: `<ul>
<li><b>a + aquele/aquela/aquilo = àquele, àquela, àquilo</b> (crase obrigatória se o verbo exige "a"). <i>Refiro-me àquela servidora.</i></li>
<li><b>Cidade com adjetivo/determinante:</b> <i>Vou à bela Porto Velho.</i> (crase). Truque: "Vou <u>da</u> cidade → crase; vou <u>de</u> → sem crase".</li>
<li><b>Verbos com dupla regência:</b> <i>chegar a/em</i>, <i>ir a/para</i>. <i>Preferir</i> não admite "mais... do que".</li>
<li><b>Pronome relativo:</b> <i>A escola <u>a que</u> me refiro</i> (preposição exigida pelo verbo antes do "que").</li>
</ul>`
    },
    {
      id: 'pontuacao', titulo: 'Pontuação', provavel: true,
      busca: 'pontuação vírgula resumo concursos',
      contexto: `<p>A vírgula muda o sentido da frase. Em prova, o foco é separar o que <b>pode</b> do que <b>não pode</b> ter vírgula.</p>`,
      basico: `<ul>
<li><b>Use vírgula:</b> em enumerações (<i>lápis, caderno e borracha</i>), após adjunto adverbial deslocado (<i>Amanhã, a escola abre</i>), no vocativo (<i>Maria, venha</i>), nos apostos.</li>
<li><b>Não use vírgula</b> entre sujeito e verbo, nem entre verbo e complemento (<i>O secretário entregou o documento ao diretor</i>).</li>
<li><b>Ponto e vírgula</b> separa itens de lista longa; <b>dois-pontos</b> introduzem explicação/citação/enumeração.</li>
</ul>`,
      aprofundado: `<ul>
<li><b>Oração adjetiva:</b> sem vírgula = restritiva (só alguns); com vírgula = explicativa (todos). <i>Os alunos que chegaram cedo...</i> × <i>Os alunos, que chegaram cedo...</i></li>
<li><b>Antes de "e":</b> em geral sem vírgula, exceto se os sujeitos forem diferentes ou para ênfase.</li>
<li><b>Antes de "mas, porém, contudo":</b> vírgula. <b>Antes de "pois" explicativo:</b> vírgula.</li>
</ul>`
    },
    {
      id: 'ortografia', titulo: 'Ortografia e acentuação', provavel: true,
      busca: 'acentuação gráfica novo acordo ortográfico resumo concursos',
      contexto: `<p>Questões de ortografia pedem a forma correta de palavras confundíveis e o uso do acento conforme o Novo Acordo Ortográfico (em vigor desde 2009).</p>`,
      basico: `<ul>
<li><b>Oxítonas</b> terminadas em a, e, o, em (+s) levam acento: <i>sofá, café, vovô, também</i>.</li>
<li><b>Paroxítonas</b> levam acento quando terminam em: l, n, r, x, ps, ão, i(s), um, us, ditongo. <i>fácil, hífen, caráter, pódio, órgão</i>.</li>
<li><b>Proparoxítonas</b> sempre levam acento: <i>público, rápido</i>.</li>
<li><b>Mal × mau:</b> mal = oposto de bem; mau = oposto de bom. <b>Porque / por que / porquê / por quê:</b> resumo abaixo.</li>
</ul>`,
      aprofundado: `<ul>
<li><b>Novo Acordo:</b> não se acentua mais o <i>ditongo aberto</i> em paroxítonas (<i>ideia, assembleia, heroico</i>), mas <i>herói</i> (oxítona) mantém. Sumiu o trema (<i>linguiça</i>) e o acento em <i>voo, enjoo</i>.</li>
<li><b>Por que</b> (pergunta ou "pelo qual"), <b>porque</b> (resposta/explicação), <b>por quê</b> (fim de frase), <b>porquê</b> (substantivo: "o porquê").</li>
<li><b>Há / a:</b> "há" = tempo passado ou existir; "a" = tempo futuro/distância.</li>
</ul>`
    },
    {
      id: 'redacao-oficial', titulo: 'Redação oficial', provavel: true,
      busca: 'redação oficial manual da presidência ofício memorando pronomes de tratamento resumo',
      contexto: `<p>É a escrita usada pela administração pública (ofícios, memorandos, requerimentos). Muito próxima do dia a dia de uma secretaria escolar, por isso é boa para estudar.</p>`,
      basico: `<ul>
<li><b>Qualidades:</b> impessoalidade, formalidade, clareza, concisão, padronização, uso da norma-padrão.</li>
<li><b>Ofício:</b> comunicação com outros órgãos/particulares. <b>Memorando:</b> comunicação entre unidades do <u>mesmo</u> órgão. <b>Requerimento:</b> pedido do cidadão. <b>Ata:</b> registro de reunião.</li>
<li><b>Pronomes de tratamento:</b> Vossa Excelência (chefes de poder, ministros, prefeitos), Vossa Senhoria (demais autoridades e particulares), Vossa Magnificência (reitores).</li>
<li><b>Fechos:</b> <i>Respeitosamente</i> (autoridade superior); <i>Atenciosamente</i> (mesma hierarquia ou inferior).</li>
</ul>`,
      aprofundado: `<ul>
<li><b>Concordância com pronome de tratamento:</b> terceira pessoa (<i>Vossa Excelência determinou</i>), pronomes possessivos "Vossa/Sua".</li>
<li><b>Vocativo:</b> sem "Ilustríssimo" antes do nome; use "Senhor Secretário," em ofícios.</li>
<li>Confira sempre a versão vigente do <b>Manual de Redação da Presidência da República</b> (use como referência; o edital pode citar outra norma local) - <b>A CONFIRMAR NO EDITAL</b>.</li>
</ul>`
    }
  ]
});

/* ---- Questões de Português (originais) ---- */
var P = 'portugues';
Q(P, 'interpretacao', 1, 'Leia: "A secretaria da escola guarda a vida escolar de cada aluno: matrículas, notas e frequência. Sem esse registro, o estudante não consegue comprovar seus estudos." A ideia central do texto é:',
  ['A secretaria é responsável apenas por atender telefone.', 'A secretaria escolar é importante porque registra e comprova a vida escolar do aluno.', 'Os alunos não precisam de comprovação de estudos.', 'A frequência é o único documento escolar relevante.', 'As notas são registradas pelos pais.'], 1,
  'O texto afirma que a secretaria guarda os registros e que, sem eles, o aluno não comprova os estudos. As demais alternativas não aparecem no texto.');
Q(P, 'interpretacao', 2, 'Leia: "O prefeito afirmou que as obras terminarão em março; contudo, o cronograma ainda não foi divulgado." O conectivo "contudo" estabelece relação de:',
  ['Causa', 'Conclusão', 'Oposição', 'Adição', 'Finalidade'], 2,
  '"Contudo" é conjunção adversativa (= mas, porém): opõe a afirmação do prefeito à falta de divulgação do cronograma.');
Q(P, 'interpretacao', 2, 'No trecho "O funcionário chegou atrasado e, mesmo assim, foi elogiado pela chefia", a expressão "mesmo assim" indica:',
  ['Que o elogio era esperado diante do atraso', 'Que o elogio ocorreu apesar do atraso', 'Que o atraso foi causado pelo elogio', 'Que o funcionário não chegou atrasado', 'Que a chefia não percebeu o atraso'], 1,
  '"Mesmo assim" tem valor concessivo: o elogio aconteceu apesar do atraso.');
Q(P, 'interpretacao', 3, 'Leia: "Todos os alunos aprovados receberam certificado. Joana recebeu certificado." É CORRETO concluir, apenas com base nessas frases, que:',
  ['Joana foi aprovada.', 'Joana não foi aprovada.', 'Só os aprovados recebem certificado.', 'Nada se pode concluir com certeza sobre a aprovação de Joana.', 'Joana é a única que recebeu certificado.'], 3,
  'O texto diz que os aprovados recebem certificado, mas não diz que SÓ eles recebem. Receber certificado não prova ser aprovada. A alternativa C é a inversão indevida.');

Q(P, 'classes', 1, 'Em "Os alunos estudaram muito", a palavra "muito" é:',
  ['Adjetivo', 'Substantivo', 'Advérbio de intensidade', 'Preposição', 'Conjunção'], 2,
  '"Muito" modifica o verbo "estudaram", indicando intensidade: advérbio.');
Q(P, 'classes', 2, 'Em "A diretora disse que a reunião começaria cedo", a palavra "que" é:',
  ['Pronome relativo', 'Conjunção integrante', 'Advérbio', 'Preposição', 'Artigo'], 1,
  '"Que" introduz a oração que funciona como objeto de "disse" (disse ISSO): conjunção integrante.');
Q(P, 'classes', 2, 'Em "Estudou muito, mas não passou", o termo "mas" expressa:',
  ['Adição', 'Explicação', 'Conclusão', 'Oposição', 'Alternância'], 3,
  '"Mas" é conjunção coordenativa adversativa: indica oposição entre estudar muito e não passar.');
Q(P, 'classes', 1, 'Assinale a alternativa em que o termo em MAIÚSCULAS é um ADJETIVO:',
  ['O aluno APLICADO passou.', 'Ele ESTUDA à noite.', 'ONTEM choveu.', 'Fui COM ela.', 'UFA, terminei!'], 0,
  '"Aplicado" caracteriza o substantivo "aluno": adjetivo. As outras são verbo, advérbio, preposição e interjeição.');

Q(P, 'concordancia', 1, 'Assinale a frase CORRETA quanto à concordância:',
  ['Fazem dois anos que a escola abriu.', 'Faz dois anos que a escola abriu.', 'Haviam muitos alunos na fila.', 'Existe muitos problemas na secretaria.', 'Devem haver erros no sistema.'], 1,
  '"Fazer" indicando tempo é impessoal (singular). "Haver" no sentido de existir também é impessoal: "havia", "deve haver". "Existe" deveria ir ao plural.');
Q(P, 'concordancia', 2, 'Assinale a frase em que a concordância está CORRETA:',
  ['Segue anexo os documentos.', 'Seguem anexo os documentos.', 'Seguem anexos os documentos.', 'Segue anexos os documentos.', 'Seguem em anexas os documentos.'], 2,
  '"Anexo" é adjetivo e concorda com "documentos": "Seguem anexos". Já a locução "em anexo" é invariável.');
Q(P, 'concordancia', 1, 'Completando a frase com o verbo entre parênteses: "O diretor e a secretária ______ a reunião." (abrir, pretérito)',
  ['abriu', 'abriram', 'abriria', 'abrirá', 'abre'], 1,
  'Sujeito composto antes do verbo pede o plural: "abriram".');
Q(P, 'concordancia', 2, 'Assinale a alternativa em que o verbo HAVER está empregado corretamente:',
  ['Haviam muitos candidatos na fila.', 'Houveram problemas na inscrição.', 'Havia muitos candidatos na fila.', 'Haverão muitas vagas.', 'Hão de haver vagas.'], 2,
  'Com sentido de existir, "haver" é impessoal e fica no singular: "havia", "houve", "haverá".');
Q(P, 'concordancia', 2, 'Em qual frase a concordância nominal está correta?',
  ['É proibido a entrada de animais.', 'É proibida a entrada de animais.', 'São proibido as entradas.', 'É proibidos entrada de animais.', 'Estão proibida a entrada.'], 1,
  'Com artigo ("a entrada"), o adjetivo concorda: "proibida". Sem artigo, ficaria invariável: "É proibido entrada".');

Q(P, 'regencia-crase', 1, 'Assinale a alternativa em que a crase está CORRETAMENTE empregada:',
  ['Fui à pé.', 'Refiro-me àquela servidora.', 'Entreguei à ela o ofício.', 'Estou disposto à ajudar.', 'Chegamos à uma conclusão.'], 1,
  'Refiro-me A (preposição) + AQUELA = àquela. Não há crase antes de palavra masculina (a pé), pronome pessoal (a ela), verbo (a ajudar) ou artigo indefinido (a uma).');
Q(P, 'regencia-crase', 1, 'Assinale a frase correta:',
  ['Cheguei à Porto Velho ontem.', 'Cheguei a Porto Velho ontem.', 'Cheguei há Porto Velho ontem.', 'Cheguei á Porto Velho ontem.', 'Cheguei a à Porto Velho ontem.'], 1,
  'Porto Velho não admite artigo; portanto não há crase: "Cheguei a Porto Velho" (teste: "Venho de Porto Velho").');
Q(P, 'regencia-crase', 1, 'Assinale a única alternativa com o acento de crase corretamente empregado:',
  ['Vou à pé.', 'Atendemos à partir das 8h.', 'O expediente começa às 8h.', 'Entreguei à ela o ofício.', 'Estou disposto à ajudar.'], 2,
  'Com horas determinadas há crase: "às 8h". Nas demais, o "a" vem antes de palavra masculina, verbo ou pronome pessoal.');
Q(P, 'regencia-crase', 2, 'De acordo com a norma-padrão, a regência está correta em:',
  ['Assisti o jogo ontem.', 'Assisti ao jogo ontem.', 'Prefiro mais estudar do que dormir.', 'Aspirava o cargo de secretário.', 'Obedeço os meus pais.'], 1,
  '"Assistir" no sentido de ver exige "a". "Aspirar" (desejar) pede "ao cargo"; "obedecer" pede "aos pais"; "preferir" não admite "mais... do que".');
Q(P, 'regencia-crase', 2, 'Assinale a alternativa que apresenta a regência correta do verbo PREFERIR:',
  ['Prefiro estudar do que dormir.', 'Prefiro mais estudar que dormir.', 'Prefiro estudar a dormir.', 'Prefiro estudar à dormir.', 'Prefiro estudar sobre dormir.'], 2,
  'Preferir uma coisa A outra. Por isso: "Prefiro estudar a dormir". Sem "mais", sem "do que".');

Q(P, 'pontuacao', 1, 'Assinale a alternativa em que há uso INCORRETO da vírgula:',
  ['Os alunos, que chegaram cedo, foram atendidos.', 'O secretário entregou, o documento ao diretor.', 'Amanhã, a escola abre às 7h.', 'Maria, venha cá.', 'Comprei lápis, caderno e borracha.'], 1,
  'Não se separa verbo de seu complemento com vírgula. As demais usam vírgula em oração explicativa, adjunto deslocado, vocativo e enumeração.');
Q(P, 'pontuacao', 2, 'Em "Os servidores, que são pontuais, receberam elogio.", a oração destacada é:',
  ['Adjetiva restritiva: só alguns servidores são pontuais.', 'Adjetiva explicativa: todos os servidores são pontuais.', 'Substantiva objetiva direta.', 'Adverbial causal.', 'Coordenada sindética aditiva.'], 1,
  'Entre vírgulas, "que são pontuais" é adjetiva explicativa: atribui a qualidade a todos os servidores.');
Q(P, 'pontuacao', 2, 'Assinale a alternativa em que a vírgula está corretamente empregada:',
  ['Os alunos, estudaram para a prova.', 'Na secretaria da escola, atendem-se pais e alunos.', 'O diretor, anunciou o resultado.', 'Estudei, e passei.', 'Preciso, de um documento.'], 1,
  'Adjunto adverbial deslocado ("Na secretaria da escola") é seguido de vírgula. Nas demais, a vírgula separa sujeito do verbo (A, C), une orações de mesmo sujeito sem necessidade (D) ou separa verbo e complemento (E).');

Q(P, 'ortografia', 1, 'Assinale a alternativa em que todas as palavras estão corretamente grafadas e acentuadas, segundo o Novo Acordo Ortográfico:',
  ['idéia, herói, público', 'ideia, herói, público', 'ideia, heroi, público', 'idéia, heroi, publico', 'ideia, herói, publico'], 1,
  '"Ideia" perdeu o acento (ditongo aberto em paroxítona); "herói" mantém (oxítona); "público" é proparoxítona.');
Q(P, 'ortografia', 1, 'Complete: "Ele é um ______ servidor e trabalha ______."',
  ['mal / mau', 'mau / mal', 'mau / mau', 'mal / mal', 'mal / mau'], 1,
  '"Mau" (oposto de bom) acompanha o substantivo; "mal" (oposto de bem) modifica o verbo.');
Q(P, 'ortografia', 2, 'Assinale a opção em que "por que" está corretamente empregado:',
  ['Porque você faltou ontem?', 'Por que você faltou ontem?', 'Porquê você faltou ontem?', 'Por quê você faltou ontem?', 'Por que, você faltou ontem?'], 1,
  'Em perguntas diretas, no início da frase, usa-se "por que" separado e sem acento.');

Q(P, 'redacao-oficial', 1, 'O documento utilizado para comunicação entre unidades administrativas de um mesmo órgão é o:',
  ['Requerimento', 'Memorando', 'Procuração', 'Edital', 'Ata'], 1,
  'Memorando é a comunicação interna entre setores do mesmo órgão. Ofício é usado para comunicação com outros órgãos ou particulares.');
Q(P, 'redacao-oficial', 1, 'Em redação oficial, o pronome de tratamento adequado para o Prefeito é:',
  ['Vossa Magnificência', 'Vossa Santidade', 'Vossa Senhoria', 'Vossa Excelência', 'Vossa Eminência'], 3,
  'Segundo o Manual de Redação da Presidência, Vossa Excelência é usada para chefes de poder, incluindo prefeitos. Vossa Magnificência é para reitores.');
Q(P, 'redacao-oficial', 2, 'Segundo o Manual de Redação da Presidência da República, é qualidade da redação oficial:',
  ['Uso de gírias para aproximar o leitor', 'Pessoalidade e emoção', 'Impessoalidade e clareza', 'Linguagem rebuscada e longa', 'Liberdade de formato conforme o autor'], 2,
  'A redação oficial é impessoal, formal, clara, concisa e padronizada.');
