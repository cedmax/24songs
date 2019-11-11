import React, { memo } from 'react';
import Tuber from 'react-tuber';

export default memo(({ video }) =>
  !video.includes('youtube.com') ? (
    <iframe allow="autoplay" title="embed" src={video} seamless />
  ) : (
    <Tuber aspect="16:9" autoplay={true} src={video} />
  )
);
