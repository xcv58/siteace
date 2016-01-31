import React from 'react';

const Website = ({website}) => (
  <div>
    {website.saving ? <p>Saving...</p> : null}
    <h2>{website.url}</h2>
    <p>
      {website.desc}
    </p>
  </div>
);

export default Website;
