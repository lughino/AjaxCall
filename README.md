# AjaxCall
A simple ajax call formatter between server and client (built in es6 and compiled in es5 with babel)

***It requires [Express](http://expressjs.com/) installed in your project!***


This is the server module, a client module (for Angularjs) can be found here:
[Ajax-interceptor](https://github.com/Code-Y/angular-ajax-interceptor)

Installing it
-------------

```shell
npm install ajax-call
```

Usage
-----

```javascript
app.get('/api/v1/users/:id', function(req, res) {
  var ajaxCall = require('ajax-call').AjaxCallFactory();
  
  db.collection('users').findOne({_id: req.params.id}, function(err, doc) {
    if(err)
      return ajaxCall.sendUnhandledExceptionMessage(res, err);
    
    if(doc == null)
      return ajaxCall.sendErrorMessage(res, 404, 'User not found');
      
    return ajaxCall.sendValue(res, doc);
  });
});

```


The module ajax-call has four models of formatters:

- [AjaxCall](#ajaxcallmodel)
- [AjaxList](#ajaxlistmodel)
- [AjaxFormCall](#ajaxformcallmodel)
- [AjaxDataGrid](#ajaxdatagridmodel)


## AjaxCallModel
It is the main model, from which all other models inherit.

Returns the following structure:
```javascript
{
  code: 0, // a code of request
  success: true, // if the request was successful
  result: 0, // a result of request
  message: 'message', // an optional message
  value: {} // the payload of the response from the server
}
```

### Methods

#### send(res)
`res` is the express `res` object.

This method sends the payload in response, through the method `json` object `res` to express.

#### sendValue(res, value [, statusCode])
* `res` is the express `res` object.
* `value` is the `value` property sent in payload
* `statusCode` *optional* is the status code of the response. If not set, set the status code to `200`, `204` if `value` is empty object

Send the payload in response, setting the 'value' with the argument passed to the method.

#### sendErrorMessage(res, result, message)
* `res` is the express `res` object.
* `result` is the number of the error type *This will be set as the response statusCode*
* `message` is the message of the error

Send an error message to the client, setting the statusCode response.

#### sendUncaughtExceptionMessage(res, err)
* `res` is the express `res` object.
* `err` is the error object

Send an error message to the client, not caught by the server.   
The statusCode response will be automatically set as `500`.   
The message will automatically be set as `UncaughtException`.   
It also launched a log with status `fatal` (*see section log*)

#### sendUnhandledExceptionMessage(res, err)
* `res` is the express `res` object.
* `err` is the error object

Send an error message to the client, not handled by the server.   
The statusCode response will be automatically set as `501`.   
The message will automatically be set as `UnhandledException`.   
It also launched a log with status `error` (*see section log*)


## AjaxListModel
It adds an array of items to the response.

```javascript
app.get('/api/v1/users', function(req, res) {
  var ajaxList = require('ajax-call').AjaxListFactory();
  
  db.collection('users').find().toArray(function(err, docs) {
    if(err)
      return ajaxList.sendUnhandledExceptionMessage(res, err);
    
    if(docs == null)
      return ajaxList.sendValue(res, {});
    
    for(var i = 0, length = docs.length; i < length; i++) {
      var user = docs[i];
      delete user.password;
      
      ajaxList.addItem(user);
    }
    
    // use sendValue method for append other values
    return ajaxList.sendValue(res, 'users of my application');
  });
});

```

Returns the following structure:
```javascript
{
  code: 0, // a code of request
  success: true, // if the request was successful
  result: 0, // a result of request
  message: 'message', // an optional message
  value: {}, // the payload of the response from the server
  items: [], // the collection of items
  uniqueItems: [] // *optional* the collection of **unique** items
}
```

### Methods

#### addItem(item)
* `item` is the value pushed into array `items`

Add an element into array `items`

#### concatItems(...items)
* `items` are n ° arguments passed to this method that are concatenated to the element `items` sent in the response

An example can be found in [tests](test/test.ajax-list.es6#L60)

#### addUniqueItem(uniqueItem)
* `uniqueItem` is the value added into Set `uniqueItems`

Being 'uniqueItems' an instance of Set, the elements will be unique inside.   
**Pay attention to objects**:
```javascript
var a = {a: 1}, b = {a: 1};
a !== b // is true!
```


## AjaxFormCallModel
It formats the response by grouping errors for field

```javascript
app.post('/api/v1/users', function(req, res) {
  var ajaxFormCall = require('ajax-call').AjaxFormCallFactory();
  
  var fields = req.body;
  
  // validate data from req.body ex:
  if(fields.name == null || typeof fields.name !== 'string') {
    ajaxFormCall.addError('name', 'name fields is required');
  } else if(fields.name.length < 1 || fields.name.length > 30) {
    ajaxFormCall.addError('name', 'field name must be length between 1 and 30 characters');
  }
  if(fields.surname == null || typeof fields.surname !== 'string') {
    ajaxFormCall.addError('surname', 'surname fields is required');
  } else if(fields.surname.length < 1 || fields.surname.length > 30) {
   ajaxFormCall.addError('surname', 'field surname must be length between 1 and 30 characters');
  }
  // etc..
  
  if(ajaxFormCall.hasError())
    return ajaxFormCall.sendErrorMessage(res, 403, 'form not valid');
  
  
  db.collection('users').insert(fields, function(err, doc) {
    if(err)
      return ajaxList.sendUnhandledExceptionMessage(res, err);
    
    // use sendValue method for append other values
    return ajaxList.sendValue(res, 'form valid!');
    // in alternative use send method if you don't send any values
    return ajaxList.send(res);
  });
});

```

Returns the following structure:
```javascript
{
  code: 0, // a code of request
  success: true, // if the request was successful
  result: 0, // a result of request
  message: 'message', // an optional message
  value: {}, // the payload of the response from the server
  errrors: {}, // the collection of errors
  countErrors: 0 // the number of errors
}
```
An example of response with errors can be found in [tests](test/test.ajax-form-call.es6#L16)

### Methods

#### addError(name, error)
* `name` is the name of field
* `error` is the error message

Add an error in the `errors` object

#### hasError()

Return true if `countErrors` > 0



## AjaxDataGridModel
**This model inherits from [AjaxList](#ajaxlistmodel)**   
It formats the response by entering information relevant to pagination.

```javascript
app.get('/api/v1/users', function(req, res) {
  // you can initialize pagination info now or using reInit method
  var ajaxDataGrid = require('ajax-call').AjaxDataGridFactory(
    totalItems, req.body.currentPage, totalPages, req.body.itemsPerPage
  });
  
  db.collection('users').find().toArray(function(err, docs) {
    if(err)
      return ajaxDataGrid.sendUnhandledExceptionMessage(res, err);
    
    if(docs == null)
      return ajaxDataGrid.sendValue(res, {});
    
    for(var i = 0, length = docs.length; i < length; i++) {
      var user = docs[i];
      delete user.password;
      
      ajaxDataGrid.addItem(user);
    }
    ajaxDataGrid.reInit(
      totalItems, req.body.currentPage, totalPages, req.body.itemsPerPage
    );
    
    // use sendValue method for append other values
    return ajaxList.sendValue(res, 'users of my application with pagination');
  });
});

```

Returns the following structure:
```javascript
{
  code: 0, // a code of request
  success: true, // if the request was successful
  result: 0, // a result of request
  message: 'message', // an optional message
  value: {}, // the payload of the response from the server
  items: [], // the collection of items
  uniqueItems: [], // *optional* the collection of **unique** items
  totalItems: 0, // the total items for pagination
  currentPage: 1, // the current page
  totalPages: 0, // total number of pages
  itemsPerPage: 10 // number of items per page
}
```

*You can configure a `itemsPerPage` default number. See section [config](#config) for more details.*

### Methods

#### reInit([totalItems=0, currentPage=1, totalPages=0, itemsPerPage=config.resultsPerPageDefault])
* `totalItems` is the total items for pagination
* `currentPage` is the current page
* `totalPages` is the total number of pages
* `itemsPerPage` is number of items per page (*default config.resultsPerPageDefault*)

Re-init information relevant to pagination.


setLogger
Config
------

You can configure a `itemsPerPage` default number and max number with global config.
Default number setted are:
* resultsPerPageDefault : 10
* resultsPerPageMax : 100

```javascript
var ajaxCallConfig = require('ajax-call').config;
ajaxCallConfig.resultsPerPageDefault = 20;
ajaxCallConfig.resultsPerPageMax = 50;
```


Logger
------

You can set the logging system used by the module when methods are called `sendUncaughtExceptionMessage` and `sendUnhandledExceptionMessage`   
For example [log4js](https://github.com/nomiddlename/log4js-node)   
By default, the module will use `console`

```javascript
var log4js = require('log4js');
log4js.configure({}); // config log4js
var logger = log4js.getLogger('main');
var ajaxCallLogger = require('ajax-call');

ajaxCallLogger.setLogger(logger);
```
