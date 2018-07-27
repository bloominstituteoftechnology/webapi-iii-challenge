exports.seed = function(knex, Promise) {
  return knex('tags')
    .del() // delete existing tags
    .then(function() {
      return knex('tags').insert([
        { tag: 'SHIRE' }, // 1
        { tag: 'FELLOWSHIP OF THE RING' }, // 2
        { tag: 'FRODO' }, // 3
        { tag: 'RIVENDELL' }, // 4
        { tag: 'BREE' }, // 5
        { tag: 'SAM' }, // 6
        { tag: 'MERRY' }, // 7
        { tag: 'GIMLY' }, // 8
        { tag: 'GANDALF' }, // 9
        { tag: 'ARAGORN' }, // 10
        { tag: 'MORIA' }, // 11
        { tag: 'BOROMIR' }, // 12
        { tag: 'LEGOLAS' }, // 13
        { tag: 'PRANCING PONY' }, // 14
      ]);
    });
};
