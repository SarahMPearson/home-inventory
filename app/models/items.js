'use strict';

function Item(name, room, date, count, cost){
  this.name = name;
  this.room = room;
  this.dateAcquired = new Date(date);
  this.count = parseInt(count);
  this.costEach = parseFloat(cost);
}

module.exports = Item;
