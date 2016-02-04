import {Websites} from '/libs/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

Meteor.publish('websites.list', function () {
  const selector = {};
  const options = {
    sort: {createdAt: -1}
  };

  return Websites.find(selector, options);
});

Meteor.publish('websites.single', function (websiteId) {
  check(websiteId, String);
  const selector = {_id: websiteId};
  return Websites.find(selector);
});
