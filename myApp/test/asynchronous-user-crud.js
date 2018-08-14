'use strict'

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server.js');
let util = require('util');

chai.should();
chai.use(chaiHttp);

/* user object */
let user = {
    name: null, // "test" + Math.floor((Math.random() * 20) + 1),
    password: "test123",
    email: "test@test.com"
}

before(done => {
    console.log('\n\n-----------------------\n--\n-- START TEST\n--\n-------------------------');
    done();
});

after(done => {
    console.log('\n\n-----------------------\n--\n-- END TEST\n--\n-------------------------');
    done();
});

/* asyn test */
describe('#Asynchronous user crud test', () => {
    it('get "users" record', done => {
        chai.request(server)
            .get('/users')
            .end(function (err, res) {
                if(err) done(err);

                done();
                console.log('status code: %s, users: %s',res.statusCode, res.body.length)
            });
    }).timeout(0);

    it('get "user by id" record', done => {
        chai.request(server)
            .get('/users/1')
            .end(function (err, res) {
                if(err) done(err);

                done();
                console.log('status code: %s, user: %s',res.statusCode, util.inspect(res.body, false, null))
            });
    }).timeout(0);

    it('get "user with query param id" record', done => {
        chai.request(server)
            .get('/users')
            .query({ name: 'test'})
            .end(function (err, res) {
                if(err) done(err);

                done();
                console.log('status code: %s, user: %s',res.statusCode, util.inspect(res.body, false, null))
            });
    }).timeout(0);

    it('save "user" record', done => {
        chai.request(server)
            .post('/users')
            .send(user)
            .then(res => {
                done();
                console.log('status code: %s, user saved with id: %s',res.statusCode, res.body.insertId)
            })
            .catch(err => {
                done(err);
            });
    }).timeout(0);
    
    it('update "user" record', done => {
        chai.request(server)
            .put('/users/2')
            .send({ email: 'new@test.com'})
            .then(res => {
                done();
                console.log('status code: %s, user updated: %s',res.statusCode, res.body.changedRows)
            })
            .catch(err => {
                done(err);
            });
    }).timeout(0);

    it('delete "user" record', done => {
        chai.request(server)
            .del('/users/5')
            .then(res => {
                done();
                console.log('status code: %s, user delete: %s',res.statusCode, res.body.affectedRows)
            })
            .catch(err => {
                done(err);
            });
    }).timeout(0);
})