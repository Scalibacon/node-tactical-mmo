
exports.up = function(knex) {
    return knex.schema
    .createTable('quest', function(table){
        table.increments('id');
        table.string('name').notNullable();
        table.string('goal').notNullable();
        table.string('contractor').notNullable();
    })
    .createTable('user_quest', function(table){
        table.string('id_user').primary();
        table.integer('id_quest').primary();
        table.boolean('finished').notNullable().defaultTo(false);
        table.string('progress').notNullable().defaultTo('"{}"');

        table.foreign('id_user').references('id').inTable('user');
        table.foreign('id_quest').references('id').inTable('quest');
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('user_quest')
    .dropTable('quest');
};
