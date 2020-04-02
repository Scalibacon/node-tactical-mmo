
exports.up = function(knex) {
    return knex.schema
    .createTable('item_type', function(table){
        table.string('type').primary();
    })
    .createTable('item', function(table){
        table.increments('id');
        table.string('name').notNullable();
        table.string('type').notNullable();
        table.integer('price');
        table.string('description');

        table.foreign('type').references('type').inTable('item_type');
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('item')
    .dropTable('item_type');
};
