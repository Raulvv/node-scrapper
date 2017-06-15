const supertest = require("supertest");
const should    = require("should");
const server    = supertest.agent("http://localhost:1337");

describe('UserController', function() {

  it('should send an error 404 when random URL', function (done) {
    server.get("/api/losdag/list3223")
          .expect(404)
          .end((err,res) => {
            done();
          });
  });

  describe('#index()', function() {
    it('should send a message when database is empty', function (done) {
      User.destroy({}).exec( () => {});
      server.get("/api/log/list")
            .expect(200)
            .end((err,res) => {
              res.body.message.should.equal('There are no users');
              done();
            });
    });

    it('should send a json object when database is filled', function (done) {
      server.get("/api/log/list")
            .expect("Content-type",/json/)
            .expect(200)
            .end((err,res) => {
              done();
            });
    });

  });

  describe('#show()', function() {
    it('should add a new User to the database when first scrapped', (done) => {
      User.count().then( (count) => {
        server.get(`/api/user/Raulvvh`)
              .expect(200)
              .end( (res) => {
                User.count().then( (newCount) => {
                  should(count + 1 === newCount);
                  done();
                }).catch(err => done(err))
              })
      })
    });
    it('should update a User info when it was previously on the database', (done) => {
      User.count().then( (count) => {
        server.get(`/api/user/Raulvvh`)
              .expect(200)
              .end( (res) => {
                User.count().then( (newCount) => {
                  should(count === newCount);
                  done();
                }).catch(err => done(err))
              })
      })
    })

    it('should returns a 404 status when the twitter username doesn´t exist', (done) => {
      server.get('/api/user/fdiuv432hdfs')
            .expect(404)
            .end( (err,res) => {
              res.body.message.should.equal('The twitter username does not exist');
              done(err);
            });
    })
  });

});
