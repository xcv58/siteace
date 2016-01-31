import Navigation from '../components/navigation/index.jsx';
import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';

export const composer = ({context}, onData) => {
  const {Meteor} = context();
  if (Meteor.subscribe('users').ready()) {
    const user = Meteor.users.findOne();
    onData(null, {user});
  }
};

export const depsMapper = (context, actions) => ({
  login: actions.loginout.login,
  logout: actions.loginout.logout,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Navigation);
