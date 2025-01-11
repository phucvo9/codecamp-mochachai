const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello?name=xy_z')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello xy_z');
          done();
        });
    });
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
      .request(server)
      .put('/travellers')
      /** send {surname: 'Colombo'} here **/
      .send({ surname: 'Colombo' })
      // .send({...})
      .end(function(err, res) {
        /** your tests here **/
        assert.equal(res.status, 200, 'response status should be 200');
        assert.equal(res.type, 'application/json', 'Response should be json');
        assert.equal(
          res.body.name,
          'Cristoforo',
          'res.body.name should be "Christoforo"'
        );
        assert.equal(
          res.body.surname,
          'Colombo',
          'res.body.surname should be "Colombo"'
        );
  

          done();
        });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
      .request(server)
      .put('/travellers')
      .send({ surname: 'da Verrazzano' })
      /** place your tests inside the callback **/
      .end(function(err, res) {
        assert.equal(res.status, 200, 'response status should be 200');
        assert.equal(res.type, 'application/json', 'Response should be json');
        assert.equal(res.body.name, 'Giovanni');
        assert.equal(res.body.surname, 'da Verrazzano');

      done();
    });
  });
});

const Browser = require('zombie');
// immediately after the Browser declaration, add your project URL to the site property of the variable:
// Browser.site = 'http://localhost:3000';

Browser.site="http://localhost:3000/"; 

//Then at the root level of the 'Functional Tests with Zombie.js' suite, instantiate a new instance of the Browser object with the following code:
//const browser = new Browser();
suite('Functional Tests with Zombie.js', function () {
  this.timeout(5000);
  const browser = new Browser();
// And use the suiteSetup hook to direct the browser to the / route with the following code:
//  suiteSetup(function(done) {
//    return browser.visit('/', done);
//  });
  suiteSetup(function(done) {
  return browser.visit('/', done);
});
// NOTE: I also tried using `return browser.visit('http://localhost:3000/', done);` just in case that did something, but no result

  suite('Headless browser', function () {
    test('should have a working "site" property', function() {
      assert.isNotNull(browser.site);
    });
  });
  
  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      // fill the form...
  // then submit it pressing 'submit' button.
  //
  // in the callback...
  // assert that status is OK 200
  // assert that the text inside the element 'span#name' is 'Cristoforo'
  // assert that the text inside the element 'span#surname' is 'Colombo'
  // assert that the element(s) 'span#dates' exist and their count is 1
  browser.fill('surname', 'Colombo').pressButton('submit', function() {
    /** YOUR TESTS HERE, Don't forget to remove assert.fail() **/

    // pressButton is Async.  Waits for the ajax call to complete...

    // assert that status is OK 200
    browser.assert.success();
    // assert that the text inside the element 'span#name' is 'Cristoforo'
    browser.assert.text('span#name', 'Cristoforo');
    // assert that the text inside the element 'span#surname' is 'Colombo'
    browser.assert.text('span#surname', 'Colombo');
    // assert that the element(s) 'span#dates' exist and their count is 1
    browser.assert.element('span#dates', 1);
      done();
    });
  });
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      assert.fail();

      done();
    });
  });
  });
});


