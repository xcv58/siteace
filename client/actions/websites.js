export default {
  create({Meteor, LocalState, FlowRouter}, url, desc, title) {
    if (!url || !desc) {
      return LocalState.set('SAVING_ERROR', 'Url & Description are required!');
    }

    LocalState.set('SAVING_ERROR', null);

    const _id = Meteor.uuid();
    // There is a method stub for this in the config/method_stubs
    // That's how we are doing latency compensation
    const createdAt = new Date();
    const [upvotes, downvotes] = [[], []];
    // TODO: add owner for website
    const website = {_id, title, url, desc, upvotes, downvotes, createdAt};
    Meteor.call('websites.create', website, (err) => {
      if (err) {
        return LocalState.set('SAVING_ERROR', err.message);
      }
    });
    FlowRouter.go(`/website/${_id}`);
  },

  clearErrors({LocalState}) {
    return LocalState.set('SAVING_ERROR', null);
  }
};
