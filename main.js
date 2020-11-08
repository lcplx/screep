var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');


Game.spawns['Spawn1'].room.controller.activateSafeMode();
// Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );


module.exports.loop = function () {
        
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE,MOVE],"buider"+Game.time,{memory: {role: 'builder'}})

        var tower = Game.getObjectById('8f5e9cd1a099261b14e91e97');
        if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
      
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    

    if(upgrader.length < 1) {
        var newName = 'upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'upgrader'}});        
    }
    if(builder.length < 1) {
        var newName = 'builder' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'builder'}});        
    }
    if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'builder'}});        
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}