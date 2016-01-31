import {Websites} from '/libs/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'websites.create'(_id, url, desc) {
      check(_id, String);
      check(url, String);
      check(desc, String);

      const createdAt = new Date();
      const website = {
        _id, url, desc, createdAt,
        saving: true
      };
      Websites.insert(website);
    }
  });
}
