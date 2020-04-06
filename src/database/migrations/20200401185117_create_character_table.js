exports.up = function(knex) {
    return knex.schema
        .createTable('job', function(table){
            table.string('name').primary();
            table.string('type').notNullable().defaultTo('infantry');
            table.int('weight').notNullable().defaultTo(1);
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
            table.boolean('main').notNullable().defaultTo(false);

            table.string('name').notNullable();
            table.string('gender').notNullable().defaultTo("M");
            table.string('job').notNullable().defaultTo('Aprendiz');
            table.integer('level').notNullable().defaultTo(1);
            table.integer('experience').notNullable().defaultTo(0);
            table.integer('hunger').notNullable().defaultTo(false);
            table.boolean('alive').notNullable().defaultTo(true);

            table.integer('max_hp').notNullable();
            table.integer('max_energy').notNullable();
            table.integer('strenght').notNullable();
            table.integer('power').notNullable();
            table.integer('defense').notNullable();
            table.integer('resistance').notNullable();
            table.integer('speed').notNullable();
            table.integer('technique').notNullable();
            table.integer('luck').notNullable();

            table.integer('lost_hp').notNullable().defaultTo(0);
            table.integer('lost_energy').notNullable().defaultTo(0);

            table.string('effort').notNullable();
            table.string('nature').notNullable();
            table.string('active_skills').notNullable().defaultTo('[]');

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
