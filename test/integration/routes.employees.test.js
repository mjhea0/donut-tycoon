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

});
