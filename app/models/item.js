'use strict';

var cItem = global.mongodb.collection('items');

function Item(name, room, date, count, cost){
  this.name = name;
  this.room = room;
  this.dateAcquired = new Date(date);
  this.count = parseInt(count);
  this.costEach = parseFloat(cost);
}

Item.prototype.save = function(cb){
  cItem.save(this, function(err, obj){
    cb();
  }); 
};

Item.find = function(query, cb){
  cItem.find(query).toArray(function(err, items){
    cb(items);
  });
};


module.exports = Item;

