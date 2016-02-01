import WebsiteList from '../components/websitelist/index.jsx';
import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('websites.list').ready()) {
    const websites = Collections.Websites.find().fetch();
    onData(null, {websites});
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
