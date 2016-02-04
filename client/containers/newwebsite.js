import NewWebsite from '../components/newwebsite/index.jsx';
import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';

export const composer = ({context, clearErrors}, onData) => {

  const {LocalState, Meteor} = context();
  if (Meteor.subscribe('users').ready()) {
    const user = Meteor.users.findOne();
    const error = LocalState.get('SAVING_ERROR');
    onData(null, {user, error});
  }

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  create: actions.websites.create,
  clearErrors: actions.websites.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NewWebsite);
