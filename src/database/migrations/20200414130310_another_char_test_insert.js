
exports.up = function(knex) {
    return knex('effort').insert({
        id: '202041150149741'
    }).then(response => {
        return knex('base_stats').insert({
            id: '202041150149741',
            hp: 10,
            energy: 14,
            strenght: 5,
            power: 4,
            defense: 4,
            resistance: 5,
            speed: 7,
            technique: 6,
            luck: 1    
        }).then(response => {
            return knex('character').insert({
                id: '202041150149741',
                id_user: '20204115014974',
                name: 'Elise',
                main: false,
        
                base_stats: '202041150149741',
                effort: '202041150149741',
                nature: 'Solitário',
                gender: 'f',
                
                active_skills: '[0]',
                itens: '[0]'
            });
        })
    })
};

exports.down = function(knex) {
    return knex.migrate.rollback();
};
