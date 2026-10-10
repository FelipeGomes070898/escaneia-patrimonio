/* Comentários por alternativa - Raciocínio Lógico */
X('logica-proposicoes-1', [
  `"Feche a porta" é uma ordem. Ordens não são proposições porque não podem ser verdadeiras nem falsas.`,
  `"Que dia lindo!" é uma exclamação. Exclamações não são proposições.`,
  `Correta: é uma frase declarativa e tem valor lógico (falso, pois 7 não é maior que 10). Ser falsa não impede de ser proposição.`,
  `"Quem é você?" é uma pergunta. Perguntas não são proposições.`,
  `"Venha cedo amanhã" é uma ordem. Não é proposição.`
]);
X('logica-proposicoes-2', [
  `A conjunção ("e") só seria verdadeira se p e q fossem as duas verdadeiras. Como q é falsa, o resultado não é verdadeiro.`,
  `Correta: com q falsa, p ∧ q é falsa (basta uma componente falsa).`,
  `Não depende: o valor de p já é dado (verdadeiro). Quem decide o resultado é o q, que é falso.`,
  `Não é indeterminado: p e q têm valores conhecidos, então o resultado é determinado.`,
  `Uma proposição não pode ser verdadeira e falsa ao mesmo tempo.`
]);
X('logica-proposicoes-3', [
  `O condicional só é verdadeiro se não houver "V → F". Aqui o antecedente é V e o consequente é F: é exatamente o caso que o torna falso.`,
  `Correta: p → q só é falso quando p é verdadeira e q é falsa, que é o caso do enunciado.`,
  `Não é indeterminado: p e q têm valores conhecidos.`,
  `A negação de p não entra no cálculo; p é verdadeira e q falsa já bastam para o resultado.`,
  `Nesta questão q é falsa, então essa condição não ocorre. Além disso, o valor não depende de q ser verdadeira.`
]);
X('logica-proposicoes-4', [
  `Se choveu e a aula foi suspensa, as duas partes são verdadeiras e o "ou" é verdadeiro.`,
  `Choveu é verdadeiro, e basta uma parte verdadeira para o "ou" ser verdadeiro.`,
  `A aula foi suspensa é verdadeiro, e basta uma parte verdadeira para o "ou" ser verdadeiro.`,
  `Correta: o "ou" só é falso quando as duas partes são falsas (não choveu e a aula não foi suspensa).`,
  `A disjunção é falsa em um caso: quando ambas as partes são falsas.`
]);
X('logica-proposicoes-5', [
  `Se q fosse falsa, "p ∨ q" seria falsa (p também é falsa). Mas o enunciado diz que é verdadeira.`,
  `Correta: um "ou" verdadeiro com p falsa exige q verdadeira.`,
  `Não pode ser V ou F: só q verdadeira torna "p ∨ q" verdadeira, já que p é falsa.`,
  `p ∧ q é falsa, porque p é falsa (basta uma parte falsa na conjunção).`,
  `Se q é verdadeira, ~q (a negação de q) é falsa.`
]);
X('logica-equivalencias-1', [
  `"Nenhum aluno estuda" é forte demais: negar "todos" não exige que ninguém estude, basta que um não estude.`,
  `Correta: a negação de "Todos" é "Algum não" (pelo menos um não estuda).`,
  `Parece negação, mas "todos não estudam" significa "ninguém estuda", que é exagerado.`,
  `"Algum aluno estuda" pode ser verdade mesmo se todos estudarem, então não nega o enunciado original.`,
  `"Poucos" não é um quantificador lógico, e não há como negar "todos" assim.`
]);
X('logica-equivalencias-2', [
  `É a inversa (~p → ~q), não a negação. Uma condicional e sua inversa não são contrárias.`,
  `Correta: a negação de "p → q" é "p ∧ ~q": estudo e não passo.`,
  `Troca os valores (~p ∧ q): não é a negação.`,
  `É a recíproca (q → p). Não é negação nem equivalente.`,
  `"~p ∨ q" é equivalente à própria condicional "se p então q", não à sua negação.`
]);
X('logica-equivalencias-3', [
  `É a recíproca (q → p): inverte o sentido. Não é equivalente.`,
  `É a inversa (~p → ~q): nega as duas partes sem trocar a ordem. Não é equivalente.`,
  `Correta: é a contrapositiva (~q → ~p), sempre equivalente à condicional original.`,
  `Isso é uma conjunção ("chove e a aula é cancelada"), que afirma as duas coisas. A condicional não afirma que chove.`,
  `Não chove e a aula é cancelada é um caso que a condicional original permite (não diz nada se não chover), mas não é equivalente a ela.`
]);
X('logica-equivalencias-4', [
  `Isso é a negação de "ou" (~p ∧ ~q), não de "e". Pela lei de De Morgan, a negação de "e" vira "ou".`,
  `Correta: De Morgan, ~(p ∧ q) = ~p ∨ ~q. Basta que uma das qualidades falte.`,
  `Isso afirma "pontual ou honesto", que não nega nada: pode ser verdadeiro mesmo quando o original é verdadeiro.`,
  `É a negação de "ou" (impontual e desonesto): exige as duas falhas, que é forte demais.`,
  `Troca "e" por uma condicional, o que muda o sentido: não é a negação.`
]);
X('logica-porcentagem-1', [
  `45 é 10% de 450. Para 20%, é preciso dobrar esse valor.`,
  `60 não vem de 20% de 450 (seria 20% de 300).`,
  `80 não vem de 20% de 450 (seria aproximadamente 20% de 400).`,
  `Correta: 0,20 × 450 = 90. (10% de 450 é 45, e 20% é o dobro.)`,
  `120 seria 20% de 600, e não de 450.`
]);
X('logica-porcentagem-2', [
  `88 equivale a um aumento de 10% (80 + 8). O enunciado fala em 15%.`,
  `90 equivale a um aumento de R$ 10,00 (12,5%), não de 15%.`,
  `Correta: 15% de 80 = 12, e 80 + 12 = 92 (ou 80 × 1,15).`,
  `95 seria somar R$ 15,00, confundindo 15% com 15 reais.`,
  `96 equivale a um aumento de 20%, não de 15%.`
]);
X('logica-porcentagem-3', [
  `160 seria um desconto de 20% (somando 10% + 10%). Descontos sucessivos não se somam: o segundo incide sobre o novo preço.`,
  `Correta: 200 × 0,9 = 180 e 180 × 0,9 = 162 (desconto total de 19%).`,
  `164 corresponde a um desconto total de 18%, que não é o resultado de dois descontos de 10%.`,
  `170 seria desconto de 15%, que não corresponde a nenhum dos cálculos.`,
  `180 é o preço depois de só um desconto de 10%. Falta aplicar o segundo.`
]);
X('logica-porcentagem-4', [
  `84 equivale a 7 funcionários (12 por funcionário × 7), não a 8.`,
  `90 equivale a 7,5 funcionários. Com 8 funcionários, cada um atende 12 pessoas.`,
  `Correta: 60 ÷ 5 = 12 atendimentos por funcionário; 12 × 8 = 96 (regra de três direta).`,
  `100 seria uma aproximação (60 × 1,67); a conta exata dá 96.`,
  `120 dobraria o número de atendimentos, mas o número de funcionários não dobrou (de 5 para 8).`
]);
X('logica-porcentagem-5', [
  `6 dias seria o tempo se o número de pedreiros dobrasse (de 4 para 8), mas passou só para 6.`,
  `Correta: regra de três inversa. 4 × 12 = 48 pedreiros-dia; 48 ÷ 6 = 8 dias.`,
  `9 dias não resulta da proporção inversa (seria o caso de 5,33 pedreiros).`,
  `16 dias aumenta o tempo, o que contraria a lógica: mais pedreiros, menos dias.`,
  `18 dias é 12 × 6/4: regra de três direta aplicada por engano. Mais pedreiros não pode levar a mais dias.`
]);
X('logica-conjuntos-1', [
  `5 é o número dos que não gostam de nenhuma. Não é a interseção.`,
  `Correta: gostam de pelo menos uma: 40 − 5 = 35. Interseção: 25 + 20 − 35 = 10.`,
  `15 não resulta da fórmula (seria 40 − 25).`,
  `20 é só o total dos que gostam de Português; ele inclui os que gostam das duas.`,
  `25 é só o total dos que gostam de Matemática; ele inclui os que gostam das duas.`
]);
X('logica-conjuntos-2', [
  `30 é só n(A). Falta somar o que está só em B.`,
  `Correta: n(A ∪ B) = 30 + 22 − 12 = 40.`,
  `52 é 30 + 22, sem descontar a interseção. Os 12 elementos comuns foram contados duas vezes.`,
  `64 é 52 + 12: somou a interseção em vez de subtraí-la.`,
  `10 não vem da fórmula da união; seria o resultado de 22 − 12, que é só os elementos exclusivos de B.`
]);
X('logica-sequencias-1', [
  `12 seria somar só 1 ao último termo; a sequência soma 3 a cada passo.`,
  `13 seria somar 2; a sequência soma 3.`,
  `Correta: a razão é 3 (2, 5, 8, 11), então o próximo é 11 + 3 = 14.`,
  `15 seria somar 4; a sequência soma 3.`,
  `16 seria somar 5; a sequência soma 3.`
]);
X('logica-sequencias-2', [
  `30 seria somar 6, mas essa sequência é multiplicativa (×2), não aditiva.`,
  `36 seria somar 12 (a diferença anterior), mas aqui cada termo é o dobro do anterior, e não uma soma constante.`,
  `42 não segue o padrão: os termos dobram (3, 6, 12, 24).`,
  `Correta: cada termo é o dobro do anterior, então 24 × 2 = 48.`,
  `60 seria 24 × 2,5, mas a razão é 2.`
]);
X('logica-sequencias-3', [
  `27 não é termo dessa PA (os termos são 2, 5, 8, ..., 26, 29, ...).`,
  `28 não é termo dessa PA (diferem de 3 em 3 a partir do 2).`,
  `Correta: a10 = a1 + 9r = 2 + 9 × 3 = 29.`,
  `30 viria de 10 × 3, esquecendo o primeiro termo (2). A fórmula é a1 + (n − 1)·r.`,
  `32 é o 11º termo da PA (2 + 10 × 3): usou n em vez de n − 1.`
]);
X('logica-sequencias-4', [
  `7,0 seria a média só de 6, 8 e 7. Faltou incluir o 9.`,
  `Correta: (6 + 8 + 7 + 9) ÷ 4 = 30 ÷ 4 = 7,5.`,
  `8,0 seria a média só de 8, 7 e 9. Faltou incluir o 6.`,
  `7,8 não resulta da soma dividida por 4 (30 ÷ 4 = 7,5).`,
  `8,5 é a média só de 8 e 9, ignorando as notas menores.`
]);
X('logica-sequencias-5', [
  `30% seriam 150 alunos de 500. A escola tem 180.`,
  `32% seriam 160 alunos de 500. A escola tem 180.`,
  `Correta: total = 120 + 180 + 200 = 500; 180 ÷ 500 = 0,36 = 36%.`,
  `40% seriam 200 alunos: é a escola de 200, não a de 180.`,
  `45% seriam 225 alunos de 500, mais que qualquer escola.`
]);
