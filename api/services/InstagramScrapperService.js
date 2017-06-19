const Xray = require('x-ray');
const xray = Xray();

module.exports = {

  scrapUser: function (username, done) {
    return new Promise( (resolve, reject) => {
      this.scrapStats(username).then( (stats) => {
        let user = stats.trim().split("  ")[0].replace('window._sharedData = ', '').replace(';', '');
        user = JSON.parse(user);

        let instagramUser = {
          username,
          following: user.entry_data.ProfilePage[0].user.follows.count,
          followers: user.entry_data.ProfilePage[0].user.followed_by.count,
          bio: user.entry_data.ProfilePage[0].user.biography,
          profileImagePath: user.entry_data.ProfilePage[0].user.profile_pic_url_hd,
          totalPosts: user.entry_data.ProfilePage[0].user.media.count
        }
        resolve(instagramUser);
      });
    });
  },

  scrapStats: (username) => {
    return new Promise( (resolve, reject) => {
      xray(`https://www.instagram.com/${username}`, "body")( (err, stats) => {
        if (err) {reject(err)}
        resolve(stats);
      })
    })
  }
}
