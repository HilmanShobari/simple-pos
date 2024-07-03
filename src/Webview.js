// Webview.js

import React from 'react';

const Webview = ({ url }) => {
  return (
    <div style={{ height: '100vh' }}>
      <iframe src={url} title="Webview" width="100%" height="100%" style={{ border: 'none' }} />
    </div>
  );
};

export default Webview;
