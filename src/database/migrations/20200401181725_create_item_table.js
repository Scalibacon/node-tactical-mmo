
exports.up = function(knex) {
    return knex.schema
    .createTable('item', function(table){
        table.increments('id');
        table.string('name').notNullable();
    })
    .createTable('user_item', function(table){
        table.string('id_user').notNullable();
        table.int('id_item').notNullable();
        table.int('quantity').notNullable().defaultTo(1);

        table.foreign('id_user').references('id').inTable('user');
        table.foreign('id_item').references('id').inTable('item');
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('item')
    .dropTable('user_item');
};
