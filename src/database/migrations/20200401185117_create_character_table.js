
exports.up = function(knex) {
    return knex.schema
        .createTable('class', function(table){
            table.string('name').primary();
        })
        .createTable('nature', function(table){
            table.string('name').primary();

            table.integer('hp').notNullable();
            table.integer('energy').notNullable();
            table.integer('strenght').notNullable();
            table.integer('power').notNullable();
            table.integer('defense').notNullable();
            table.integer('resistance').notNullable();
            table.integer('speed').notNullable();
            table.integer('technique').notNullable();
        })
        .createTable('effort', function(table){
            table.string('id').primary();

            table.integer('hp').notNullable().defaultTo(0);
            table.integer('energy').notNullable().defaultTo(0);
            table.integer('strenght').notNullable().defaultTo(0);
            table.integer('power').notNullable().defaultTo(0);
            table.integer('defense').notNullable().defaultTo(0);
            table.integer('resistance').notNullable().defaultTo(0);
            table.integer('speed').notNullable().defaultTo(0);
            table.integer('technique').notNullable().defaultTo(0);
            table.integer('luck').notNullable().defaultTo(0);
        })
        .createTable('character', function(table){
            table.string('id').primary();
            table.string('id_user').notNullable();
            table.boolean('main').notNullable();

            table.string('name').primary();
            table.string('class').notNullable().defaultTo('Aprendiz');
            table.integer('level').notNullable().defaultTo(1);
            table.integer('experience').notNullable().defaultTo(0);
            table.integer('hunger').notNullable();
            table.boolean('alive').notNullable().defaultTo(true);

            table.integer('base_max_hp').notNullable();
            table.integer('base_max_energy').notNullable();
            table.integer('base_strenght').notNullable();
            table.integer('base_power').notNullable();
            table.integer('base_defense').notNullable();
            table.integer('base_resistance').notNullable();
            table.integer('base_speed').notNullable();
            table.integer('base_technique').notNullable();
            table.integer('base_luck').notNullable();

            table.integer('lost_hp').notNullable().defaultTo(0);
            table.integer('lost_energy').notNullable().defaultTo(0);

            table.string('effort').notNullable();
            table.string('nature').notNullable();

            table.foreign('nature').references('name').inTable('nature');
            table.foreign('effort').references('id').inTable('effort');
        })
        
};

exports.down = function(knex) {
    return knex.schema    
        .dropTable('character')
        .dropTable('effort')
        .dropTable('nature')
        .dropTable('class');
};
