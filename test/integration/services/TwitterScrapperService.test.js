const request  = require('supertest');
const should   = require('should');

describe('TwitterScrapperService', function() {

  describe('#scrapUser()', function() {

    // it('should save whithout errors if twitter username exist', (done) => {
    //   TwitterScrapperService.scrapUser('RaulvvH').then( (err, value) => {
    //     done();
    //   })
    // });

    it('should return an error if Twitter username does not exist', (done) => {
      TwitterScrapperService.scrapUser('RaulvvH').then( (err, value) => {
        should(err === "Wrong username");
        done();
      })
    });

  });

});
