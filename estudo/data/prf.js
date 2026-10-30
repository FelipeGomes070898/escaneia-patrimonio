/* Trilha PRF e agentes de trânsito: Código de Trânsito Brasileiro (Lei nº 9.503/1997).
   Conteúdo PROVÁVEL (não saiu edital da PRF): A CONFIRMAR NO EDITAL. Aparece só para quem tem a trilha 'transito'. */
M({
  id: 'prf-transito', nome: 'Legislação de Trânsito (CTB)', cor: '#ca8a04', questoes: 15, peso: 'estimado',
  banca: 'Prova provável de PRF e agente de trânsito: infrações, penalidades, crimes de trânsito, circulação e habilitação. A CONFIRMAR NO EDITAL.',
  topicos: [
    PFT('infracoes', 'Infrações, penalidades e pontuação do CTB', 'CTB lei 9503 infrações gravíssima grave média leve pontos penalidades art 256 suspensão resumo concursos',
      'A PRF fiscaliza o trânsito nas rodovias federais. O CTB é cobrado quase sempre com números: pontos, prazos e penalidades.',
      ['<b>Classes das infrações e pontos:</b> gravíssima (7 pontos), grave (5), média (4) e leve (3).',
       '<b>Penalidades (art. 256):</b> advertência por escrito, multa, suspensão do direito de dirigir, apreensão do veículo, cassação da CNH, cassação da Permissão para Dirigir e frequência obrigatória em curso de reciclagem.',
       '<b>Suspensão por pontos (art. 261, redação da Lei nº 14.071/2020), no período de 12 meses:</b> 20 pontos se houver duas ou mais infrações gravíssimas; 30 pontos se houver uma gravíssima; 40 pontos se não houver nenhuma gravíssima.',
       '<b>Embriaguez ao volante (art. 165):</b> infração gravíssima, com multa multiplicada por dez e suspensão do direito de dirigir por 12 meses; além disso, pode configurar crime (art. 306).',
       '<b>Recusa ao teste do bafômetro</b> (art. 165-A) é infração gravíssima com as mesmas penalidades, mas não é crime por si só.'],
      ['<b>Cassação da CNH:</b> ocorre, por exemplo, quando o condutor suspenso continua dirigindo ou reincide em embriaguez em 12 meses, entre outras hipóteses do art. 263.',
       'A <b>Permissão para Dirigir</b> vale por 1 ano; ao fim, se o condutor não cometeu infração grave ou gravíssima nem foi reincidente em média, recebe a CNH definitiva.',
       'A <b>multa de trânsito</b> é penalidade pecuniária; a <b>pontuação</b> vai para o prontuário do condutor.',
       'O valor das multas é fixado em lei e atualizado: confira o valor vigente em vez de decorar.']),
    PFT('crimes-transito', 'Crimes de trânsito (arts. 302 a 312)', 'crimes de trânsito CTB art 302 homicídio culposo 303 lesão 304 omissão de socorro 305 fuga 306 embriaguez 308 racha resumo',
      'Os crimes de trânsito ficam no próprio CTB. O policial rodoviário atende essas ocorrências todos os dias.',
      ['<b>Homicídio culposo na direção (art. 302):</b> detenção de 2 a 4 anos e suspensão ou proibição de obter permissão ou habilitação. Se o condutor estiver sob influência de álcool ou droga (§ 3º), reclusão de 5 a 8 anos.',
       '<b>Lesão corporal culposa (art. 303):</b> detenção de 6 meses a 2 anos e suspensão ou proibição de obter permissão ou habilitação.',
       '<b>Omissão de socorro (art. 304):</b> detenção de 6 meses a 1 ano ou multa, se não for crime mais grave.',
       '<b>Fuga do local do acidente (art. 305):</b> detenção de 6 meses a 1 ano ou multa.',
       '<b>Embriaguez ao volante (art. 306):</b> conduzir com capacidade psicomotora alterada por álcool ou outra substância; detenção de 6 meses a 3 anos, multa e suspensão ou proibição de obter permissão ou habilitação. A concentração mínima é de <b>6 decigramas de álcool por litro de sangue ou 0,3 mg por litro de ar expelido</b> (§ 1º, I).'],
      ['<b>Racha (art. 308):</b> participar, em via pública, de corrida, disputa ou competição não autorizada, gerando perigo de dano. Detenção de 6 meses a 3 anos, multa e suspensão ou proibição de obter permissão ou habilitação.',
       'A <b>prova da embriaguez</b> pode ser feita por teste de alcoolemia, exame clínico, perícia, vídeo ou prova testemunhal (art. 306, § 2º).',
       'A recusa em soprar o bafômetro não prova o crime por si só, mas gera a infração administrativa.',
       'O condutor não é obrigado a produzir prova contra si mesmo (princípio constitucional), o que explica as diferenças entre crime e infração.']),
    PFT('circulacao', 'Circulação, velocidades, habilitação e sinalização', 'CTB velocidade máxima art 61 categorias CNH A B C D E sinalização placas regulamentação advertência resumo',
      'Regras do dia a dia do trânsito: quem pode dirigir o quê, em que velocidade e o que significa cada sinal.',
      ['<b>Velocidade em via sem sinalização (art. 61).</b> Vias urbanas: trânsito rápido 80 km/h; arterial 60 km/h; coletora 40 km/h; local 30 km/h. Vias rurais: nas rodovias, 110 km/h para automóveis, camionetas e motocicletas, 90 km/h para ônibus e microônibus e 80 km/h para os demais; nas estradas, 60 km/h.',
       '<b>Categorias de habilitação:</b> A (veículos de 2 ou 3 rodas); B (veículo motorizado, exceto os de 2 ou 3 rodas, com peso bruto total de até 3.500 kg e lotação de até 8 passageiros, fora o condutor); C (peso bruto total acima de 3.500 kg); D (lotação acima de 8 passageiros, fora o condutor); E (combinação de veículos com unidade acoplada acima de 6.000 kg).',
       '<b>Sinalização:</b> placas de <b>regulamentação</b> (obrigam ou proíbem; geralmente vermelhas e circulares), de <b>advertência</b> (alertam sobre perigo; amarelas e em losango) e de <b>indicação</b> (orientam; várias cores).',
       '<b>Sinalização horizontal:</b> linha contínua amarela proíbe ultrapassagem; seccionada permite, quando seguro.',
       '<b>Veículos de emergência</b> (viaturas, ambulâncias) com sirene e luzes têm prioridade, mas devem respeitar a segurança.'],
      ['<b>Cinto de segurança</b> é obrigatório para condutor e passageiros (art. 167); não usar é infração grave.',
       '<b>Crianças com menos de 10 anos</b> devem ser transportadas no banco traseiro, em dispositivo de retenção adequado (art. 64).',
       '<b>Telefone celular:</b> dirigir segurando ou utilizando o celular é infração gravíssima.',
       'O <b>CRLV</b> (documento do veículo) e a <b>CNH</b> (documento do condutor) devem ser portados ou apresentados em meio digital, conforme a regra vigente.'])
  ]
});
CONC.materias.filter(function (m) { return m.id === 'prf-transito'; })[0].topicos.forEach(function (t) { t.so = ['transito']; });
