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

  describe('GET /donuts/new', () => {
    it('should have a form for adding a new donut', (done) => {
      chai.request(server)
      .get('/donuts/new')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.text.should.contain('<h1>New donut</h1>');
        res.type.should.eql('text/html');
        res.text.should.contain('<title>Donut Tycoon - new donut</title>');
        res.text.should.contain('<form method="post" action="/donuts">');
        res.text.should.contain('<label for="name">Name</label>');
        res.text.should.contain('<label for="shop">Shop</label>');
        res.text.should.contain('Fluffy Fresh Donuts');
        res.text.should.contain('Jelly Donut');
        res.text.should.contain('Happy Donuts');
        done();
      });
    });
  });

  describe('POST /donuts', () => {
    it('should add a new donut and redirect to /donuts', (done) => {
      return Promise.all([
        knex('shops').where('name', 'Jelly Donut').first(),
        knex('donuts').select('*'),
        knex('shops_donuts').select('*')
      ])
      .then((res) => {
        const beforeDonuts = res[1].length;
        const beforeShopsDonuts = res[2].length;
        chai.request(server)
        .post('/donuts')
        .send({
          name: 'Test Donut',
          topping: 'Nothing much',
          price: 10,
          shop: res[0].id
        })
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(1);
          res.status.should.eql(200);
          res.type.should.eql('text/html');
          res.text.should.contain('<title>Donut Tycoon - donuts</title>');
          res.text.should.contain(
            '<a class="navbar-brand" href="/shops">Donut Tycoon</a>');
          res.text.should.contain('<h1>All donuts</h1>');
          res.text.should.contain('Test Donut');
          return knex('donuts').select('*')
          .then((results) => {
            results.length.should.eql(beforeDonuts + 1);
            return knex('shops_donuts').select('*');
          })
          .then((afterShopsDonuts) => {
            console.log(afterShopsDonuts);
            afterShopsDonuts.length.should.eql(beforeShopsDonuts + 1);
            done();
          });
        });
      });
    });
  });

});
