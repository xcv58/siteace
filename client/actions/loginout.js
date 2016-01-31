export default {
  login({Meteor, FlowRouter}) {
    Meteor.lock.show();
  },

  logout({Meteor, FlowRouter}) {
    Meteor.logout();
  },
};
