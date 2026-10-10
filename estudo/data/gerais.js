M({
  id: 'gerais', nome: 'Conhecimentos Gerais (RO e Porto Velho)', cor: '#be123c', questoes: 5, peso: '10%',
  banca: '5 questões. Foco provável: história, geografia e economia de Rondônia e Porto Velho, além de atualidades (A CONFIRMAR NO ANEXO IV).',
  topicos: [
    {
      id: 'historia-ro', titulo: 'História de Rondônia e Porto Velho', provavel: true,
      busca: 'história de Rondônia território federal do Guaporé ferrovia Madeira-Mamoré resumo',
      contexto: `<p>Entender como Rondônia surgiu explica sua economia, rodovias e cidades. Questões de nível médio cobram datas e fatos-chave.</p>`,
      basico: `<ul>
<li><b>Ciclo da borracha</b> e a <b>Estrada de Ferro Madeira-Mamoré</b> (ligava Porto Velho a Guajará-Mirim): construída no início do século XX para escoar borracha; associada ao <b>Tratado de Petrópolis (1903)</b>, que incorporou o Acre ao Brasil.</li>
<li><b>Território Federal do Guaporé (1943)</b>, renomeado <b>Rondônia (1956)</b> em homenagem ao Marechal Cândido Rondon.</li>
<li><b>Estado de Rondônia:</b> criado em 1981 (Lei Complementar nº 41, de 22/12/1981) e instalado em 4/1/1982.</li>
<li><b>Porto Velho:</b> fundada em 2 de outubro de 1914; capital do estado.</li>
</ul>`,
      aprofundado: `<ul>
<li>Migração a partir da década de 1970 (colonização, BR-364, projetos do INCRA) mudou a população e a economia.</li>
<li>Confirme datas em fontes oficiais (IBGE, prefeitura, governo do estado). <b>A CONFIRMAR NO EDITAL</b> qual bibliografia a banca indicar.</li>
</ul>`
    },
    {
      id: 'geografia-ro', titulo: 'Geografia de Rondônia e Porto Velho', provavel: true,
      busca: 'geografia de Rondônia rio Madeira limites municípios clima bioma resumo',
      contexto: `<p>Localização, rios, clima e vegetação ajudam a entender a vida local e questões ambientais.</p>`,
      basico: `<ul>
<li><b>Região:</b> Norte do Brasil. <b>Limites:</b> Amazonas (norte), Mato Grosso (leste), Acre (oeste) e Bolívia (sul/oeste). Não faz divisa com o Pará.</li>
<li><b>Capital:</b> Porto Velho, às margens do <b>rio Madeira</b>, o maior afluente da margem direita do Amazonas.</li>
<li><b>Bioma predominante:</b> Amazônia; clima equatorial/quente e úmido.</li>
<li><b>Divisão:</b> 52 municípios.</li>
<li><b>Rodovia principal:</b> BR-364, que liga Rondônia ao centro-sul do país (Mato Grosso) e ao Acre.</li>
</ul>`,
      aprofundado: `<ul>
<li>O rio Madeira nasce da junção dos rios Beni e Mamoré (o Guaporé é afluente do Mamoré), na fronteira com a Bolívia.</li>
<li>População e área mudam com o tempo; use IBGE (Censo 2022) como referência para números.</li>
</ul>`
    },
    {
      id: 'economia-ro', titulo: 'Economia de Rondônia', provavel: true,
      busca: 'economia de Rondônia agropecuária pecuária hidrelétricas Santo Antônio Jirau',
      contexto: `<p>A economia mistura agronegócio, energia e serviços. Aparece em questões sobre desenvolvimento e infraestrutura.</p>`,
      basico: `<ul>
<li><b>Agropecuária:</b> forte pecuária bovina; cultivos como soja, milho, café e cacau.</li>
<li><b>Energia:</b> hidrelétricas de <b>Santo Antônio</b> e <b>Jirau</b>, no rio Madeira, perto de Porto Velho.</li>
<li><b>Extrativismo e mineração</b> também têm história no estado.</li>
<li><b>Serviços e comércio</b> concentram-se na capital.</li>
</ul>`,
      aprofundado: `<ul>
<li>Debate ambiental: desmatamento, regularização fundiária e unidades de conservação.</li>
<li>Rankings e dados mudam todo ano: confirme em IBGE/SEBRAE-RO.</li>
</ul>`
    },
    {
      id: 'atualidades', titulo: 'Atualidades (como estudar)', provavel: true,
      busca: 'atualidades para concursos 2026 resumo semanal',
      contexto: `<p>Atualidades mudam toda semana, por isso este tópico <b>não tem texto fixo</b> no sistema: estude pelas notícias recentes, sempre ligando o fato ao seu contexto.</p>`,
      basico: `<ul>
<li>Leia o resumo semanal em um portal confiável (Agência Brasil, IBGE, G1/Folha/Estadão - escolha 1).</li>
<li>Anote 3 linhas por notícia: quem, o quê, por quê importa.</li>
<li>Foque em temas de Rondônia, educação, saúde, economia e meio ambiente.</li>
</ul>`,
      aprofundado: `<ul>
<li>Reserve 30 minutos por semana (sexta, "revisão e gerais" do cronograma).</li>
<li>Use as buscas (YouTube/Google) deste tópico com o ano atual para achar resumos recentes.</li>
</ul>`
    }
  ]
});

