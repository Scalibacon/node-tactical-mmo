
exports.up = function(knex) {
    return knex('item').insert([
        {name: 'Lâmina de aprendiz'},
        {name: 'Poção de bolso vermelha'}
    ]);
};

exports.down = function(knex) {
    return knex.migrate.rollback();
};
