import Navigation from '../../containers/navigation';
import React from 'react';

const Layout = ({content = () => null }) => (
  <div>
    <header>
    <Navigation />
    </header>

    <div className="container">
      {content()}
    </div>

    <footer>
    <small>Built with <a href='https://github.com/kadirahq/mantra'>Mantra</a> & Meteor.</small>
    </footer>
  </div>
);

export default Layout;
