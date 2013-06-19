/**
 * Module dependencies.
 */

var Invoice = require('../')
  , should  = require('should')
  , assert  = require('assert')
  , fs      = require('fs')
  ;

/**
 * Data.
 */
var user = require('./user.js');

/**
 * Delete file.
 */
var deleteFile = function(path, callback) {
  fs.unlink(path, function(e) {
    if (e) console.error('Error while deleting the pdf file (job server) : ', e);
    if (callback) callback();
  });
};


/**
 * Tests
 */
describe('Invoice separate methods', function(){

  var invoice;

  it('should creates the recommendations instance', function(done){
    var options = {};
    invoice = new Invoice(user, options);
    invoice.should.have.property('data');
    invoice.should.have.property('options');
    done();
  });

  it('should render the jade', function(done){
    invoice.render(function(e,html) {
      should.equal(e,null);
      should.exist(html);
      done();
    });
  });

  it('should create pdf from html', function(done){
    invoice.jade2pdf(function(e,path) {
      should.equal(e,null);
      should.exist(path);
      deleteFile(path);
      done();
    });
  });

});

describe('Invoice.create', function() {

  var invoice;

  beforeEach(function() {
    invoice = new Invoice(user, {});
  });

  it('should creates the recommendations instance', function(done){
    invoice.create(function(e,path) {
      should.equal(e,null);
      should.exist(path);
      deleteFile(path);
      done();
    });
  });

});

