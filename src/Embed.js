import React, { memo } from "react";
import Tuber from "react-tuber";

const style = { background: "black" };

export default memo(
  ({ video }) =>
    video &&
    (!video.includes("youtube.com") ? (
      <iframe allow="autoplay" title="embed" src={video} seamless />
    ) : (
      <Tuber style={style} aspect="16:9" autoplay={true} src={video} />
    ))
);
