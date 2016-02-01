export default {
  upvote({Meteor}, websiteId) {
    console.log("upvote");
    Meteor.call('websites.upvote', websiteId, (err) => {
      if (err) {
        console.log(err);
      }
    });
  },
  downvote({Meteor}, websiteId) {
    console.log("downvote");
    Meteor.call('websites.downvote', websiteId, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};
