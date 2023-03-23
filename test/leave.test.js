const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert ;
const request = require('supertest');
const {app,db} = require('../index');
const leaveModel = require('../src/models/leave');

let token ;
describe('Leave Api', function() {

    before(function(done) {
        // login and set token in header
        leaveModel.destroy({ truncate : true, cascade: false, restartIdentity:true }).then(()=>{

            request(app)
                .post('/auth/login')
                .send({"email":"marajul2@enosisbd.com","password":"m12345"})
                .expect(200)
                .expect(function(res) {
                    assert(res.body.hasOwnProperty('data'), 'data is not defined');
                    assert.equal(res.body.status, 'success', 'status is not success');
                    token = res.body.data.token;
                })
                .end(function(err, res) {
                    if(err) return done(err);
                    done();
                } );

            });

           
    });

    it('Get All leave', function(done) {
        request(app)
        .get('/leave/all')
        .set('Cookie', `token=${token}`)
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

    it('Successful Create leave', function(done) {
        request(app)
        .post('/leave')
        .send({ "from": "2018-09-23", "to": "2018-09-24", "type": "sick", "reason": "personal", "emergencyContact": "+8801625077945" })
        .set('Cookie', `token=${token}`)
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

    it('Successful Create leave', function(done) {
        request(app)
        .post('/leave')
        .send({ "from": "2023-04-23", "to": "2023-09-28", "type": "sick", "reason": "personal", "emergencyContact": "+8801625077945" })
        .set('Cookie', `token=${token}`)
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

    it('Failed Create leave', function(done) {
        request(app)
        .post('/leave')
        .send({ "from": "2018-09-23", "to": "2018-09-24", "type": "sick", "reason": "personal", "emergencyContact": "+8801625077945" })
        .set('Cookie', `token=${token}`)
        .expect(400)
        .expect(function(res) {
            assert.equal(res.body.status, 'error', 'status is not success');
        })
        .end(function(err, res) {
            if (err) return done(err);
            done();
      });
    });

    it('Successful Update leave', function(done) {
        request(app)
        .put('/leave/1')
        .send({ "from": "2018-09-26", "to": "2018-09-28", "type": "sick", "reason": "personal", "emergencyContact": "+8801625077945" })
        .set('Cookie', `token=${token}`)
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

    it('Successful delete leave', function(done) {
        request(app)
        .delete('/leave/1')
        .set('Cookie', `token=${token}`)
        .expect(200)
        .expect(function(res) {
            assert.equal(res.body.status, 'success', 'status is not success');
        })
        .end(function(err, res) {
            if (err) return done(err);
            done();
      });
    });

  


});
