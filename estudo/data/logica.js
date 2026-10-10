M({
  id: 'logica', nome: 'Raciocínio Lógico', cor: '#7c3aed', questoes: 10, peso: '20%',
  banca: 'Nível médio: foco em lógica proposicional, porcentagem, regra de três, conjuntos e sequências. Evite combinatória pesada.',
  topicos: [
    {
      id: 'proposicoes', titulo: 'Proposições, conectivos e tabela-verdade', provavel: true,
      busca: 'proposições lógicas conectivos tabela verdade resumo concursos',
      contexto: `<p>Lógica proposicional é a "gramática do raciocínio": ensina quando uma afirmação composta é verdadeira ou falsa. As provas cobram principalmente a <b>tabela-verdade</b> de E, OU, SE...ENTÃO.</p>`,
      basico: `<ul>
<li><b>Proposição:</b> frase declarativa que pode ser V ou F. Ordens, perguntas e exclamações <u>não</u> são proposições.</li>
<li><b>Conjunção (p ∧ q, "e"):</b> só é V se as duas forem V.</li>
<li><b>Disjunção (p ∨ q, "ou"):</b> só é F se as duas forem F.</li>
<li><b>Condicional (p → q, "se p então q"):</b> só é F quando p é V e q é F.</li>
<li><b>Bicondicional (p ↔ q):</b> V quando p e q têm o mesmo valor.</li>
<li><b>Disjunção exclusiva (ou...ou):</b> V quando os valores são diferentes.</li>
</ul>
<p><b>Macete do condicional:</b> a única promessa quebrada é "vim de V e deu F".</p>`,
      aprofundado: `<ul>
<li><b>Tautologia:</b> sempre V. <b>Contradição:</b> sempre F. <b>Contingência:</b> depende dos valores.</li>
<li>Para resolver, monte a tabela-verdade na ordem de precedência (negação, depois conjunção/disjunção, depois condicional e bicondicional).</li>
<li>Em questões "sabendo que a proposição composta é V/F, determine...", comece pelo conectivo que dá mais informação (ex.: conjunção V → todos V).</li>
</ul>`
    },
    {
      id: 'equivalencias', titulo: 'Negações e equivalências', provavel: true,
      busca: 'negação de proposições equivalências lógicas De Morgan resumo',
      contexto: `<p>Negar e reescrever frases com o mesmo significado é um dos temas mais cobrados em lógica de nível médio.</p>`,
      basico: `<ul>
<li><b>~(p ∧ q) = ~p ∨ ~q</b> e <b>~(p ∨ q) = ~p ∧ ~q</b> (Leis de De Morgan).</li>
<li><b>Negação de "p → q":</b> p ∧ ~q ("p e não q").</li>
<li><b>Equivalências de "p → q":</b> ~q → ~p (contrapositiva) e ~p ∨ q.</li>
<li><b>Todo A é B</b> → negação: <b>Algum A não é B</b>. <b>Algum A é B</b> → negação: <b>Nenhum A é B</b>.</li>
</ul>`,
      aprofundado: `<ul>
<li>A negação de "Todos estudam" <u>não</u> é "Ninguém estuda"; é "Pelo menos um não estuda".</li>
<li>"Se p então q" <u>não</u> é equivalente a "Se q então p" (recíproca) nem a "Se ~p então ~q" (inversa).</li>
<li>Tabela dos quantificadores: Todo/Nenhum/Algum/Algum não: aprenda a negação de cada um.</li>
</ul>`
    },
    {
      id: 'porcentagem', titulo: 'Porcentagem e regra de três', provavel: true,
      busca: 'porcentagem e regra de três simples e composta para concursos resumo',
      contexto: `<p>Matemática do cotidiano: descontos, aumentos, proporções em escolas e prefeituras (merenda, matrículas, orçamento).</p>`,
      basico: `<ul>
<li><b>x% de N</b> = (x/100) × N. Ex.: 20% de 450 = 0,20 × 450 = 90.</li>
<li><b>Aumento de x%:</b> multiplique por (1 + x/100). <b>Desconto de x%:</b> multiplique por (1 − x/100).</li>
<li><b>Regra de três direta:</b> se uma grandeza aumenta, a outra aumenta. Multiplica-se em "cruz".</li>
<li><b>Regra de três inversa:</b> se uma aumenta, a outra diminui (pedreiros × dias). Inverta uma das razões.</li>
</ul>`,
      aprofundado: `<ul>
<li><b>Aumentos/descontos sucessivos</b> NÃO se somam: dois descontos de 10% = 0,9 × 0,9 = 0,81 (desconto total de 19%).</li>
<li><b>Variação percentual</b> = (novo − antigo) / antigo × 100.</li>
<li><b>Regra de três composta:</b> compare cada grandeza com a incógnita (direta ou inversa) e multiplique as razões.</li>
</ul>`
    },
    {
      id: 'conjuntos', titulo: 'Conjuntos', provavel: true,
      busca: 'conjuntos diagrama de Venn união interseção problemas concursos',
      contexto: `<p>Questões típicas: "numa turma, X gostam de A, Y gostam de B...". Resolve-se com diagrama de Venn.</p>`,
      basico: `<ul>
<li><b>União (A ∪ B):</b> está em A ou em B (ou em ambos). <b>Interseção (A ∩ B):</b> está nos dois.</li>
<li><b>Fórmula:</b> n(A ∪ B) = n(A) + n(B) − n(A ∩ B).</li>
<li><b>Passo a passo:</b> comece <u>sempre</u> pela interseção, depois complete as partes só de A e só de B, por fim os que não estão em nenhum.</li>
</ul>`,
      aprofundado: `<ul>
<li>Com 3 conjuntos: n(A∪B∪C) = soma − pares + tripla.</li>
<li>Total = união + fora de todos. Use isso para achar a interseção quando faltar dado.</li>
</ul>`
    },
    {
      id: 'sequencias', titulo: 'Sequências, média e tabelas', provavel: true,
      busca: 'sequências lógicas progressão aritmética geométrica média aritmética concursos',
      contexto: `<p>Padrões numéricos, médias e leitura de tabelas aparecem em quase toda prova de nível médio.</p>`,
      basico: `<ul>
<li><b>Sequência:</b> descubra a regra pela diferença (soma) ou razão (multiplicação) entre termos.</li>
<li><b>PA:</b> a(n) = a1 + (n−1)·r. <b>PG:</b> a(n) = a1 · q^(n−1).</li>
<li><b>Média aritmética</b> = soma dos valores ÷ quantidade de valores.</li>
<li><b>Tabelas:</b> leia título, unidade e legenda; calcule porcentagens a partir do total da tabela.</li>
</ul>`,
      aprofundado: `<ul>
<li>Se a diferença não é constante, tente a diferença das diferenças (padrão de 2ª ordem) ou intercaladas (duas sequências misturadas).</li>
<li>Média ponderada = Σ(valor × peso) ÷ Σ(pesos).</li>
</ul>`
    }
  ]
});

