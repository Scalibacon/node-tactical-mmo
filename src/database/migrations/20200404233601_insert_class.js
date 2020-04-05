exports.up = function(knex) {
    return knex('job').insert([
        {name: "Aprendiz"},
        {name: "Guerreiro"},
        {name: "Ladino"},
        {name: "Mago"},
        {name: "Arqueiro"},
        {name: "Clérigo"},
    ]);
};

exports.down = function(knex) {
    knex.migrate.rollback();
};
