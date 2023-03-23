const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert ;
const request = require('supertest');
const {app,db} = require('../index');
const userModel = require('../src/models/user');

describe('Login Api', function() {

  before (function(done) {
    userModel.destroy({where:{}}).then(()=>{
      done();
    }).catch((err)=>{
      done(err);
    });
  });

  it('Successfull Register',function(done) {
    // const qres = await db.sync({force:true});
    request(app)
      .post('/auth/register')
      .send({ "firstName": "marajul", "lastName": "Khan", "email": "marajul2@enosisbd.com", "designation": "Software Engineer", "dateOfBirth": "1996-11-15T18:00:00.000Z", "supervisor": "Shadatul Hakim", "password": "m12345" })
      .expect(200)
      .expect(function(res) {
        assert(res.body.hasOwnProperty('data'), 'data is not defined');
        assert.equal(res.body.status, 'success', 'status is not success');
      })
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
});
 
  it('Successfull Login', function(done) {
    request(app)
      .post('/auth/login')
      .send({"email":"marajul2@enosisbd.com","password":"m12345"})
      .expect(200)
      .expect(function(res) {
        assert(res.body.hasOwnProperty('data'), 'data is not defined');
        assert.equal(res.body.status, 'success', 'status is not success');
      })
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('Unsuccessfull Login', function(done) {
    request(app)
      .post('/auth/login')
      .send({"email":"marajul2@enosisbd.com","password":"m123456"})
      .expect(400)
      .expect(function(res) {
        assert.equal(res.body.status, 'error', 'status is not failed');
      })
      .end(function(err, res) {
        if (err) return done(err);
        done();
      })
  })

 
});