var L = 'logica';
Q(L, 'proposicoes', 1, 'Assinale a sentença que é uma PROPOSIÇÃO lógica:',
  ['Feche a porta.', 'Que dia lindo!', '7 é maior que 10.', 'Quem é você?', 'Venha cedo amanhã.'], 2,
  'Proposição é sentença declarativa com valor V ou F. "7 é maior que 10" é falsa, mas é proposição.');
Q(L, 'proposicoes', 1, 'Se p é verdadeira e q é falsa, o valor lógico de p ∧ q é:',
  ['Verdadeiro', 'Falso', 'Depende de p', 'Indeterminado', 'Verdadeiro e falso'], 1,
  'A conjunção só é verdadeira quando as duas componentes são verdadeiras.');
Q(L, 'proposicoes', 1, 'Se p é verdadeira e q é falsa, o valor lógico de "se p então q" (p → q) é:',
  ['Verdadeiro', 'Falso', 'Indeterminado', 'Depende da negação de p', 'Verdadeiro se q for verdadeira'], 1,
  'O condicional só é falso quando o antecedente é V e o consequente é F.');
Q(L, 'proposicoes', 2, 'A proposição "Choveu ou a aula foi suspensa" é FALSA somente quando:',
  ['Choveu e a aula foi suspensa', 'Choveu e a aula não foi suspensa', 'Não choveu e a aula foi suspensa', 'Não choveu e a aula não foi suspensa', 'Nunca é falsa'], 3,
  'A disjunção "ou" só é falsa quando ambas as partes são falsas.');
Q(L, 'proposicoes', 2, 'Sabendo que "p ∨ q" é verdadeira e "p" é falsa, conclui-se que:',
  ['q é falsa', 'q é verdadeira', 'q pode ser V ou F', 'p ∧ q é verdadeira', '~q é verdadeira'], 1,
  'Se p é F e p ∨ q é V, então q precisa ser V.');

Q(L, 'equivalencias', 1, 'A negação da proposição "Todos os alunos estudam" é:',
  ['Nenhum aluno estuda.', 'Algum aluno não estuda.', 'Todos os alunos não estudam.', 'Algum aluno estuda.', 'Poucos alunos estudam.'], 1,
  'A negação de "Todo A é B" é "Algum A não é B".');
