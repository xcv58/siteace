import React from 'react';

const WebsiteList = ({websites}) => (
  <div>
    <ul>
      {websites.map(website => (
        <li key={website._id}>
          <a href={`/website/${website._id}`}>{website.url}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default WebsiteList;
