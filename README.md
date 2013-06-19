# Invoice PDF

  Create a stripe invoice pdf from a jade template

## Installation

### Install Phantom

### NPM
    $ npm install invoice-pdf
  
## Usage

```js
var user = { // coming from Storify database
		username: 'philmod'
	, ...
	, _stripe : {
			...
		}
};
var options = {};
var invoice = new Invoice(user, options);
invoice.create(function(e,path) {
	// you get the pdf file path
});
```

Other usages: 
 - Render the html:

```js
invoice.render(function(e,html) {

});
```

 - Create PDF from html:

```js
invoice.jade2pdf(function(e,path) {

});
```

 - Delete PDF file:

```js
invoice.deletePdf(function(e) {

});
```

 - Pipe PDF file:

```js
invoice.pipePdf(res);
```

## Run Tests
		$ make test