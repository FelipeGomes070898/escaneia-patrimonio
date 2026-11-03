/* Cartões de memorização (revisão relâmpago): frente = pergunta, verso = resposta curta.
   Cd(matéria, tópico, pergunta, resposta). Só aparecem os cartões dos tópicos da trilha do concurso escolhido. */
CONC.cards = [];
var __cc = {};
function Cd(m, t, f, v) { var k = m + '-' + t; __cc[k] = (__cc[k] || 0) + 1; CONC.cards.push({ id: 'c-' + k + '-' + __cc[k], m: m, t: t, f: f, v: v }); }

/* Legislação: LC 385/2010 (confirmada no Anexo IV da SEMED) */
Cd('legislacao', 'lc385-provimento', 'LC 385/2010: prazo da posse?', '30 dias da publicação do ato de provimento, prorrogáveis por mais 30 a requerimento (art. 12).');
Cd('legislacao', 'lc385-provimento', 'LC 385/2010: prazo para entrar em exercício após a posse?', '15 dias; se não entrar, é exonerado (art. 16).');
Cd('legislacao', 'lc385-provimento', 'LC 385/2010: duração do estágio probatório e fatores avaliados?', '3 anos: assiduidade, disciplina, capacidade de iniciativa, produtividade e responsabilidade (art. 23).');
Cd('legislacao', 'lc385-provimento', 'LC 385/2010: quando se adquire a estabilidade?', 'Após 3 anos de efetivo exercício, com avaliação especial de desempenho (art. 25).');
Cd('legislacao', 'lc385-provimento', 'LC 385/2010: percentual de vagas reservado a pessoas com deficiência?', '10% das vagas do cargo (art. 5º).');
Cd('legislacao', 'lc385-provimento', 'LC 385/2010: interstício da progressão funcional e da promoção?', '2 anos, com avaliação de desempenho (art. 34).');
Cd('legislacao', 'lc385-provimento', 'LC 385/2010: jornada máxima?', '40 horas semanais, de 6 a 8 horas por dia (art. 21).');
Cd('legislacao', 'lc385-direitos', 'LC 385/2010: férias anuais e adicional?', '30 dias por ano (acumuláveis até 2 períodos); adicional de 1/3 pago no mês anterior ao gozo (arts. 89 e 90).');
Cd('legislacao', 'lc385-direitos', 'LC 385/2010: conversão de férias em dinheiro?', 'Até 1/3, com pedido feito com 60 dias de antecedência (art. 90, § 4º). Conversão integral é vedada.');
Cd('legislacao', 'lc385-direitos', 'LC 385/2010: reposição ao erário, parcela máxima?', '10% do vencimento básico por mês (art. 47).');
Cd('legislacao', 'lc385-direitos', 'LC 385/2010: licença por doença em pessoa da família (a cada 12 meses)?', 'Até 60 dias com remuneração e até 90 dias sem remuneração (art. 96).');
Cd('legislacao', 'lc385-disciplinar', 'LC 385/2010: penalidades disciplinares?', 'Repreensão, suspensão, demissão, cassação de aposentadoria ou disponibilidade e destituição de cargo em comissão ou função de confiança (art. 152).');
Cd('legislacao', 'lc385-disciplinar', 'LC 385/2010: limite da suspensão?', '90 dias (art. 155).');
Cd('legislacao', 'lc385-disciplinar', 'LC 385/2010: abandono de cargo e inassiduidade habitual?', 'Abandono: ausência intencional por mais de 30 dias consecutivos. Inassiduidade habitual: 60 dias interpolados em 12 meses (art. 156).');
Cd('legislacao', 'lc385-disciplinar', 'LC 385/2010: prazos de prescrição disciplinar?', '5 anos (demissão e cassação), 3 anos (suspensão acima de 30 dias), 1 ano (suspensão até 30 dias), 180 dias (repreensão) (art. 160).');
Cd('legislacao', 'lc385-disciplinar', 'LC 385/2010: prazos de sindicância e de PAD?', 'Sindicância: 30 dias + 30. PAD: 60 dias + 60. Comissão de 3 servidores estáveis (arts. 173, 183 e 186).');
Cd('legislacao', 'lc385-disciplinar', 'LC 385/2010: afastamento preventivo?', 'Até 60 dias, sem prejuízo da remuneração, prorrogável por igual prazo (art. 165).');
Cd('legislacao', 'lc385-disciplinar', 'LC 385/2010: acumulação lícita de cargos, limite de carga horária?', '65 horas semanais somadas; ilícita: 10 dias para optar (arts. 142 e 145).');
Cd('legislacao', 'cf-art37', 'Princípios expressos da administração pública (CF, art. 37)?', 'LIMPE: Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência.');
Cd('legislacao', 'cf-art37', 'Validade do concurso público (CF, art. 37, III)?', 'Até 2 anos, prorrogável uma vez por igual período.');
Cd('legislacao', 'cf-estrutura', 'CF: o que o Município mantém com cooperação da União e do Estado (art. 30, VI)?', 'Programas de educação infantil e de ensino fundamental.');
Cd('legislacao', 'servidores', 'Estabilidade do servidor (CF, art. 41)?', '3 anos de efetivo exercício, com avaliação especial de desempenho.');
Cd('legislacao', 'transparencia-etica', 'LAI (Lei 12.527/2011): prazo para responder pedido?', 'Imediato, ou até 20 dias prorrogáveis por mais 10, com justificativa (art. 11).');
Cd('legislacao', 'licitacoes', 'Lei 14.133/2021: modalidades de licitação?', 'Pregão, concorrência, concurso, leilão e diálogo competitivo. Convite e tomada de preços foram extintos.');
Cd('legislacao', 'licitacoes', 'Lei 14.133/2021: dispensa x inexigibilidade?', 'Dispensa: competição possível, mas dispensada por lei (art. 75). Inexigibilidade: competição inviável (art. 74).');
Cd('legislacao', 'lbi', 'Lei Brasileira de Inclusão: como se avalia a deficiência?', 'Avaliação biopsicossocial, feita por equipe multiprofissional (art. 2º, § 1º).');
Cd('legislacao', 'ldb', 'LDB: educação básica compreende?', 'Educação infantil, ensino fundamental e ensino médio (art. 21).');
Cd('legislacao', 'ldb', 'LDB: carga mínima do ano letivo?', '800 horas em, no mínimo, 200 dias de efetivo trabalho escolar.');

