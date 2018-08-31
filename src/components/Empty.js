import React from 'react';

import store from '../store/store';

export default () => {
  return (
    <div>
      <h3>Welcome, {store.getState().email}</h3>
      <hr style={{width: "75%", background: "#fff"}} />
      <h6>choose a post to read</h6>
    </div>
  );
}
