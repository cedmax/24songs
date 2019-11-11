import React, { memo } from 'react';

export default memo(({ children }) => (
  <div className="App">
    <div className="bk" />
    {children}
  </div>
));
