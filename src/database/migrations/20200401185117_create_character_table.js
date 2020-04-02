
exports.up = function(knex) {
    return knex.schema
        .createTable('class', function(table){
            table.string('name').primary();
        })
        .createTable('nature', function(table){
            table.string('name').primary();

            table.integer('hp_gain').notNullable();
            table.integer('energy_gain').notNullable();
            table.integer('strenght_gain').notNullable();
            table.integer('power_gain').notNullable();
            table.integer('defense_gain').notNullable();
            table.integer('resistance_gain').notNullable();
            table.integer('speed_gain').notNullable();
            table.integer('technique_gain').notNullable();
            table.integer('luck_gain').notNullable();
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

            table.string('nature').notNullable();

            table.foreign('nature').references('name').inTable('nature');
        })
        
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('character')
    .dropTable('nature')
    .dropTable('class');
};