/* Português */
Cd('portugues', 'classes', 'Como identificar um adjetivo?', 'Pergunte "como é?" sobre o substantivo: aluno inteligente, casa grande. Concorda em gênero e número.');
Cd('portugues', 'classes', 'Advérbio: o que modifica e varia?', 'Modifica verbo, adjetivo ou outro advérbio e é invariável: "muito bom", "estudou muito".');
Cd('portugues', 'regencia-crase', 'Teste prático da crase?', 'Troque a palavra feminina por uma masculina: se surgir "ao", há crase (fui à escola / fui ao colégio).');
Cd('portugues', 'regencia-crase', 'Assistir (ver) e preferir: regência?', 'Assistir ao filme (a). Preferir X a Y (sem "mais" nem "do que").');
Cd('portugues', 'concordancia', 'Verbos haver e fazer impessoais?', 'Haver (existir) e fazer (tempo decorrido) ficam no singular: houve problemas; faz dois anos.');
Cd('portugues', 'ortografia', 'Por que, porque, por quê, porquê?', 'Por que: pergunta/motivo. Porque: resposta. Por quê: fim de frase. Porquê: substantivo (o porquê).');
Cd('portugues', 'pontuacao', 'Vírgula: o que se isola?', 'Aposto, vocativo, adjunto adverbial deslocado e oração explicativa. Não se separa sujeito do verbo.');
Cd('portugues', 'redacao-oficial', 'Redação oficial: qualidades?', 'Impessoalidade, formalidade, clareza, concisão e padronização. Fecho: "Respeitosamente" (autoridade superior) ou "Atenciosamente".');

