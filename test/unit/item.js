/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var connect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var Item;

describe('Item', function(){
  before(function(done){
    connect('home-inventory-test', function(){
      Item = require('../../app/models/item');
      done();
    });
  });

  beforeEach(function(done){
    global.mongodb.collection('items').remove(function(){
      done();
    });
  });

 /* after(function(){
    console.log('i am in the after block');
  });

  afterEach(function(){
    console.log('i am in the after each block');
  }); */

  describe('constructor', function(){
    it('should create new inventory item', function(){
      var couch = new Item('couch', 'living room', '7/11/2014', '1', '200');

      expect(couch).to.be.instanceof(Item);
      expect(couch.name).to.equal('couch');
      expect(couch.room).to.equal('living room');
      expect(couch.dateAcquired).to.be.instanceof(Date);
      expect(couch.count).to.equal(1);
      expect(couch.costEach).to.equal(200);
    });
  });

  describe('#save', function(){
    it('should save an item to the mongo database', function (done){
      var couch = new Item('couch', 'living room', '7/11/2014', '1', '200');
      couch.save(function(){
        expect(couch._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.find', function(){
    it('should find all the items from the mongo database', function(done){
      var couch = new Item('couch', 'living room', '7/11/2014', '1', '200');
      couch.save(function(){
        Item.find({}, function(items){
          expect(items).to.have.length(1);
          done();
        });
      });
    });

    it('should find only the requested items from the mongo database', function(done){
      var couch = new Item('couch', 'living room', '7/11/2014', '1', '200');
      var chair = new Item('chair', 'dining room', '7/11/2014', '4', '150');
      var chair2 = new Item('chair', 'living room', '7/11/2014', '1', '200');
      var table = new Item('table', 'dining room', '7/11/2014', '1', '200');
      couch.save(function(){
        chair.save(function(){
          chair2.save(function(){
            table.save(function(){
              Item.find({name:'chair'}, function(items){
                expect(items).to.have.length(2);
                expect(items[0].name).to.equal('chair');
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('#value', function(){
    it('should return total value of a single item', function(){
      var chair = new Item('chair', 'living room', '7/11/2014', '4', '150');
      var val = chair.value();
      expect(val).to.equal(600);
    });
  });

  describe('.value', function(){
    it('should return the total value of selected items in db', function(done){
      var couch = new Item('couch', 'living room', '7/11/2014', '1', '200');
      var chair = new Item('chair', 'dining room', '7/11/2014', '4', '150');
      var chair2 = new Item('chair', 'living room', '7/11/2014', '1', '200');
      var table = new Item('table', 'dining room', '7/11/2014', '1', '200');
      couch.save(function(){
        chair.save(function(){
          chair2.save(function(){
            table.save(function(){
              Item.value({room:'dining room'}, function(value){
                expect(value).to.equal(800);
                done();
              });
            });
          });
        });
      });
    });
  });
});
