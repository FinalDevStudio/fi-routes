# fi-seed-component-routes
Fi Seed's Routes component

## Installing

```
npm install --save fi-seed-component-routes
```

## Usage
### Use on fi-seed

```js
var sockets = component('routes');
```

### Use on Express/Node app

```js
var sockets = require('fi-seed-component-routes');
```

### Initialization
You must call it with your Express' application instance and a configuration object:

```js
var routes = require('fi-seed-component-routes');
var express = require('express');

var app = express();

routes(app, {
  basedir: path.join(__basedir, 'routes'),
  debug: require('debug')('app:routes'),
  arguments: [
    require('mongoose')
  ]
});

app.listen(0);
```

### Configuration
The configuration option can have the folloging properties:
- **basedir**: This is required and must be a `string`. This is the absolute path where the route modules are located.
- **debug**: This is optional and can be a `Function` to log into or a `Boolean`. If `true` it will use `console.log`.
- **arguments**: This is optional and can be an array of values you wish to pass to each route module after the router.

### Route Modules
The route modules inside your `routes` folder must be like this:

```js
module.exports = function (router) {

  router.get('/', function (req, res, next) {
    //...
  });

  router.post('/', function (req, res, next) {
    //...
  });

  router.get('/filtered', function (req, res, next) {
    //...
  });

};
```

The exported function will receive the `router` instance as created with `express.Router()` and the additional arguments. If the module's file name is `index.js` then its route will be `/` relative to its folder.

Folders are also respected, so if a socket module is located in `[...]/routes/api/resources.js` then its path will be `/api/resources` and if its file name is `index.js` inside that same folder then its path will be `/api`.

#### Important
As you can se, you can declare sub routes inside each route module so be aware of the order that routes are processed and be aware to not replace a declared route module path with a sub folder name.
