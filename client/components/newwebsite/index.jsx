import React from 'react';

class NewWebsite extends React.Component {
  render() {
    const {error, user} = this.props;
    return (
      <div className="new-post">
        <h2>Add New Post</h2>
        {error ? <p style={{color: 'red'}}>{error}</p> : null}

        <input ref="urlRef"
        type="Text"
        disabled={!user}
        placeholder="Enter website url." /> <br/>
        <textarea ref="descRef"
        disabled={!user}
        className="materialize-textarea"
        placeholder="Enter website description." /> <br/>
        <button onClick={this.createWebsite.bind(this)}
        className="waves-effect waves-light btn">Add New</button>
      </div>
    );
  }

  createWebsite() {
    const {create} = this.props;
    const {urlRef, descRef} = this.refs;

    create(urlRef.value, descRef.value);
  }
}

export default NewWebsite;
