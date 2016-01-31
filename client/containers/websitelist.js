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

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(WebsiteList);
