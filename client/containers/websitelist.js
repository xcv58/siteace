import WebsiteList from '../components/websitelist/index.jsx';
import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('websites.list').ready()) {
    const websites = Collections.Websites.find().fetch();
    websites.sort((a, b) => {
      const upvote = b.upvotes.length - a.upvotes.length;
      if (upvote === 0) {
        return a.downvotes.length - b.downvotes.length;
      } else {
        return upvote;
      }
    });
    const duration = 1000;
    onData(null, {websites, duration});
  }
};

export const depsMapper = (context, actions) => ({
  upvote: actions.updownvote.upvote,
  downvote: actions.updownvote.downvote,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(WebsiteList);
