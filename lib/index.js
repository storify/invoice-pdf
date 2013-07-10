/*!
 * invoice-pdf
 * Copyright(c) 2013 Storify <philmod@storify.com>
 */


/**
 * Module dependencies.
 */
var jade      = require('jade')
  , phantom   = require('phantom')
  , async     = require('async')
  , crypto    = require('crypto')
  , fs        = require('fs')
  , moment    = require('moment')
  , port      = 11111
  ;


/**
 * Invoice object.
 */
var Invoice = function(user, options) {
  if (!user) throw new Error('Need the user object to create invoice.');
    this.user      = user
  , this.options   = options || {}
  , this.jade_path = this.options.jade_path || (__dirname + '/../views/invoice.jade')
  , this.dir       = this.options.dir || __dirname
  , this.data      = {}
  ;
  this.setData();
  return this;
}


/**
 * Check and Set informations.
 */
Invoice.prototype.setData = function() {
  var self = this;
  if (!this.user._stripe) throw new Error('There is no _stripe information.');
  var _stripe = this.user._stripe;
  if (!_stripe.last_invoice) throw new Error('There is no _stripe last_invoice in the user data.');
  this.data.date          = moment(new Date()).format('MMMM D, YYYY');
  this.data.user          = {
    username : self.user.username,
    email    : self.user.email,
    name     : _stripe.token.card.name || user.profile.name || user.username
  };
  this.data.transactionId = _stripe.last_invoice.id;
  this.data.creditCardEnd = _stripe.token.card.last4;
  this.data.plan          = this.getPlan();
  this.data.price         = _stripe.last_invoice.total/100;
}


/**
 * Get plan.
 */
Invoice.prototype.getPlan = function() {
  var interval = this.user._stripe.last_invoice.lines.data[0].plan.interval
    , planName = this.user._stripe.last_invoice.lines.data[0].plan.name
    ;
  if (interval == 'month')     interval = 'Monthly';
  else if (interval == 'year') interval = 'Annual';
  return interval + ' ' + planName  + ' plan';
}


/**
 * Create.
 */
Invoice.prototype.create = function(callback) {
  var self = this;
  // 1. render jade
  self.render(function(e,html) {
    if (e) return callback(e);
    // 2. jade to pdf
    self.jade2pdf(callback);
  });
}


/**
 * Render Jade.
 */
Invoice.prototype.render = function(callback) {
  var self = this;
  jade.renderFile(this.jade_path, {
    cache    : true,
    layout   : false,
    data     : self.data,
    webappUrl: self.options.webappUrl || 'http://www.storify.com' // hard coded here
  }, function(e,html) {
    if (e) return callback(e);
    self.html = html;
    callback(null, html);
  });
}


/**
 * Jade to PDF.
 */
Invoice.prototype.jade2pdf = function(callback) {
  var self = this;

  // 0. Check if html
  if (!self.html) return callback(new Error('No HTML available, run the render method first.'));

  // 1. Create the path_file
  var path_file = this.data.transactionId + new Date()
    , path_file = this.dir + '/' + crypto.createHash('md5').update(path_file).digest("hex") + '.pdf';
  self.path_file = path_file;

  port++; // we have to change the port, for concurrent use
  if (port > 22222) port = 11111; // let stay between 11111 & 22222

  phantom.create( {port: port}, function(ph) {
    // 2. Create the file from the hmtl
    return ph.createPage(function(page) {
      // 2.1. Set the html content
      page.set('content', self.html);
      // 2.2. Define the size options
      page.set('paperSize', { format: 'letter', orientation: 'portrait', margin: '1cm' });
      page.set('viewportSize', { width: 612, height: 792 });
      setTimeout(function () { //PM: don't know why, but it is...
        // 2.3. Render the pdf
        page.render(path_file);

        setTimeout(function () {
          // 2.4. Callback with path_file
          ph.exit();
          return callback(null, path_file);
        }, 750);
      }, 750);
    });
  });

}


/**
 * Delete PDF.
 */
Invoice.prototype.deletePdf = function(callback) {
  fs.unlink(this.path_file, callback);
};


/**
 * Pipe PDF.
 */
Invoice.prototype.pipePdf = function(res) {
  var self = this;
  var readStream = fs.createReadStream(this.path_file);
  readStream.pipe(res);
  readStream.on('error', function (e) {
    console.error('Error while streaming : ', e);
    res.writeHead(404);
    res.end();
  })
  readStream.on('close', function () {
    res.end();
    self.deletePdf(function(e) {
      if (e) console.error('Error while deleting PDF file : ', e);
    })
  });
};


/**
 * Expose Invoice.
 */
module.exports = Invoice;
