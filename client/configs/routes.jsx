import React from 'react';
import {injectDeps} from 'react-simple-di';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';

import MainLayout from '../components/layouts.main/index.jsx';
import WebsiteList from '../containers/websitelist';
import Website from '../containers/website';
import NewWebsite from '../containers/newwebsite';

export const initRoutes = (context, actions) => {
  const MainLayoutCtx = injectDeps(context, actions)(MainLayout);

  // Move these as a module and call this from a main file
  FlowRouter.route('/', {
    name: 'websites.list',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<WebsiteList />)
      });
    }
  });

  FlowRouter.route('/website/:websiteId', {
    name: 'websites.single',
    action({websiteId}) {
      mount(MainLayoutCtx, {
        content: () => (<Website websiteId={websiteId}/>)
      });
    }
  });

  FlowRouter.route('/new-website', {
    name: 'newwebsite',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NewWebsite/>)
      });
    }
  });
};