var K = 'gerais';
Q(K, 'historia-ro', 1, 'A capital do estado de Rondônia é:',
  ['Ji-Paraná', 'Ariquemes', 'Porto Velho', 'Vilhena', 'Cacoal'], 2, 'Porto Velho, fundada em 2 de outubro de 1914.');
Q(K, 'historia-ro', 1, 'O estado de Rondônia foi criado em:',
  ['1943', '1956', '1981', '1988', '1991'], 2, 'Criado pela Lei Complementar nº 41, de 22/12/1981 (instalado em 1982). Em 1943 surgiu o Território do Guaporé; em 1956, passou a se chamar Rondônia.');
Q(K, 'historia-ro', 2, 'O nome "Rondônia" homenageia:',
  ['Marechal Cândido Rondon', 'Dom Pedro II', 'Getúlio Vargas', 'Juscelino Kubitschek', 'Santos Dumont'], 0, 'O Território passou a se chamar Rondônia em 1956, em homenagem a Rondon.');
Q(K, 'historia-ro', 2, 'A Estrada de Ferro Madeira-Mamoré, construída no início do século XX, ligava:',
  ['Porto Velho a Guajará-Mirim', 'Cuiabá a Rio Branco', 'Manaus a Belém', 'Vilhena a Cacoal', 'Porto Velho a Ji-Paraná'], 0, 'A ferrovia ligava Porto Velho a Guajará-Mirim, contornando as cachoeiras do Madeira, para escoar a borracha.');
Q(K, 'geografia-ro', 1, 'Qual dos estados abaixo NÃO faz divisa com Rondônia?',
  ['Amazonas', 'Mato Grosso', 'Acre', 'Pará', 'Todos fazem divisa'], 3, 'Rondônia faz divisa com Amazonas, Mato Grosso, Acre e com a Bolívia, não com o Pará.');
Q(K, 'geografia-ro', 1, 'Porto Velho situa-se às margens do rio:',
  ['Amazonas', 'Madeira', 'Tocantins', 'Araguaia', 'São Francisco'], 1, 'O rio Madeira banha a capital e é afluente do Amazonas.');
Q(K, 'geografia-ro', 2, 'O bioma predominante em Rondônia é:',
  ['Caatinga', 'Pampa', 'Amazônia', 'Mata Atlântica', 'Pantanal'], 2, 'Rondônia está na Amazônia Legal, com predomínio do bioma Amazônia.');
Q(K, 'geografia-ro', 1, 'A rodovia federal que liga Rondônia ao centro-sul do país e é eixo de ocupação do estado é a:',
  ['BR-101', 'BR-116', 'BR-364', 'BR-040', 'BR-010'], 2, 'A BR-364 corta Rondônia e ligou o estado a Mato Grosso e ao centro-sul.');
Q(K, 'economia-ro', 1, 'As usinas hidrelétricas de Santo Antônio e Jirau estão localizadas no rio:',
  ['São Francisco', 'Madeira', 'Tietê', 'Paraná', 'Xingu'], 1, 'As duas usinas ficam no rio Madeira, perto de Porto Velho.');
Q(K, 'economia-ro', 2, 'Uma atividade econômica de destaque em Rondônia é:',
  ['Extração de petróleo em alto-mar', 'Pecuária bovina e agricultura', 'Produção de automóveis', 'Cultivo de uvas finas', 'Siderurgia pesada'], 1, 'Pecuária bovina e agricultura (soja, milho, café) estão entre as principais atividades.');
