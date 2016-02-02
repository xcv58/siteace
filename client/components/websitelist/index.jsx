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
    const upvoteStyle = upvotes.includes(userId) ? {
      "color": "#FF8B5A"
    } : {};
    const downvoteStyle = downvotes.includes(userId) ? {
      "color": "#958FFF"
    } : {};
    const margin = "-16px";
    const numStyle = {"margin-top": margin, "margin-bottom": margin};

    return (
      <div className="col s12 l4">
        <div className="row center-align">
          <img src="https://pbs.twimg.com/profile_images/527039622434418688/uJPMDhZq.png" />
        </div>
        <div className="row">
          <div className="col s2">
          <div className="row">
            <div className="col s12">
            <i onClick={this.up.bind(this)}
               style={upvoteStyle}
               className="waves-effect waves-light zmdi zmdi-chevron-up zmdi-hc-4x">
            </i>
            </div>
            <div className="col s12" style={numStyle}>
               <i style={upvoteStyle}>+{upvotes.length} </i>
               <i style={downvoteStyle}>-{downvotes.length}</i>
            </div>
            <div className="col s12">
            <i onClick={this.down.bind(this)}
               style={downvoteStyle}
               className="waves-effect waves-light zmdi zmdi-chevron-down zmdi-hc-4x">
            </i>
            </div>
          </div>
          </div>
          <div className="col s10">
            <a href={`/website/${website._id}`}>{website.url}</a>
          </div>
        </div>
        <div className="row">
          <p>{website.desc}</p>
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
