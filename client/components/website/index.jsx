import React from 'react';
import ReactDisqusThread from 'react-disqus-thread';

class Comment extends React.Component {
    handleNewComment(comment) {
        console.log(comment.text);
    }
    componentDidMount() {
      const url = window.location.href;
      if (DISQUS) {
        DISQUS.reset({
          reload: true,
          config: function () {
            this.page.identifier = this.props.id;
            this.page.url = url;
          }
        });
      } else {
        // TODO: inject js file.
      }
    }
    render() {
      return (
        <div id="disqus_thread"></div>
      );
    }
}

const Website = ({website}) => (
  <div>
    {website.saving ? <p>Saving...</p> : null}
    <h3>{website.title}</h3>
    <p>
      {website.desc}
    </p>
    <a href={website.url}>{website.url}</a>
    <div className="container">
      <Comment id={website._id}/>
    </div>
  </div>
);

export default Website;
