M({
  id: 'especificos', nome: 'Conhecimentos Específicos', cor: '#047857', questoes: 15, peso: '30%',
  banca: 'Maior peso da prova (15 questões). Cargo de referência: Agente de Secretaria Escolar (SEMED). Fontes da internet citam também PME, patrimônio e sistemas de gestão escolar - tudo A CONFIRMAR NO ANEXO IV.',
  topicos: [
    {
      id: 'secretaria', titulo: 'Rotinas da secretaria escolar', provavel: true,
      busca: 'secretaria escolar rotinas atribuições do secretário escolar resumo',
      contexto: `<p>A secretaria é o setor que <b>registra, organiza e conserva</b> a vida escolar de alunos e a vida funcional de servidores. É o "cartório" da escola.</p>`,
      basico: `<ul>
<li><b>Principais rotinas:</b> matrícula e rematrícula, transferências, emissão de declarações e históricos, controle de frequência, atendimento a pais e alunos, arquivo e protocolo.</li>
<li><b>Princípios do trabalho:</b> sigilo das informações pessoais, exatidão dos registros, organização, prazos.</li>
<li><b>Relação com a direção:</b> o secretário auxilia a direção, mas assinaturas oficiais seguem a regra de cada documento (normalmente diretor + secretário).</li>
</ul>`,
      aprofundado: `<ul>
<li>Cada rede (municipal, estadual) tem sua <b>regulamentação</b> sobre escrituração escolar. <b>A CONFIRMAR NO EDITAL</b> quais normas locais serão cobradas.</li>
<li>Erros em registros de vida escolar prejudicam o aluno; por isso a regra é conferir antes de assinar.</li>
</ul>`
    },
    {
      id: 'documentos-escolares', titulo: 'Documentação escolar', provavel: true,
      busca: 'documentação escolar histórico escolar ata ficha de matrícula diário de classe boletim',
      contexto: `<p>São os documentos que comprovam a trajetória do aluno e a regularidade da escola.</p>`,
      basico: `<ul>
<li><b>Ficha/requerimento de matrícula:</b> registra dados do aluno e responsável.</li>
<li><b>Diário de classe:</b> registro do professor (frequência, conteúdos, avaliações).</li>
<li><b>Boletim:</b> informa notas/conceitos e frequência periodicamente.</li>
<li><b>Histórico escolar:</b> documento que registra a <u>vida escolar completa</u> do aluno (componentes, resultados, carga horária).</li>
<li><b>Ata:</b> registro resumido e fiel de reuniões e ocorrências, assinada pelos presentes (resultados finais, conselho de classe etc.).</li>
<li><b>Declaração de transferência:</b> permite ao aluno continuar os estudos em outra escola.</li>
</ul>`,
      aprofundado: `<ul>
<li>Rasuras: o correto é a ressalva ("digo...") conforme a regra da rede; nunca usar corretivo em documentos oficiais.</li>
<li>Prazos de guarda variam por documento; o histórico escolar costuma ter guarda permanente (A CONFIRMAR NO EDITAL/norma da rede).</li>
</ul>`
    },
    {
      id: 'arquivo-protocolo', titulo: 'Arquivo, protocolo e gestão de documentos', provavel: true,
      busca: 'arquivologia gestão de documentos protocolo arquivamento ciclo vital lei 8159',
      contexto: `<p>Escola e prefeitura produzem muito papel. Arquivo e protocolo garantem que cada documento seja <b>encontrado</b>, <b>preservado</b> e <b>tenha trâmite controlado</b>.</p>`,
      basico: `<ul>
<li><b>Três idades (Lei 8.159/1991, art. 8º):</b> corrente (uso frequente), intermediária (uso eventual, aguardando destinação) e permanente (valor histórico/probatório).</li>
<li><b>Métodos de arquivamento:</b> alfabético, numérico, cronológico, por assunto, geográfico.</li>
<li><b>Protocolo:</b> registra recebimento, tramitação e expedição de documentos, com número de controle.</li>
<li><b>Gestão de documentos:</b> conjunto de procedimentos de produção, tramitação, uso, avaliação e arquivamento.</li>
</ul>`,
      aprofundado: `<ul>
<li><b>Tabela de temporalidade:</b> define por quanto tempo cada tipo de documento deve ser guardado e sua destinação (eliminação ou guarda permanente).</li>
<li><b>Eliminação</b> de documentos exige autorização da instituição arquivística e registro em termo.</li>
</ul>`
    },
    {
      id: 'atendimento', titulo: 'Atendimento ao público', provavel: true,
      busca: 'atendimento ao público no serviço público técnicas qualidade resumo',
      contexto: `<p>A secretaria é a "porta de entrada" da escola. Bom atendimento é cobrado em conceito e em casos práticos.</p>`,
      basico: `<ul>
<li><b>Postura:</b> cordialidade, escuta ativa, clareza, paciência, imparcialidade (impessoalidade).</li>
<li><b>Atendimento a pessoa irritada:</b> manter a calma, ouvir sem interromper, mostrar empatia, explicar o procedimento e encaminhar.</li>
<li><b>Telefone:</b> identificar-se (setor e nome), falar com clareza, anotar recado completo, não deixar o interlocutor esperando sem aviso.</li>
<li><b>Sigilo:</b> não passar dados de alunos a terceiros sem autorização.</li>
</ul>`,
      aprofundado: `<ul>
<li>Atender igualmente todos (impessoalidade), com prioridade legal para idosos, gestantes, pessoas com deficiência etc.</li>
<li>Registrar solicitações para dar rastreabilidade (protocolo).</li>
</ul>`
    },
    {
      id: 'patrimonio-materiais', titulo: 'Planejamento, materiais e patrimônio escolar', provavel: true,
      busca: 'patrimônio público bens permanentes material de consumo tombamento inventário almoxarifado',
      contexto: `<p>Cuidar dos bens e materiais da escola é parte do trabalho administrativo. Em concursos aparecem os conceitos básicos.</p>`,
      basico: `<ul>
<li><b>Material de consumo:</b> some ou perde as características com o uso (papel, giz, tinta).</li>
<li><b>Bem permanente:</b> dura mais, tem vida útil longa (carteiras, computadores, armários).</li>
<li><b>Tombamento (registro patrimonial):</b> atribuição de número de identificação ao bem.</li>
<li><b>Almoxarifado:</b> guarda e controla materiais; controla entradas e saídas (requisição, estoque mínimo).</li>
<li><b>Inventário:</b> contagem periódica dos bens para conferir com os registros.</li>
</ul>`,
      aprofundado: `<ul>
<li>A baixa de bens (por perda, dano, obsolescência) segue procedimento formal e documentos. <b>A CONFIRMAR NO EDITAL</b> normas específicas.</li>
<li>Planejamento: prever demanda, definir prioridades e prazos de compra pela escola/secretaria.</li>
</ul>`
    },
    {
      id: 'informatica-gestao', titulo: 'Informática básica e sistemas de gestão escolar', provavel: true,
      busca: 'informática básica concursos Word Excel atalhos backup segurança LGPD resumo',
      contexto: `<p>A rotina da secretaria é digital: sistemas de matrícula e notas, planilhas, e-mail e documentos. Nível médio costuma exigir noções básicas.</p>`,
      basico: `<ul>
<li><b>Atalhos universais:</b> Ctrl+C copiar, Ctrl+X recortar, Ctrl+V colar, Ctrl+Z desfazer.</li>
<li><b>Planilha:</b> fórmulas começam com "="; exemplo: =SOMA(A1:A3).</li>
<li><b>Backup:</b> cópia de segurança dos dados em outro local.</li>
<li><b>Segurança:</b> senhas pessoais e intransferíveis; cuidado com e-mails suspeitos (phishing).</li>
<li><b>Sistemas de gestão escolar:</b> registram matrícula, notas, frequência e emitem relatórios; a segurança do acesso é essencial.</li>
<li><b>LGPD (Lei 13.709/2018):</b> dados pessoais de crianças e adolescentes exigem tratamento no seu melhor interesse (art. 14).</li>
</ul>`,
      aprofundado: `<ul>
<li>Extensões comuns: .docx (documento de texto), .xlsx (planilha), .pdf (documento portátil).</li>
<li>Fique atento: a versão do pacote de escritório citada no edital (Microsoft Office, LibreOffice) muda atalhos e nomes. <b>A CONFIRMAR NO EDITAL</b>.</li>
</ul>`
    }
  ]
});

