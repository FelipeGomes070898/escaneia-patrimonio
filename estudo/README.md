# Rota do Concurso - Porto Velho/RO 2026

Sistema de estudo em HTML/JS puro (sem instalar nada) para o concurso da **SEMED** (Agente de Secretaria Escolar, banca IBGP, edital nº 24/2026). Serve de base para SEMUSA (IBGP) e acompanha IPAM (IBADE) e SESAU-RO (IDECAN) quando saírem os editais.

## Como abrir
- **No PC:** abra `estudo/index.html` no navegador (clique duplo).
- **No celular:** publique a pasta (GitHub Pages, Netlify, etc.) e abra o endereço; use "Adicionar à tela inicial". Depois da primeira visita funciona offline (service worker; exige `https` ou `localhost`).
- O progresso fica salvo no próprio aparelho. Para levar ao outro aparelho: *Mais → Ajustes → Exportar / Importar*.

## Cadastro: concurso e nível
Antes de entrar, a pessoa se **cadastra**: nome, o(s) **concurso(s)** em que se inscreveu (**SEMED, SEMUSA, IPAM ou SESAU-RO**) e, dentro de cada um, o **nível que pagou** (fundamental, médio e/ou superior, conforme os níveis de cada concurso). Cada par concurso + nível é uma inscrição; quem tem mais de uma escolhe qual estudar ao entrar e alterna pelo concurso no topo da tela. Banca, data da prova e estrutura mudam conforme a inscrição ativa. Tópicos, questões, simulado e apostilas seguem o nível. O cadastro (em *Ajustes → Meu cadastro*) pode ser editado sem perder o progresso.

> O cadastro fica salvo só no aparelho (não há servidor nem login real) e o site não confere inscrição nem pagamento: vale o que a pessoa informar.
> Só o edital da SEMED foi lido (nível médio = estrutura confirmada). SEMUSA tem datas do levantamento de 10/10/2026; IPAM e SESAU-RO ainda não tinham edital: aparecem como "data a definir" e estrutura estimada.

Níveis:
- **Médio:** completo, com a estrutura da prova da SEMED (edital 24/2026): 27 tópicos.
- **Fundamental:** 17 tópicos básicos (sem secretaria escolar, LDB, redação oficial etc.). Estrutura da prova **estimada**.
- **Superior:** base do médio + redação discursiva + orientação para os Específicos do cargo (29 tópicos). Estrutura **estimada**; os Específicos dependem do Anexo IV do seu cargo.

## Foco na aprovação
Depois do cadastro tudo gira em torno de passar no nível escolhido:
- **Meta de aprovação:** nota mínima (50%, edital 24/2026 item 10.1) e uma meta pessoal com margem (padrão 70%, ajustável).
- **Diagnóstico e nota projetada:** o mini-simulado e as respostas alimentam uma projeção ponderada pelo número de questões de cada matéria.
- **Missão de hoje:** revisões, ponto de maior retorno, treino focado, erros abertos e meta diária de questões.
- **Onde estudar primeiro:** ordena os tópicos pelo peso na prova e por quanto falta para acertar.
- **Treino focado:** sorteia questões dos tópicos prioritários, dando mais chance às que você errou.
- A nota mínima não garante a vaga: depende da linha de corte e dos outros candidatos.

## O que tem
| Tela | Para quê |
|---|---|
| Painel | contagem regressiva das provas, rotina do dia, próxima aula, progresso por matéria |
| Trilha | 5 matérias, de 17 a 29 tópicos conforme o nível, cada um em 3 níveis (contexto, básico, aprofundado) |
| Aula | texto, links para **videoaulas no YouTube** e **PDFs resumidos no Google** (buscas prontas), seus próprios links, apostila em PDF, teste rápido, anotação de 3 linhas, conclusão por volta |
| Questões | 95 questões originais com correção imediata e explicação |
| Simulados | 50 questões / 3 h na distribuição da prova (10/10/10/15/5), ou mini de 20; correção por matéria e tópico |
| Caderno de erros | entra sozinho ao errar; motivo (não sabia, confundi, desatenção) e a regra correta |
| Revisão | agenda automática em 1, 7 e 21 dias após concluir uma etapa |
| Cronograma | semanas 0 a 9 com checklist e datas |
| Edital | regras do corpo do edital nº 24/2026 e links oficiais |

## Apostilas em PDF
Em `pdf/` há, para cada nível (`apostila-<nivel>-<materia>.pdf`), uma apostila por matéria e uma completa (resumo em 3 camadas + exercícios + gabarito comentado). Para regerar depois de editar o conteúdo:

```
cd estudo
node tools/gerar-pdfs.js      # precisa de node + playwright + chromium
```
Em cada aula também há o botão "Salvar esta aula em PDF" (usa a impressão do navegador).

## Como editar o conteúdo
Tudo está em `data/*.js` (o campo `nv` de cada tópico define os níveis; veja `data/core.js` e `data/superior.js`): `M({...})` define a matéria e os tópicos; `Q(...)` define uma questão (veja `data/core.js`). Ao mudar arquivos, aumente a versão `CACHE` em `sw.js`.

## Limites conhecidos (leia)
- **Anexo IV não lido:** o PDF do edital obtido traz só o corpo; os conteúdos estão marcados como *provável* e o que depende de lei local aparece como **A CONFIRMAR NO EDITAL** (ex.: número da Lei Orgânica e do Estatuto dos Servidores de Porto Velho).
- Datas e valores vêm do edital e de reportagens de 10/10/2026; sempre confirmar no site da banca.
- O banco tem de 2 a 5 questões por tópico (meta do método: 20). *Atualidades* ainda não tem questões. Faltam as Voltas 2 e 3 em profundidade.
- Questões e textos foram escritos do zero; não copie provas de terceiros para cá.
