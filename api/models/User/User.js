const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
const TwitterScrapperService = require('../../services/TwitterScrapperService');
const InstagramScrapperService = require('../../services/InstagramScrapperService');

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    username:          String,
    followers:         Number,
    following:         Number,
    profileImagePath:  String,
    bio: {type:        String, default: "No bio"},
  }, {
    discriminatorKey: 'rs',
    timestamps: {createdAt: "date"}
})

const TwitterUserSchema = new Schema({
  totalTweets: Number
})

const InstagramUserSchema = new Schema({
  totalPosts: Number
})

UserSchema.set('toJSON', { getters: true });

const User          = mongoose.model('User', UserSchema);
const TwitterUser   = User.discriminator('twitter', TwitterUserSchema);
const InstagramUser = User.discriminator('instagram', InstagramUserSchema);

module.exports = {User, TwitterUser, InstagramUser};

module.exports.User.getListOfUsers = () => {
  return new Promise( (resolve, reject) => {
    User.find({}).exec((err, users) => {
      if (err) {return reject(err)};
      return resolve(users);
    });
  });
}

module.exports.User.addUser = (root, args) => {
  let username = args.username;
  return new Promise( (resolve, reject) => {
    switch (args.rs.toLowerCase()) {
      case "twitter":
        TwitterScrapperService.scrapUser(username).then( (user) => {
          if (user === "Wrong username") {
    				reject('The username does not exist');
    			}
    			let criteria = {};
          Object.assign(criteria, user);

          const options = {upsert: true, new: true, setDefaultsOnInsert: true};
          resolve(TwitterUser.findOneAndUpdate({username}, criteria, options));
        })
        break;
      case "instagram":
        InstagramScrapperService.scrapUser(username).then( (user) => {
          if (user === "Wrong username") {
    				reject('The username does not exist');
    			}
    			let criteria = {};
          Object.assign(criteria, user);

          const options = {upsert: true, new: true, setDefaultsOnInsert: true};
          resolve(InstagramUser.findOneAndUpdate({username}, criteria, options));
        })
        break;
    }
  });
};
