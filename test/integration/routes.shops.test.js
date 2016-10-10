process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/server/app');
const knex = require('../../src/server/db/connection');

describe('routes : shops', () => {

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

  describe('GET /shops', () => {
    it('should be the home page', (done) => {
      chai.request(server)
      .get('/shops')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('text/html');
        res.text.should.contain('<title>Donut Tycoon - home</title>');
        res.text.should.contain(
          '<a class="navbar-brand" href="/shops">Donut Tycoon</a>');
        done();
      });
    });
    it('should list all of the shops', (done) => {
      chai.request(server)
      .get('/shops')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('text/html');
        res.text.should.contain('<h1>All shops</h1>');
        res.text.should.contain('Fluffy Fresh Donuts');
        res.text.should.contain('Jelly Donut');
        res.text.should.contain('Happy Donuts');
        done();
      });
    });
    it('should contain a "Add new shop" button to /shops/new', (done) => {
      chai.request(server)
      .get('/shops')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('text/html');
        res.text.should.contain(
          '<a href="/shops/new" class="btn btn-primary">Add new shop</a>');
        done();
      });
    });
    it('should contain links to the shop show page', (done) => {
      return knex('shops').where('name', 'Jelly Donut').first()
      .then((shop) => {
        chai.request(server)
        .get('/shops')
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('text/html');
          res.text.should.contain(
            `<td><a href="/shops/${shop.id}/show">Jelly Donut</a></td>`);
          done();
        });
      });
    });
    it('should have buttons to the shop edit and delete routes', (done) => {
      return knex('shops').where('name', 'Jelly Donut').first()
      .then((shop) => {
        chai.request(server)
        .get('/shops')
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('text/html');
          res.text.should.contain(`<a href="/shops/${shop.id}/edit" class="btn btn-xs btn-warning">Update</a>`);
          res.text.should.contain(`<td><form method="post" action="/shops/1/delete"><button class="btn btn-xs btn-danger">Delete</button></form></td>`);
          done();
        });
      });
    });
  });

  describe('GET /shops/new', () => {
    it('should have a form for adding a new shop', (done) => {
      chai.request(server)
      .get('/shops/new')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.text.should.contain('<h1>New shop</h1>');
        res.type.should.eql('text/html');
        res.text.should.contain('<title>Donut Tycoon - new shop</title>');
        res.text.should.contain(
          '<a class="navbar-brand" href="/shops">Donut Tycoon</a>');
        res.text.should.contain('<form method="post" action="/shops">');
        res.text.should.contain('<label for="name">Name</label>');
        res.text.should.contain('<label for="city">City</label>');
        done();
      });
    });
  });

  describe('POST /shops', () => {
    it('should add a new shop and redirect to /shops', (done) => {
      return knex('shops').select('*')
      .then((shops) => {
        chai.request(server)
        .post('/shops')
        .send({name: 'Donut Test', city: 'Detroit'})
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(1);
          res.status.should.eql(200);
          res.type.should.eql('text/html');
          res.text.should.contain('<title>Donut Tycoon - home</title>');
          res.text.should.contain(
            '<a class="navbar-brand" href="/shops">Donut Tycoon</a>');
          res.text.should.contain('Donut Tycoon');
          return knex('shops').select('*')
          .then((results) => {
            results.length.should.eql(shops.length + 1);
            done();
          });
        });
      });
    });
  });

  describe('GET /shops/:id/edit', () => {
    it('should have a form for adding a new shop', (done) => {
      return knex('shops').where('name', 'Jelly Donut').first()
      .then((shop) => {
        chai.request(server)
        .get(`/shops/${shop.id}/edit`)
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.text.should.contain('<h1>Update shop</h1>');
          res.type.should.eql('text/html');
          res.text.should.contain('<title>Donut Tycoon - update shop</title>');
          res.text.should.contain(
            '<a class="navbar-brand" href="/shops">Donut Tycoon</a>');
          res.text.should.contain('<form method="post" action="/shops/edit">');
          res.text.should.contain('<label for="name">Name</label>');
          res.text.should.contain('<label for="city">City</label>');
          res.text.should.contain(
            `<input type="hidden" name="id" value="${shop.id}" required>`);
          done();
        });
      });
    });
  });

  describe('POST /shops/edit', () => {
    it('should update a shop and redirect to /shops', (done) => {
      return knex('shops').where('name', 'Jelly Donut').first()
      .then((shop) => {
        chai.request(server)
        .post('/shops/edit')
        .send({id: shop.id, name: 'Jelly Donut Update', city: 'New York'})
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(1);
          res.status.should.eql(200);
          res.type.should.eql('text/html');
          res.text.should.contain('<title>Donut Tycoon - home</title>');
          res.text.should.contain(
            '<a class="navbar-brand" href="/shops">Donut Tycoon</a>');
          res.text.should.contain('Jelly Donut Update');
          return knex('shops').where('id', shop.id).first()
          .then((results) => {
            results.name.should.eql('Jelly Donut Update');
            done();
          });
        });
      });
    });
  });

  describe('GET /shops/:id/show', () => {
    it('should show shop details including donuts and employees', (done) => {
      return knex('shops').where('name', 'Jelly Donut').first()
      .then((shop) => {
        chai.request(server)
        .get(`/shops/${shop.id}/show`)
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.text.should.contain(`<h1>${shop.name}</h1>`);
          res.type.should.eql('text/html');
          res.text.should.contain(
            `<title>Donut Tycoon - ${shop.name}</title>`);
          res.text.should.contain(
            '<a class="navbar-brand" href="/shops">Donut Tycoon</a>');
          res.text.should.contain(`<p>City: ${shop.city}</p>`);
          res.text.should.contain(`<p>City: ${shop.city}</p>`);
          res.text.should.contain('Pot Hole');
          res.text.should.contain('Chuckles');
          res.text.should.contain('Bacon Maple Bar');
          res.text.should.contain('Stephanie MacGyver');
          res.text.should.contain('Roger Wisoky');
          done();
        });
      });
    });
  });

  describe('POST /shops/:id/delete', () => {
    it('should delete a shop and redirect to /shops', (done) => {
      return knex('shops').where('name', 'Jelly Donut').first()
      .then((shop) => {
        chai.request(server)
        .post(`/shops/${shop.id}/delete`)
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(1);
          res.status.should.eql(200);
          res.type.should.eql('text/html');
          res.text.should.contain('<title>Donut Tycoon - home</title>');
          res.text.should.contain(
            '<a class="navbar-brand" href="/shops">Donut Tycoon</a>');
          res.text.should.not.contain('Jelly Donut');
          return knex('shops').where('id', shop.id)
          .then((results) => {
            results.length.should.eql(0);
            return knex('employees').where('shop_id', shop.id);
          })
          .then((shops) => {
            done();
            shops.length.should.eql(0);
          });
        });
      });
    });
  });

});