var E = 'especificos';
Q(E, 'secretaria', 1, 'A principal função da secretaria escolar é:',
  ['Ministrar aulas de reforço', 'Registrar, organizar e conservar a documentação da vida escolar e funcional', 'Gerenciar o cardápio da merenda', 'Elaborar o currículo de cada disciplina', 'Escolher os livros didáticos'], 1,
  'A secretaria cuida da escrituração e dos documentos da escola.');
Q(E, 'secretaria', 1, 'O sigilo das informações pessoais de alunos, na rotina da secretaria, significa:',
  ['Divulgar notas em murais', 'Entregar dados a qualquer pessoa que os peça por telefone', 'Fornecer dados apenas a quem tem direito (aluno, responsável, autoridade competente)', 'Guardar os dados em local aberto', 'Não registrar os dados'], 2,
  'Dados pessoais só devem ser fornecidos a quem tem direito de acessá-los.');
Q(E, 'secretaria', 2, 'Ao perceber um erro em um documento já assinado e entregue ao responsável, o secretário deve:',
  ['Ignorar, pois já foi entregue', 'Corrigir com corretivo e reentregar', 'Comunicar à direção e corrigir/reemitir o documento conforme o procedimento da rede', 'Pedir ao aluno para corrigir', 'Destruir o documento e não informar ninguém'], 2,
  'A correção deve seguir procedimento formal, com ciência da direção, e sem uso de corretivo.');

