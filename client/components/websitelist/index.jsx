import React from 'react';

class Website extends React.Component {
  up() {
    const {website, actions: {upvote, downvote}} = this.props;
    upvote(website._id);
  }
  down() {
    const {website, actions: {upvote, downvote}} = this.props;
    downvote(website._id);
  }

  render() {
    const {website, Meteor, actions: {upvote, downvote}} = this.props;
    const {upvotes, downvotes} = website;
    const userId = Meteor.userId();
    const hasUpvote = upvotes.includes(userId)
    const hasDownvote = downvotes.includes(userId);
    return (
      <div className="col s12 l4">
        <div className="row center-align">
          <img src="https://pbs.twimg.com/profile_images/527039622434418688/uJPMDhZq.png" />
        </div>
        <div className="row">
          <a href={`/website/${website._id}`}>{website.url}</a>
        </div>
        <div className="row">
          <p>{website.desc}</p>
        </div>
        <div className="row">
          <div className="col s6">
            <button
              disabled={!userId}
              onClick={this.up.bind(this)} className="btn">
              Up
              {hasUpvote ? " yes " : null}
              <span> {upvotes.length}</span>
            </button>
          </div>
          <div className="col s6">
            <button
              disabled={!userId}
              onClick={this.down.bind(this)} className="btn">
              Down
              {hasDownvote ? " yes " : null}
              <span> {downvotes.length}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class WebsiteList extends React.Component {
  render() {
    const {upvote, downvote, websites, context} = this.props;
    const actions = {upvote, downvote};
    const {Meteor} = context();
    const list = websites.map(website =>
      <Website
        key={website._id}
        website={website}
        Meteor={Meteor}
        actions={actions}/>
    );
    return (
      <div className="row">
        {list}
      </div>
    );
  }
}

export default WebsiteList;
