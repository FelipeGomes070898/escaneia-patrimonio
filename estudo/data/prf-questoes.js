/* Questões originais de Legislação de Trânsito (CTB) para a trilha PRF e agentes de trânsito. Usa QX (extra.js). */
QX('prf-transito', 'infracoes', 1, 'Pelo CTB, uma infração gravíssima vale, na pontuação da CNH:',
  ['3 pontos', '4 pontos', '5 pontos', '6 pontos', '7 pontos'], 4,
  'Gravíssima 7, grave 5, média 4 e leve 3 pontos.',
  ['É a pontuação da infração leve.', 'É a pontuação da infração média.', 'É a pontuação da infração grave.', 'Não existe essa pontuação no CTB.', 'Correta: gravíssima vale 7 pontos.']);
QX('prf-transito', 'infracoes', 2, 'Segundo a redação atual do art. 261 do CTB, o condutor tem o direito de dirigir suspenso, no período de 12 meses, ao atingir 20 pontos quando houver:',
  ['nenhuma infração gravíssima', 'uma infração gravíssima', 'duas ou mais infrações gravíssimas', 'apenas infrações leves', 'qualquer infração média'], 2,
  'Lei nº 14.071/2020: 20 pontos com duas ou mais gravíssimas; 30 com uma; 40 sem nenhuma gravíssima.',
  ['Sem gravíssimas, o limite é de 40 pontos.', 'Com uma gravíssima, o limite é de 30 pontos.', 'Correta: o limite de 20 pontos vale com duas ou mais gravíssimas.', 'Sem gravíssimas, o limite é de 40 pontos.', 'Sem gravíssimas, o limite é de 40 pontos.']);
QX('prf-transito', 'infracoes', 2, 'A recusa do condutor a se submeter ao teste de alcoolemia (bafômetro) configura:',
  ['crime de embriaguez ao volante', 'infração administrativa gravíssima, com as mesmas penalidades da embriaguez', 'nenhuma consequência', 'apenas advertência por escrito', 'infração leve'], 1,
  'Art. 165-A: infração gravíssima; a recusa, por si só, não é crime.',
  ['O crime do art. 306 exige comprovação da alteração da capacidade psicomotora.', 'Correta: art. 165-A.', 'Há consequência administrativa.', 'A penalidade é mais grave que advertência.', 'A infração é gravíssima.']);
QX('prf-transito', 'crimes-transito', 1, 'O crime de omissão de socorro no trânsito (art. 304 do CTB) é punido com:',
  ['reclusão de 5 a 8 anos', 'detenção de 6 meses a 1 ano ou multa', 'apenas multa administrativa', 'prisão simples', 'detenção de 2 a 4 anos'], 1,
  'Art. 304: detenção de 6 meses a 1 ano ou multa, se não for crime mais grave.',
  ['É a pena do homicídio culposo sob influência de álcool.', 'Correta.', 'É crime e tem pena de detenção.', 'Não é contravenção.', 'É a pena do homicídio culposo simples (art. 302).']);
QX('prf-transito', 'crimes-transito', 2, 'Para o crime de embriaguez ao volante (art. 306), a concentração mínima de álcool que o configura é de:',
  ['2 decigramas por litro de sangue', '4 decigramas por litro de sangue', '6 decigramas por litro de sangue ou 0,3 mg por litro de ar expelido', '10 decigramas por litro de sangue', 'qualquer quantidade'], 2,
  'Art. 306, § 1º, I.',
  ['Valor abaixo do previsto.', 'Valor abaixo do previsto.', 'Correta.', 'Valor acima do previsto.', 'A lei fixa limite.']);
QX('prf-transito', 'crimes-transito', 2, 'O homicídio culposo na direção (art. 302 do CTB) é punido, em regra, com:',
  ['detenção de 2 a 4 anos e suspensão ou proibição de obter permissão ou habilitação', 'multa apenas', 'reclusão de 12 a 30 anos', 'detenção de 1 a 6 meses', 'prisão simples de 15 dias'], 0,
  'Art. 302, caput.',
  ['Correta.', 'Há pena privativa de liberdade.', 'É a faixa de crimes dolosos mais graves.', 'Pena menor que a prevista.', 'Não é contravenção.']);
QX('prf-transito', 'circulacao', 1, 'Na ausência de sinalização, a velocidade máxima em via urbana de trânsito rápido é de:',
  ['30 km/h', '40 km/h', '60 km/h', '80 km/h', '110 km/h'], 3,
  'Art. 61: trânsito rápido 80, arterial 60, coletora 40, local 30.',
  ['É o limite de via local.', 'É o limite de via coletora.', 'É o limite de via arterial.', 'Correta.', 'É o limite de automóveis em rodovias.']);
QX('prf-transito', 'circulacao', 2, 'A categoria de habilitação que autoriza conduzir motocicleta é a:',
  ['A', 'B', 'C', 'D', 'E'], 0,
  'Categoria A: veículos motorizados de duas ou três rodas.',
  ['Correta.', 'Categoria B exclui veículos de duas ou três rodas.', 'Categoria C é para veículos de carga acima de 3.500 kg.', 'Categoria D é para transporte de mais de 8 passageiros.', 'Categoria E é para combinações com unidade acoplada acima de 6.000 kg.']);
QX('prf-transito', 'circulacao', 2, 'As placas de regulamentação, que impõem obrigações ou proibições, têm, em geral, forma:',
  ['losangular e amarela', 'circular e com borda vermelha', 'retangular e verde', 'triangular e azul', 'octogonal e branca'], 1,
  'Regulamentação: em geral circulares com bordas vermelhas (a placa PARE é exceção octogonal).',
  ['Isso descreve placas de advertência.', 'Correta, em geral.', 'Isso descreve placas de indicação.', 'Não corresponde ao padrão.', 'O octógono é característico apenas da placa PARE.']);
