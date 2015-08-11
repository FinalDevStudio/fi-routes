'use strict';

var expect = require('chai').expect;
var request = require('request');
var routes = require('../');
var path = require('path');
var debug = console.log;

var host = 'http://localhost';
var text = 'Some useless text';

describe('Fi Seed Sockets', function () {
  before(function (done) {
    var bodyParser = require('body-parser');
    var express = require('express');

    var app = express();

    app.use(bodyParser.urlencoded({
      extended: false
    }));

    app.use(bodyParser.json());

    routes(app, {
      basedir: path.normalize(path.join(__dirname, 'routes')),
      arguments: [text],
      debug: true
    });

    var server = app.listen(0, function () {
      host = host + ':' + server.address().port;

      debug("Express app listening at %s", host);

      done();
    });
  });

  describe('object', function () {
    it('should be a function', function () {
      expect(routes).to.be.a('function');
    });
  });

  describe('client', function () {
    it('GET to "/" should respond a 200 status and [text]\'s value as body', function (done) {
      request.get(host, function (err, res, body) {
        expect(err).to.be.null;
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.equal(text);

        done();
      });
    });

    it('GET to "/users" should respond a 200 status and an empty Array as body', function (done) {
      request.get(host + '/users', function (err, res, body) {
        expect(err).to.be.null;
        expect(res.statusCode).to.equal(200);
        expect(JSON.parse(res.body)).to.be.an('array');

        done();
      });
    });

    it('POST to "/users/sign-in" with the right credentials should respond a 204 status and an empty body', function (done) {
      request.post({
        url: host + '/users/sign-in',
        form: {
          email: 'user@test.com',
          password: '1234'
        }
      }, function (err, res, body) {
        expect(err).to.be.null;
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.empty;

        done();
      });
    });

    it('POST to "/users/sign-in" with the wrong credentials should respond a 403 status and an empty body', function (done) {
      request.post({
        url: host + '/users/sign-in',
        form: {
          email: 'wrong@sowrong.com',
          password: 'wrogn, rwong, wrgon!'
        }
      }, function (err, res, body) {
        expect(err).to.be.null;
        expect(res.statusCode).to.equal(403);
        expect(res.body).to.be.empty;

        done();
      });
    });

    it('GET to "/users/profiles" should respond a 200 status and an empty Array as body', function (done) {
      request.get(host + '/users/profiles', function (err, res, body) {
        expect(err).to.be.null;
        expect(res.statusCode).to.equal(200);
        expect(JSON.parse(res.body)).to.be.an('array');

        done();
      });
    });

  });

});
