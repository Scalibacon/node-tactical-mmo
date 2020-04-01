
exports.up = function(knex) {
    return knex.schema.createTable('user', function(table){
        table.string('id').primary();
        table.string('username').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.bigInteger('last_login');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('user');
};
