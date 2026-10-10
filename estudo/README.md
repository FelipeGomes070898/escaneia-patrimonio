# Rota do Concurso - Porto Velho/RO 2026

Sistema de estudo em HTML/JS puro (sem instalar nada) para o concurso da **SEMED** (Agente de Secretaria Escolar, banca IBGP, edital nº 24/2026). Serve de base para SEMUSA (IBGP) e acompanha IPAM (IBADE) e SESAU-RO (IDECAN) quando saírem os editais.

## Como abrir
- **No PC:** abra `estudo/index.html` no navegador (clique duplo).
- **No celular:** publique a pasta (GitHub Pages, Netlify, etc.) e abra o endereço; use "Adicionar à tela inicial". Depois da primeira visita funciona offline (service worker; exige `https` ou `localhost`).
- O progresso fica salvo no próprio aparelho. Para levar ao outro aparelho: *Mais → Ajustes → Exportar / Importar*.

## Nível de escolaridade
Na primeira visita o site pergunta o nível (**fundamental, médio ou superior**) e monta tudo conforme a escolha: tópicos, questões, simulado e apostilas em PDF. Dá para trocar em *Ajustes* sem perder o progresso.
- **Médio:** completo, com a estrutura da prova da SEMED (edital 24/2026): 27 tópicos.
- **Fundamental:** 17 tópicos básicos (sem secretaria escolar, LDB, redação oficial etc.). Estrutura da prova **estimada**.
- **Superior:** base do médio + redação discursiva + orientação para os Específicos do cargo (29 tópicos). Estrutura **estimada**; os Específicos dependem do Anexo IV do seu cargo.

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
