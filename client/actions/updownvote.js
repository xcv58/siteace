export default {
  upvote({Meteor}, websiteId) {
    if (!Meteor.userId()) {
      return;
    }
    Meteor.call('websites.upvote', websiteId, (err) => {
      if (err) {
        console.log(err);
      }
    });
  },
  downvote({Meteor}, websiteId) {
    if (!Meteor.userId()) {
      return;
    }
    Meteor.call('websites.downvote', websiteId, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};