Q(L, 'equivalencias', 2, 'A negação de "Se estudo, então passo" é:',
  ['Se não estudo, então não passo.', 'Estudo e não passo.', 'Não estudo e passo.', 'Se passo, então estudo.', 'Não estudo ou passo.'], 1,
  '~(p → q) ≡ p ∧ ~q: "estudo e não passo".');
Q(L, 'equivalencias', 2, 'Uma proposição equivalente a "Se chove, então a aula é cancelada" é:',
  ['Se a aula é cancelada, então chove.', 'Se não chove, então a aula não é cancelada.', 'Se a aula não é cancelada, então não chove.', 'Chove e a aula é cancelada.', 'Não chove e a aula é cancelada.'], 2,
  'A contrapositiva (~q → ~p) é equivalente. As alternativas A e B são recíproca e inversa, que não são equivalentes.');
Q(L, 'equivalencias', 2, 'A negação de "O servidor é pontual E honesto" é:',
  ['O servidor não é pontual e não é honesto.', 'O servidor não é pontual ou não é honesto.', 'O servidor é pontual ou honesto.', 'O servidor é impontual e desonesto.', 'Se é pontual, então é honesto.'], 1,
  'De Morgan: ~(p ∧ q) = ~p ∨ ~q.');

Q(L, 'porcentagem', 1, '20% de 450 é igual a:',
  ['45', '60', '80', '90', '120'], 3, '0,20 × 450 = 90.');
Q(L, 'porcentagem', 1, 'Um material custa R$ 80,00 e sofre aumento de 15%. O novo preço é:',
  ['R$ 88,00', 'R$ 90,00', 'R$ 92,00', 'R$ 95,00', 'R$ 96,00'], 2, '80 × 1,15 = 92.');
Q(L, 'porcentagem', 2, 'Um produto de R$ 200,00 recebe dois descontos sucessivos de 10%. O preço final é:',
  ['R$ 160,00', 'R$ 162,00', 'R$ 164,00', 'R$ 170,00', 'R$ 180,00'], 1, '200 × 0,9 = 180; 180 × 0,9 = 162.');
Q(L, 'porcentagem', 1, 'Se 5 funcionários atendem 60 pessoas por dia, 8 funcionários, no mesmo ritmo, atenderão por dia:',
  ['84', '90', '96', '100', '120'], 2, 'Direta: 60 ÷ 5 = 12 por funcionário; 12 × 8 = 96.');
Q(L, 'porcentagem', 2, 'Quatro pedreiros constroem um muro em 12 dias. Seis pedreiros, trabalhando no mesmo ritmo, construirão o mesmo muro em:',
  ['6 dias', '8 dias', '9 dias', '16 dias', '18 dias'], 1, 'Regra de três inversa: 4 × 12 = 48 pedreiros-dia; 48 ÷ 6 = 8 dias.');

Q(L, 'conjuntos', 2, 'Em uma turma de 40 alunos, 25 gostam de Matemática, 20 gostam de Português e 5 não gostam de nenhuma das duas. Quantos gostam das duas?',
  ['5', '10', '15', '20', '25'], 1, 'Gostam de pelo menos uma: 40 − 5 = 35. Interseção = 25 + 20 − 35 = 10.');
Q(L, 'conjuntos', 1, 'Se n(A) = 30, n(B) = 22 e n(A ∩ B) = 12, então n(A ∪ B) é:',
  ['30', '40', '52', '64', '10'], 1, '30 + 22 − 12 = 40.');

Q(L, 'sequencias', 1, 'Na sequência 2, 5, 8, 11, ..., o próximo termo é:',
  ['12', '13', '14', '15', '16'], 2, 'Cada termo soma 3: 11 + 3 = 14.');
Q(L, 'sequencias', 2, 'Na sequência 3, 6, 12, 24, ..., o próximo termo é:',
  ['30', '36', '42', '48', '60'], 3, 'Cada termo é o dobro do anterior: 24 × 2 = 48.');
Q(L, 'sequencias', 2, 'Em uma PA com primeiro termo 2 e razão 3, o 10º termo é:',
  ['27', '28', '29', '30', '32'], 2, 'a10 = 2 + 9 × 3 = 29.');
Q(L, 'sequencias', 1, 'As notas de um aluno foram 6, 8, 7 e 9. A média aritmética é:',
  ['7,0', '7,5', '8,0', '7,8', '8,5'], 1, '(6 + 8 + 7 + 9) ÷ 4 = 30 ÷ 4 = 7,5.');
Q(L, 'sequencias', 2, 'Três escolas têm 120, 180 e 200 alunos. A escola com 180 alunos representa, do total, a porcentagem de:',
  ['30%', '32%', '36%', '40%', '45%'], 2, 'Total = 500. 180 ÷ 500 = 0,36 = 36%.');
