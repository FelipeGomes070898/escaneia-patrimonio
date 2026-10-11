/* Área do dono. Só aparecem hashes (SHA-256 com sal): o código secreto e os e-mails dos donos não ficam em texto no repositório.
   donos = e-mails com permissão de dono; hash = código secreto do dono (segunda barreira, pois o e-mail do login não é verificado). */
window.ADMIN = { sal: 'rota-dono-v1', hash: '6a7658df88e03b4e2ab392533c748b1ce98166ed25e0c2ae3fee3250cbc801fe', salEmail: 'rota-dono-email-v1', donos: ['d626a3c92f313ec98917e5c156a49c4b160d7ad12808969f4d5ae9d5a3b4d7b8', '6243880cfbbf6d07193f6d9dc60c8da42f9d36164a62cb89c864e5efb036789d'] };
