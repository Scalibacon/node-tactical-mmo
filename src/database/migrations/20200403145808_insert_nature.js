
exports.up = function(knex) {
    return knex('nature').insert([
        { 
            name: "Sério",
            hp: 50,
            energy: 50,
            strenght: 50,
            power: 50,
            defense: 50,
            resistance: 50,
            speed: 50,
            technique: 50
        },
        {
            name: "Calmo",
            hp: 40,
            energy: 80,
            strenght: 0,
            power: 100,
            defense: 20,
            resistance: 60,
            speed: 20,
            technique: 80
        },
        {
            name: "Gentil",
            hp: 60,
            energy: 100,
            strenght: 0,
            power: 50,
            defense: 20,
            resistance: 50,
            speed: 40,
            technique: 80
        },
        {
            name: "Despreocupado",
            hp: 80,
            energy: 60,
            strenght: 50,
            power: 20,
            defense: 100,
            resistance: 60,
            speed: 20,
            technique: 30
        },
        {
            name: "Corajoso",
            hp: 70,
            energy: 20,
            strenght: 100,
            power: 20,
            defense: 60,
            resistance: 30,
            speed: 40,
            technique: 60
        },
        {
            name: "Solitário",
            hp: 10,
            energy: 60,
            strenght: 80,
            power: 10,
            defense: 20,
            resistance: 50,
            speed: 100,
            technique: 70
        },             
    ])
};

exports.down = function(knex) {
    knex.migrate.rollback();
};
