import React, { memo } from "react";
import Tuber from "react-youtube";

export default memo(
  ({ video, playNext }) =>
    video &&
    (!video.includes("youtube.com") ? (
      <iframe allow="autoplay" title="embed" src={video} seamless />
    ) : (
      <Tuber
        onEnd={playNext}
        className="yt"
        opts={{
          playerVars: {
            autoplay: 1,
            controls: 1,
            iv_load_policy: 3,
            modestbranding: 1,
          },
        }}
        containerClassName="ytWrapper"
        videoId={video.replace("https://youtube.com/watch?v=", "")}
      />
    ))
);
