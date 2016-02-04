import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
    const numStyle = {"marginTop": margin, "marginBottom": margin};
    console.log(website);
    console.log(website.createdAt);

    return (
      <div className="col s12 l4 website-item">
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
          <div className="row col s10">
            <div className="col s12">
              <a href={`/website/${website._id}`}>{website.url}</a>
            </div>
            <div className="col s12">
              <p>{website.desc}</p>
            </div>
            <div className="col s12">
              <p>Created: {website.createdAt.toLocaleString()}</p>
            </div>
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
        <ReactCSSTransitionGroup transitionName="example"
        transitionAppear={true} transitionAppearTimeout={500}
        transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {list}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default WebsiteList;