/* Raciocínio Lógico */
Cd('logica', 'proposicoes', 'Negação de "todos são...".', '"Algum não é...". (A negação de "algum" é "nenhum".)');
Cd('logica', 'proposicoes', 'Quando "se p então q" é falsa?', 'Só quando p é verdadeira e q é falsa.');
Cd('logica', 'equivalencias', 'Equivalência da condicional?', '"Se p então q" equivale a "se não q então não p" (contrapositiva) e a "não p ou q".');
Cd('logica', 'equivalencias', 'De Morgan?', 'Negar "p e q" = "não p ou não q". Negar "p ou q" = "não p e não q".');
Cd('logica', 'porcentagem', 'Aumento e desconto percentual?', 'Aumento de p%: × (1 + p/100). Desconto de p%: × (1 − p/100). Sucessivos: multiplique.');
Cd('logica', 'conjuntos', 'União de dois conjuntos?', 'n(A ∪ B) = n(A) + n(B) − n(A ∩ B).');
Cd('logica', 'sequencias', 'Regra de três inversa?', 'Quando uma grandeza sobe e a outra desce (mais pessoas, menos tempo): multiplique em linha.');

/* Conhecimentos Gerais (RO) */
Cd('gerais', 'historia-ro', 'Quando Rondônia foi criada e quando foi instalada?', 'Criada pela LC 41, de 22/12/1981; instalada em 04/01/1982.');
Cd('gerais', 'historia-ro', 'Do Território Federal do Guaporé a Rondônia?', 'Guaporé em 1943; passou a se chamar Rondônia em 1956 (homenagem ao Marechal Rondon).');
Cd('gerais', 'historia-ro', 'Estrada de Ferro Madeira-Mamoré?', 'Ligava Porto Velho a Guajará-Mirim; ligada ao ciclo da borracha e ao Tratado de Petrópolis (1903).');
Cd('gerais', 'historia-ro', 'Quando Porto Velho foi fundada?', '02 de outubro de 1914.');
Cd('gerais', 'economia-ro', 'Usinas de Santo Antônio e Jirau?', 'Hidrelétricas no rio Madeira, perto de Porto Velho.');

/* Específicos (secretaria escolar) */
Cd('especificos', 'documentos-escolares', 'Ata x histórico escolar?', 'Ata registra o que se tratou e decidiu em reunião. Histórico escolar registra a vida escolar (notas e frequência por ano).');
Cd('especificos', 'arquivo-protocolo', 'Fases do arquivo?', 'Corrente (uso frequente), intermediário (uso eventual) e permanente (guarda definitiva).');
Cd('especificos', 'patrimonio-materiais', 'O que é tombamento de bem?', 'Registro e identificação do bem permanente no inventário patrimonial, em geral com número de tombo.');
Cd('especificos', 'informatica-gestao', 'Boas práticas de segurança no sistema escolar?', 'Senha pessoal e sigilosa, backup periódico, não clicar em links suspeitos, bloquear a tela ao sair.');