Q(E, 'documentos-escolares', 1, 'O documento que registra a vida escolar completa do aluno (disciplinas, resultados e carga horária) é o:',
  ['Diário de classe', 'Histórico escolar', 'Boletim bimestral', 'Ata de reunião', 'Convite de formatura'], 1,
  'O histórico escolar sintetiza a trajetória do aluno e é o principal documento de transferência e comprovação.');
Q(E, 'documentos-escolares', 1, 'A ata é:',
  ['Lista de presença de alunos', 'Registro resumido e fiel de reuniões ou ocorrências, assinado pelos presentes', 'Documento de matrícula', 'Um tipo de requerimento', 'Aviso de reunião'], 1,
  'Ata registra, de forma resumida e fiel, o que ocorreu em uma reunião ou evento.');
Q(E, 'documentos-escolares', 1, 'O registro feito pelo professor, com frequência, conteúdo ministrado e avaliações, é o:',
  ['Histórico escolar', 'Diário de classe', 'Declaração de transferência', 'Ficha de matrícula', 'Ofício'], 1,
  'Diário de classe é o instrumento de registro do professor.');
Q(E, 'documentos-escolares', 2, 'Um aluno vai mudar de escola. O documento que permite a continuação dos estudos em outra escola é, em regra:',
  ['Declaração/documento de transferência acompanhado do histórico escolar', 'Apenas o boletim do último bimestre', 'Convite assinado pelo diretor', 'Cópia do diário de classe', 'Ata de reunião de pais'], 0,
  'A escola de origem fornece documentação de transferência e o histórico escolar (conferir as regras da rede).');

Q(E, 'arquivo-protocolo', 1, 'Segundo a teoria das três idades dos arquivos, os documentos de uso frequente integram o arquivo:',
  ['Permanente', 'Intermediário', 'Corrente', 'Morto', 'Histórico'], 2,
  'Corrente: uso frequente. Intermediário: uso eventual. Permanente: valor histórico/probatório.');
Q(E, 'arquivo-protocolo', 1, 'Arquivar documentos por data (do mais antigo ao mais recente) é um método:',
  ['Alfabético', 'Geográfico', 'Cronológico', 'Numérico', 'Por assunto'], 2,
  'O método cronológico organiza por data.');
Q(E, 'arquivo-protocolo', 1, 'O protocolo é o setor ou rotina responsável por:',
  ['Dar aulas', 'Registrar o recebimento, a tramitação e a expedição de documentos', 'Fazer compras de material', 'Elaborar o PPP', 'Contratar professores'], 1,
  'Protocolo registra a entrada, o trâmite e a saída de documentos, garantindo rastreabilidade.');
