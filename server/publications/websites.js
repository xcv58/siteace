import {Websites} from '/libs/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

Meteor.publish('websites.list', function () {
  const selector = {};
  const options = {
    fields: {_id: 1, desc: 1, url: 1, upvotes: 1, downvotes: 1, createdAt: 1},
    sort: {createdAt: -1},
    limit: 10
  };

  return Websites.find(selector, options);
});

Meteor.publish('websites.single', function (websiteId) {
  check(websiteId, String);
  const selector = {_id: websiteId};
  return Websites.find(selector);
});
