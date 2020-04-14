
exports.up = function(knex) {
    return knex.schema.createTable('user', function(table){
        table.string('id').primary();
        table.string('username').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.timestamp('last_login').defaultTo(knex.fn.now());
        
        table.integer('gold_coins').notNullable().defaultTo(0);
        table.integer('silver_coins').notNullable().defaultTo(0);
        table.integer('bronze_coins').notNullable().defaultTo(0);

        table.integer('map').notNullable().defaultTo(0);
        table.integer('x').notNullable().defaultTo(5);
        table.integer('y').notNullable().defaultTo(5);

        table.string('progress').notNullable().defaultTo('{"0":true}');

        table.unique('username');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('user');
};
