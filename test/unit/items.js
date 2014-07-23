/* jshint expr:true */
/* global describe, it */

'use strict';

var expect = require('chai').expect;
var Item = require('../../app/models/items');

describe('Item', function(){
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
});
