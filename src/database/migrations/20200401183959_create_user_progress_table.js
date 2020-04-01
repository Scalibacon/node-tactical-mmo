
exports.up = function(knex) {
    return knex.schema.createTable('user_progress', function(table){
        table.string('id_user').primary();
        table.string('id_progress').primary();

        table.foreign('id_user').references('id').inTable('user');
        table.foreign('id_progress').references('id').inTable('progress');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('user_progress');
};
