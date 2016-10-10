process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/server/app');
const knex = require('../../src/server/db/connection');

describe('routes : employees', () => {

  beforeEach((done) => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); })
    .then(() => { done(); });
  });

  afterEach((done) => {
    return knex.migrate.rollback()
    .then(() => { done(); });
  });

  describe('GET /employees', () => {
    it('should list all of the employees', (done) => {
      chai.request(server)
      .get('/employees')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('text/html');
        res.text.should.contain('<title>Donut Tycoon - employees</title>');
        res.text.should.contain(
          '<a class="navbar-brand" href="/shops">Donut Tycoon</a>');
        res.text.should.contain('<h1>All employees</h1>');
        res.text.should.contain('MacGyver');
        res.text.should.contain('Walker');
        res.text.should.contain('Wisoky');
        done();
      });
    });
    it('should contain a "Add new employee" button to /employees/new',
    (done) => {
      chai.request(server)
      .get('/employees')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('text/html');
        res.text.should.contain(
          '<a href="/employees/new" class="btn btn-primary">Add new employee</a>');
        done();
      });
    });
    it('should contain links to the employee show page', (done) => {
      return knex('employees').where('last_name', 'Hessel').first()
      .then((employee) => {
        chai.request(server)
        .get('/employees')
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('text/html');
          res.text.should.contain(
            `<td><a href="/employees/${employee.id}/show">Hessel</a></td>`);
          done();
        });
      });
    });
    it('should have buttons to the employee edit and delete routes', (done) => {
      return knex('employees').where('last_name', 'Hessel').first()
      .then((employee) => {
        chai.request(server)
        .get('/employees')
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('text/html');
          res.text.should.contain(`<a href="/employees/${employee.id}/edit" class="btn btn-xs btn-warning">Update</a>`);
          res.text.should.contain(`<td><form method="post" action="/employees/${employee.id}/delete"><button class="btn btn-xs btn-danger">Delete</button></form></td>`);
          done();
        });
      });
    });
  });

  describe('GET /employees/new', () => {
    it('should have a form for adding a new employee', (done) => {
      chai.request(server)
      .get('/employees/new')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.text.should.contain('<h1>New employee</h1>');
        res.type.should.eql('text/html');
        res.text.should.contain('<title>Donut Tycoon - new employee</title>');
        res.text.should.contain('<form method="post" action="/employees">');
        res.text.should.contain('<label for="email">Email</label>');
        res.text.should.contain(
          '<label for="favorite_donut">Favorite Donut</label>');
        res.text.should.contain('Pot Hole');
        res.text.should.contain('Chuckles');
        res.text.should.contain('Bacon Maple Bar');
        res.text.should.contain('<label for="shop_id">Shop</label>');
        res.text.should.contain('Fluffy Fresh Donuts');
        res.text.should.contain('Jelly Donut');
        res.text.should.contain('Happy Donuts');
        done();
      });
    });
  });

  describe('POST /employees', () => {
    it('should add a new employee and redirect to /employees', (done) => {
      return Promise.all([
        knex('employees').select('*'),
        knex('donuts').select('id'),
        knex('shops').select('id')
      ])
      .then((res) => {
        const employees = res[0];
        chai.request(server)
        .post('/employees')
        .send({
          first_name: 'Micheal',
          last_name: 'Herman',
          email: 'michael@herman.com',
          favorite_donut: res[1][0].id,
          shop_id: res[2][0].id
        })
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(1);
          res.status.should.eql(200);
          res.type.should.eql('text/html');
          res.text.should.contain('<title>Donut Tycoon - employees</title>');
          res.text.should.contain(
            '<a class="navbar-brand" href="/shops">Donut Tycoon</a>');
          res.text.should.contain('<h1>All employees</h1>');
          res.text.should.contain('Herman');
          return knex('employees').select('*')
          .then((results) => {
            results.length.should.eql(employees.length + 1);
            done();
          });
        });
      });
    });
  });

});
