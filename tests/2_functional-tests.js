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

Browser.site = 'http://localhost:3000'; // Set the base URL for Zombie.js

suite('Functional Tests with Zombie.js', function () {
  this.timeout(5000);
  const browser = new Browser();

  suiteSetup(function (done) {
    browser.visit('/', done); // Navigate to the root page
  });
  suite('Headless browser', function () {
    test('should have a working "site" property', function() {
      assert.isNotNull(browser.site);
    });
  });

  suite('"Famous Italian Explorers" form', function () {
    // Test #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      browser
        .fill('surname', 'Colombo') // Use the ID selector for input
        .pressButton('#submit', function () { // Use the ID selector for the button
          // Assert the page response
          browser.assert.success(); // Status 200
          browser.assert.text('span#name', 'Cristoforo');
          browser.assert.text('span#surname', 'Colombo');
          browser.assert.elements('span#dates', 1); // Check element count
          done();
        });
    });

    // Test #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      browser
        .fill('surname', 'Vespucci') // Use the ID selector for input
        .pressButton('#submit', function () { // Use the ID selector for the button
          // Assert the page response
          browser.assert.success(); // Status 200
          browser.assert.text('span#name', 'Amerigo');
          browser.assert.text('span#surname', 'Vespucci');
          browser.assert.elements('span#dates', 1); // Check element count
          done();
        });
    });
  });
});
});





