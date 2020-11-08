var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleHarvesterBig = require('role.harvesterBig');

Game.spawns['Spawn1'].room.controller.activateSafeMode();
// Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );


module.exports.loop = function () {
        var x=  Game.spawns['Spawn1'].room.find(FIND_SOURCES);
        console.log(x)
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
    var harvesterBig=_.filter(Game.creeps,(creep) =>creep.memory.role =='harvesterBig');
    
    if(harvesterBig.length<2){
       var newName = 'harvesterBig' + Game.time;
        console.log('Spawning new harvesterBig: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvesterBig'}});      
    }
    
    if(upgrader.length < 2) {
        var newName = 'upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'upgrader'}});        
    }
    if(builder.length < 2) {
        var newName = 'builder' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'builder'}});        
    }
    if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'harvester'}});        
    }
    
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvesterBig') {
            roleHarvesterBig.run(creep);
        }
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