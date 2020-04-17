
exports.up = function(knex) {
    return knex('user').insert({
        id: '20204115014974',
        username: "Scali",
        email: "sc@li.com",
        password: "e8d95a51f3af4a3b134bf6bb680a213a",
        last_login: knex.fn.now(),
        gold_coins: 0,
        silver_coins: 0,
        bronze_coins: 5,
        map: 0,
        x: 5,
        y: 5,
        progress: '{"0":1}'
    }).then(response => {
        return knex('effort').insert({
            id: '202041150149740'
        }).then(response => {
            return knex('base_stats').insert({
                id: '202041150149740',
                hp: 10,
                energy: 14,
                strenght: 4,
                power: 7,
                defense: 4,
                resistance: 6,
                speed: 4,
                technique: 6,
                luck: 1    
            }).then(response => {
                return knex('character').insert({
                    id: '202041150149740',
                    id_user: '20204115014974',
                    name: 'Tetheus',
                    main: true,
            
                    base_stats: '202041150149740',
                    effort: '202041150149740',
                    nature: 'Calmo'
                });
            })
        })
    })
};

exports.down = function(knex) {
    return knex.migrate.rollback();
};
