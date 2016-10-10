process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/server/app');
const knex = require('../../src/server/db/connection');

describe('routes : donuts', () => {

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

  describe('GET /donuts', () => {
    it('should list all of the donuts', (done) => {
      chai.request(server)
      .get('/donuts')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('text/html');
        res.text.should.contain('<title>Donut Tycoon - donuts</title>');
        res.text.should.contain(
          '<a class="navbar-brand" href="/shops">Donut Tycoon</a>');
        res.text.should.contain('<h1>All donuts</h1>');
        res.text.should.contain('Pot Hole');
        res.text.should.contain('Chuckles');
        res.text.should.contain('Bacon Maple Bar');
        done();
      });
    });
    it('should contain a "Add new donut" button to /donuts/new',
    (done) => {
      chai.request(server)
      .get('/donuts')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('text/html');
        res.text.should.contain(
          '<a href="/donuts/new" class="btn btn-primary">Add new donut</a>');
        done();
      });
    });
    it('should contain links to the donut show page', (done) => {
      return knex('donuts').where('name', 'Chuckles').first()
      .then((donut) => {
        chai.request(server)
        .get('/donuts')
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('text/html');
          res.text.should.contain(
            `<td><a href="/donuts/${donut.id}/show">Chuckles</a></td>`);
          done();
        });
      });
    });
    it('should have buttons to the donut edit and delete routes', (done) => {
      return knex('donuts').where('name', 'Chuckles').first()
      .then((donut) => {
        chai.request(server)
        .get('/donuts')
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('text/html');
          res.text.should.contain(`<a href="/donuts/${donut.id}/edit" class="btn btn-xs btn-warning">Update</a>`);
          res.text.should.contain(`<td><form method="post" action="/donuts/${donut.id}/delete"><button class="btn btn-xs btn-danger">Delete</button></form></td>`);
          done();
        });
      });
    });
  });

});
