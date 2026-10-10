/* Tópicos exclusivos do nível superior */
(function () {
  function add(mid, t) { t.nv = ['superior']; CONC.materias.filter(function (m) { return m.id === mid; })[0].topicos.push(t); }

  add('portugues', {
    id: 'redacao-discursiva', titulo: 'Redação discursiva (nível superior)', provavel: true,
    busca: 'como fazer prova discursiva concurso dissertação 30 linhas estrutura',
    contexto: `<p>Cargos de nível superior costumam ter uma questão discursiva (a SEMUSA prevê uma de até 30 linhas, segundo o levantamento de 10/10/2026). <b>Critérios de correção, nota mínima e tema: A CONFIRMAR NO EDITAL</b> do seu cargo.</p>`,
    basico: `<ul>
<li><b>Planeje 5 minutos:</b> entenda o comando, liste 3 ideias e a ordem delas.</li>
<li><b>Estrutura:</b> introdução (tese em 2 a 3 linhas), desenvolvimento (2 parágrafos com argumento + exemplo), conclusão (retoma a tese).</li>
<li><b>Linguagem:</b> norma-padrão, impessoal, sem gírias nem abreviações.</li>
<li><b>Respeite o limite de linhas</b> e escreva legível, a caneta indicada no edital.</li>
<li><b>Responda ao que foi pedido:</b> fuga ao tema costuma zerar a nota.</li>
</ul>`,
    aprofundado: `<ul>
<li>Use conectivos para encadear (além disso, portanto, entretanto). Revise concordância, crase e pontuação nos 5 minutos finais.</li>
<li>Treine com tempo: 1 texto por semana a partir da Volta 2, e peça a alguém para corrigir pelos critérios do edital.</li>
</ul>`
  });
  Q('portugues', 'redacao-discursiva', 1, 'Em uma redação discursiva com limite de 30 linhas, o procedimento mais adequado é:',
    ['Escrever até acabar o tempo, sem planejar', 'Planejar brevemente, estruturar em introdução, desenvolvimento e conclusão e respeitar o limite de linhas', 'Escrever só a introdução, para economizar tempo', 'Usar gírias para ser original', 'Ignorar o comando e escrever sobre o tema que domina'], 1,
    'Planejamento curto, estrutura clara, adequação ao comando e respeito ao limite de linhas são requisitos básicos.');
  Q('portugues', 'redacao-discursiva', 2, 'A fuga ao tema em uma prova discursiva consiste em:',
    ['Usar muitos conectivos', 'Não responder ao que foi solicitado no comando da questão', 'Escrever com letra pequena', 'Usar linguagem formal', 'Fazer rascunho antes'], 1,
    'Fuga ao tema é não atender ao comando; costuma levar à nota zero.');

  add('especificos', {
    id: 'cargo-superior', titulo: 'Específicos do seu cargo (nível superior)', provavel: true,
    busca: 'conteúdo programático conhecimentos específicos concurso Porto Velho 2026 nível superior',
    contexto: `<p>No nível superior os Específicos <b>dependem do cargo</b> (professor, analista, enfermeiro, contador etc.) e podem valer mais da prova. Não dá para montar um conteúdo único sem o seu Anexo IV, então este tópico mostra como organizar.</p><p class="aviso"><b>A CONFIRMAR NO EDITAL:</b> cargo, conteúdo e peso. Envie o Anexo IV do seu cargo para que a trilha seja ajustada.</p>`,
    basico: `<ul>
<li><b>Passo 1:</b> abra o Anexo IV do edital e copie os itens do seu cargo.</li>
<li><b>Passo 2:</b> transforme cada item em um tópico de 1 hora (contexto, resumo, teste).</li>
<li><b>Passo 3:</b> use as buscas de YouTube e Google (PDFs) abaixo e adicione seus links.</li>
<li><b>Passo 4:</b> como são muitas questões de Específicos, reserve a maior parte do tempo de estudo a elas; a ordem de desempate do edital costuma priorizar essa disciplina.</li>
</ul>`,
    aprofundado: `<ul>
<li>Priorize os itens que se repetem em provas anteriores da mesma banca para o mesmo cargo (IBGP). Use provas oficiais apenas para ver o estilo, sem copiar questões para o sistema.</li>
<li>Os conhecimentos Gerais e Legislação são comuns a vários cargos: eles garantem pontos mais rápidos.</li>
</ul>`
  });
})();
