import React from 'react';
import validator from 'validator';

class NewWebsite extends React.Component {
  handelChange(event) {
    const url = event.target.value;
    this.setState({urlValid: validator.isURL(url)});
  }
  render() {
    const {error, user} = this.props;
    const {urlValid} = this.state || {urlValid: false};
    return (
      <div className="new-post">
        <h2>Add New Website</h2>
        {error ? <p style={{color: 'red'}}>{error}</p> : null}

        <input ref="titleRef"
        type="Text"
        disabled={!user}
        placeholder="Title" /> <br/>
        <input ref="urlRef"
        onChange={this.handelChange.bind(this)}
        type="Text"
        disabled={!user}
        placeholder="URL" /> <br/>
        <textarea ref="descRef"
        disabled={!user}
        className="materialize-textarea"
        placeholder="Description" /> <br/>
        <button onClick={this.createWebsite.bind(this)}
        disabled={!urlValid}
        className="waves-effect waves-light btn">Add New</button>
      </div>
    );
  }

  createWebsite() {
    const {create} = this.props;
    const {titleRef, urlRef, descRef} = this.refs;

    create(urlRef.value, descRef.value, titleRef.value);
  }
}

export default NewWebsite;
