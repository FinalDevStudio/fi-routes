# fi Routes
Routes loader for Node.js Express apps

## Installing

```
npm install --save fi-routes
```

## Usage
```js
var routes = require('fi-routes');
```

### Initialization
You must call it with your Express' application instance and a configuration object:

```js
var routes = require('fi-routes');
var express = require('express');

var app = express();

routes(app, config);

app.listen(0);
```

### Configuration
The configuration option can have the folloging properties:
- **basedir**: This is required and must be a `String`. This is the absolute path where the route modules are located.
- **debug**: This is optional and can be a `Function` to log into or a `Boolean`. If `true` it will use `console.log`.
- **arguments**: This is optional and can be an array of values you wish to pass to each route module after the router.

#### Example configuration
```js
{

  basedir: path.join(__basedir, 'routes'),

  debug: require('debug')('app:routes'),

  arguments: [
    require('mongoose')
  ]

}
```

### Route Modules
The route modules inside your `config.basedir` folder must be like this:

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

Folders are also respected, so if a socket module is located in `<...>/routes/api/resources.js` then its path will be `/api/resources` and if its file name is `index.js` inside that same folder then its path will be `/api`.

#### Important
As you can see, you can declare sub paths inside each route module so be aware of the order that routes are processed and double check not to mixup a declared route module path with a sub folder module name or path.