/* Carreiras policiais (PF, PRF e afins) */
Cd('pf-const', 'direitos-fund', 'CF art. 5º, XI: entrada em casa sem consentimento?', 'Flagrante, desastre, socorro ou, durante o dia, ordem judicial.');
Cd('pf-const', 'seguranca-publica', 'Funções exclusivas da PF (art. 144, § 1º)?', 'Polícia judiciária da União, com exclusividade; também polícia marítima, aeroportuária e de fronteiras.');
Cd('pf-const', 'remedios', 'Qual remédio para qual direito?', 'HC: liberdade de locomoção. MS: direito líquido e certo. HD: informações pessoais. MI: falta de norma. Ação popular: ato lesivo ao patrimônio público.');
Cd('pf-adm', 'principios-atos', 'Revogação x anulação?', 'Revogação: conveniência e oportunidade, efeito para frente, só a Administração. Anulação: ilegalidade, efeito retroativo, Administração ou Judiciário.');
Cd('pf-adm', 'poderes-responsab', 'Responsabilidade civil do Estado (art. 37, § 6º)?', 'Objetiva (independe de culpa), com direito de regresso contra o agente que agiu com dolo ou culpa.');
Cd('pf-penal', 'teoria-crime', 'Conceito analítico de crime?', 'Fato típico + ilícito (antijurídico) + culpável. Tentativa: pena reduzida de 1/3 a 2/3.');
Cd('pf-penal', 'crimes-adm', 'Penas: peculato, concussão e corrupção (passiva e ativa)?', 'Reclusão de 2 a 12 anos e multa. Prevaricação: detenção de 3 meses a 1 ano.');
Cd('pf-penal', 'crimes-adm', 'Descaminho x contrabando?', 'Descaminho (art. 334): iludir imposto devido; reclusão de 1 a 4 anos. Contrabando (art. 334-A): mercadoria proibida; reclusão de 2 a 5 anos.');
Cd('pf-proc', 'inquerito', 'Prazo do inquérito na Justiça Federal?', 'Preso: 15 dias, prorrogáveis por mais 15. Solto: 30 dias. (Justiça estadual: 10 dias preso, 30 solto.)');
Cd('pf-proc', 'prisoes', 'Prisão temporária?', 'Lei 7.960/1989: 5 dias + 5. Crimes hediondos: 30 dias + 30. Só na fase de investigação.');
Cd('pf-proc', 'provas', 'Interceptação telefônica (Lei 9.296/1996)?', 'Ordem judicial, crime punido com reclusão, prova não obtenível por outro meio; 15 dias renováveis por igual período.');
Cd('pf-leis', 'org-criminosa', 'Organização criminosa (Lei 12.850/2013)?', 'Associação de 4 ou mais pessoas, estruturada, com divisão de tarefas, para infrações com pena máxima acima de 4 anos ou transnacionais. Pena: 3 a 8 anos.');
Cd('pf-leis', 'drogas', 'Art. 28 x art. 33 da Lei de Drogas?', 'Art. 28 (consumo pessoal): sem prisão (advertência, serviços, curso). Art. 33 (tráfico): reclusão de 5 a 15 anos e multa.');
Cd('pf-leis', 'armas', 'Posse x porte de arma de uso permitido?', 'Posse irregular (art. 12): detenção de 1 a 3 anos. Porte ilegal (art. 14): reclusão de 2 a 4 anos. Uso restrito (art. 16): 3 a 6 anos.');
Cd('pf-leis', 'lavagem', 'Fases da lavagem de dinheiro?', 'Colocação, ocultação e integração. Pena (Lei 9.613/1998): reclusão de 3 a 10 anos e multa.');
Cd('pf-leis', 'abuso-autoridade', 'Abuso de autoridade (Lei 13.869/2019): requisito do crime?', 'Finalidade específica: prejudicar outrem, beneficiar a si ou a terceiro, ou agir por capricho ou satisfação pessoal. Divergência de interpretação não é crime.');
Cd('pf-info', 'seguranca-info', 'Pilares da segurança da informação?', 'Confidencialidade, integridade e disponibilidade (CIA), além de autenticidade e não repúdio.');
Cd('pf-info', 'seguranca-info', 'Ransomware x worm x trojan?', 'Ransomware sequestra arquivos e pede resgate. Worm se propaga sozinho pela rede. Trojan parece útil e abre brechas.');
Cd('pf-info', 'redes', 'Protocolos e portas comuns?', 'HTTP 80, HTTPS 443, SMTP 25, POP3 110, IMAP 143. DNS traduz nomes em IP; DHCP atribui IP.');

/* Trânsito (CTB) */
Cd('prf-transito', 'infracoes', 'CTB: pontos por classe de infração?', 'Gravíssima 7, grave 5, média 4, leve 3.');
Cd('prf-transito', 'infracoes', 'CTB: suspensão da CNH por pontos (12 meses)?', '20 pontos com 2 ou mais gravíssimas; 30 com uma gravíssima; 40 sem gravíssima.');
Cd('prf-transito', 'crimes-transito', 'CTB: penas dos arts. 302, 303, 304 e 306?', '302: detenção de 2 a 4 anos. 303: 6 meses a 2 anos. 304: 6 meses a 1 ano ou multa. 306: 6 meses a 3 anos, multa e suspensão.');
Cd('prf-transito', 'crimes-transito', 'CTB art. 306: limite de álcool?', '6 decigramas por litro de sangue ou 0,3 mg por litro de ar expelido.');
Cd('prf-transito', 'circulacao', 'CTB: velocidades em via sem placa?', 'Urbana: trânsito rápido 80, arterial 60, coletora 40, local 30. Rodovia: 110 (carros e motos), 90 (ônibus), 80 (demais). Estrada: 60.');
