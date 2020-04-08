module.exports.getTotalStats = function(char){
    let total = {};

    total.max_hp = Math.floor( char.base_stats.hp + (char.effort.hp / 10) );
    total.max_energy = Math.floor( char.base_stats.energy + (char.effort.energy / 10) );
    total.strenght = Math.floor( char.base_stats.strenght + (char.effort.strenght / 10) );
    total.power = Math.floor( char.base_stats.power + (char.effort.power / 10) );
    total.defense = Math.floor( char.base_stats.defense + (char.effort.defense / 10) );
    total.resistance = Math.floor( char.base_stats.resistance + (char.effort.resistance / 10) );
    total.speed = Math.floor( char.base_stats.speed + (char.effort.speed / 10) );
    total.technique = Math.floor( char.base_stats.technique + (char.effort.technique / 10) );
    total.luck = Math.floor( char.base_stats.luck + (char.effort.luck / 10) );

    return total;
}