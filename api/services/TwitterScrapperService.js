const Xray = require('x-ray');
const xray = Xray();

module.exports = {

  scrapUser: function (username, done) {
    let stats = this.scrapStats(username);
    let bio   = this.scrapBio(username);

    return Promise.all([stats, bio]).then( (values) => {
      let stats = values[0].map( number => number.replace(/[(.|,)]/, ''))

      const user = {
        username,
        bio: values[1],
        totalTweets: stats[0],
        following: stats[1],
        followers: stats[2]
      }

      return user;
    }).catch( (reason) => {
      return "Wrong username";
    })
  },

  scrapStats: (username) => {
    return new Promise( (resolve, reject) => {
      xray(`https://twitter.com/${username}`, '.ProfileNav-list')( (err, stats) => {
        if (err) {reject(err)}
        let data = stats.match(/((\d+(\.\d*)?)|(\.\d+))/g);
        resolve(data);
      });
    })
  },

  scrapBio: (username) => {
    return new Promise( (resolve, reject) => {
      xray(`https://twitter.com/${username}`, '.ProfileHeaderCard-bio')( (err, bio) => {
        if (err) {reject(err)}
        resolve(bio);
      })
    })
  }
}