Q(E, 'arquivo-protocolo', 2, 'A tabela de temporalidade documental tem por finalidade:',
  ['Medir a temperatura do arquivo', 'Definir prazos de guarda e destinação (eliminação ou guarda permanente)', 'Listar funcionários', 'Fixar horários de atendimento', 'Controlar o ponto'], 1,
  'Tabela de temporalidade define quanto tempo cada documento deve ser guardado e qual a destinação final.');

Q(E, 'atendimento', 1, 'Diante de um responsável de aluno irritado, a melhor atitude do atendente é:',
  ['Responder no mesmo tom', 'Ignorar e continuar a trabalhar', 'Manter a calma, ouvir, mostrar empatia e explicar o procedimento', 'Encerrar o atendimento imediatamente', 'Chamar a polícia'], 2,
  'Escuta ativa e empatia diminuem o conflito e levam à solução.');
Q(E, 'atendimento', 1, 'Ao atender o telefone na secretaria, o correto é:',
  ['Atender sem se identificar', 'Identificar-se (setor e nome), falar com clareza e anotar o recado completo', 'Deixar o interlocutor em espera sem aviso', 'Desligar se o assunto não for com você', 'Falar apenas se for pessoa conhecida'], 1,
  'Identificação, clareza e recado completo são boas práticas.');

Q(E, 'patrimonio-materiais', 1, 'Entre os itens abaixo, é MATERIAL DE CONSUMO:',
  ['Computador', 'Carteira escolar', 'Armário de aço', 'Papel sulfite', 'Projetor multimídia'], 3,
  'Papel sulfite é consumido com o uso. Os demais são bens permanentes.');
Q(E, 'patrimonio-materiais', 1, 'O tombamento de um bem patrimonial consiste em:',
  ['Vender o bem', 'Registrar o bem e atribuir-lhe número de identificação patrimonial', 'Descartar bens quebrados', 'Doar bens a terceiros', 'Reformar o bem'], 1,
  'Tombamento = registro e numeração do bem permanente.');
Q(E, 'patrimonio-materiais', 2, 'O inventário patrimonial tem por objetivo:',
  ['Aumentar o estoque de material', 'Conferir periodicamente os bens existentes com os registros', 'Contratar fornecedores', 'Calcular a folha de pagamento', 'Elaborar o calendário'], 1,
  'Inventário é a contagem/conferência dos bens em relação aos registros.');

Q(E, 'informatica-gestao', 1, 'O atalho de teclado Ctrl+V serve para:',
  ['Copiar', 'Colar', 'Recortar', 'Desfazer', 'Salvar'], 1, 'Ctrl+C copia, Ctrl+X recorta, Ctrl+V cola, Ctrl+Z desfaz.');
Q(E, 'informatica-gestao', 1, 'Em uma planilha eletrônica, para somar os valores das células A1 a A3 usa-se:',
  ['SOMA(A1:A3)', '=SOMA(A1:A3)', '=A1,A2,A3 soma', 'A1+A3', '#SOMA(A1:A3)'], 1, 'Fórmulas começam com "=": =SOMA(A1:A3).');
Q(E, 'informatica-gestao', 2, 'Sobre tratamento de dados pessoais de crianças e adolescentes, a LGPD (Lei nº 13.709/2018) determina que:',
  ['Podem ser livremente vendidos', 'Devem ser tratados em seu melhor interesse', 'Não podem ser registrados', 'Só podem ser tratados por empresas privadas', 'Não exigem proteção'], 1,
  'Art. 14: o tratamento de dados pessoais de crianças e adolescentes deve ser realizado em seu melhor interesse.');
Q(E, 'informatica-gestao', 1, 'Uma boa prática de segurança no uso de sistemas escolares é:',
  ['Compartilhar a senha com colegas', 'Anotar a senha em post-it no monitor', 'Manter senha pessoal e sigilosa, sem compartilhar', 'Usar a mesma senha simples em tudo', 'Deixar o sistema aberto ao sair'], 2,
  'Senha é pessoal e intransferível.');
