
exports.up = function(knex) {
    return knex.schema
    .createTable('user_item', function(table){
        table.string('user_id').primary();
        table.integer('item_id').primary();
        table.integer('quantity').notNullable().defaultTo(1);

        table.foreign('user_id').references('id').inTable('user');
        table.foreign('item_id').references('id').inTable('item');
    })
    .createTable('character_item', function(table){
        table.string('character_id').primary();
        table.integer('item_id').primary();
        table.integer('quantity').notNullable().defaultTo(1);

        table.foreign('character_id').references('id').inTable('character');
        table.foreign('item_id').references('id').inTable('item');
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('character_item')
    .dropTable('user_item')
};
