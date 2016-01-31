import {Websites} from '/libs/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

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
  }
});
