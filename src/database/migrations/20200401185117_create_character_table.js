exports.up = function(knex) {
    return knex.schema
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
        .createTable('base_stats', function(table){
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
            table.boolean('main').notNullable().defaultTo(false);
            table.boolean('active').notNullable().defaultTo(true);

            table.string('name').notNullable();
            table.string('gender').notNullable().defaultTo("M");
            table.string('job').notNullable().defaultTo('Aprendiz');
            table.integer('level').notNullable().defaultTo(1);
            table.integer('experience').notNullable().defaultTo(0);
            table.integer('hunger').notNullable().defaultTo(0);
            table.string('status').notNullable().defaultTo("Vivo");

            table.integer('lost_hp').notNullable().defaultTo(0);
            table.integer('lost_energy').notNullable().defaultTo(0);

            table.string('base_stats').notNullable();
            table.string('effort').notNullable();
            table.string('nature').notNullable();
            table.string('active_skills').notNullable().defaultTo('[]');
            table.string('itens').notNullable().defaultTo('[]');

            table.foreign('base_stats').references('id').inTable('base_stats');
            table.foreign('effort').references('id').inTable('effort');
        })        
};

exports.down = function(knex) {
    return knex.schema    
        .dropTable('character')
        .dropTable('base_stats')
        .dropTable('effort')        
};
