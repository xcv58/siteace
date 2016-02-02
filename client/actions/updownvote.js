export default {
  upvote({Meteor}, websiteId) {
    console.log("upvote");
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
    console.log("downvote");
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
