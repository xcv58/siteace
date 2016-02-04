import {Websites} from '/libs/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

const checkLogin = () => {
  const userId = Meteor.userId();
  if (!userId) {
    throw new Meteor.Error(401, "Not login!");
  }
  return userId;
}

const checkWebsite = (websiteId) => {
  const selector = {_id: websiteId};
  const website = Websites.findOne(selector);
  if (!website) {
    throw new Meteor.Error(404, "Website not found!");
  }
  return website;
}

export default function () {
  Meteor.methods({
    'websites.create'({_id, url, desc, upvotes, downvotes, createdAt}) {
      check(_id, String);
      check(url, String);
      check(desc, String);
      check(upvotes, [String]);
      check(downvotes, [String]);
      check(createdAt, Date);

      const website = {
        _id, url, desc, upvotes, downvotes, createdAt,
        saving: true
      };

      Websites.insert(website);
    },
    'websites.upvote'(websiteId) {
      check(websiteId, String);
      const userId = checkLogin();
      const website = checkWebsite(websiteId);
      const {_id} = website;
      if (website.upvotes.indexOf(userId) !== -1) {
        Websites.update(_id, {$pull: {upvotes: userId}});
      } else {
        Websites.update(_id, {$push: {upvotes: userId}});
        Websites.update(_id, {$pull: {downvotes: userId}});
      }
    },
    'websites.downvote'(websiteId) {
      check(websiteId, String);
      const userId = checkLogin();
      const website = checkWebsite(websiteId);
      const {_id} = website;
      if (website.downvotes.indexOf(userId) !== -1) {
        Websites.update(_id, {$pull: {downvotes: userId}});
      } else {
        Websites.update(_id, {$push: {downvotes: userId}});
        Websites.update(_id, {$pull: {upvotes: userId}});
      }
    }
  });
}
