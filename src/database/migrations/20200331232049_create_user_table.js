
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
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('user');
};
