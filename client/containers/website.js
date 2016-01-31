import Website from '../components/website/index.jsx';
import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';

export const composer = ({context, websiteId}, onData) => {
  const {Meteor, Collections, Tracker} = context();

  Meteor.subscribe('websites.single', websiteId, () => {
    const website = Collections.Websites.findOne(websiteId);
    onData(null, {website});
  });

  // support latency compensation
  //  we don't need to invalidate tracker because of the
  //  data fetching from the cache.
  const websiteFromCache = Tracker.nonreactive(() => {
    return Collections.Websites.findOne(websiteId);
  });

  if (websiteFromCache) {
    onData(null, {website: websiteFromCache});
  } else {
    onData();
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Website);
