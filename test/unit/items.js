/* jshint expr:true */
/* global describe, it, before */

'use strict';

var expect = require('chai').expect;
var Item;
var connect = require('../../app/lib/mongodb');

describe('Item', function(){
  before(function(done){
    connect('home-inventory-test', function(){
      Item = require('../../app/models/item');
      done();
    });
  });

 /* beforeEach(function(){
    console.log('i am in the before each block');
  });

  after(function(){
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
        expect(couch._id).to.be.ok;
        done();
      });
    });
  });
});
