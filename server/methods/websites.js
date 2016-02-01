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

Meteor.methods({
  'websites.create'(_id, url, desc) {
    check(_id, String);
    check(url, String);
    check(desc, String);

    // Show the latency compensations
    Meteor._sleepForMs(500);

    // XXX: Do some user authorization
    const createdAt = new Date();
    const website = {
      _id, url, desc, createdAt
    };
    Websites.insert(website);
  },
  'websites.upvote'(websiteId) {
    console.log('server upvote');
    Meteor._sleepForMs(2000);
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
