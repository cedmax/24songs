import React, { memo, useState, useCallback } from 'react';
import Calendar from './Calendar';
import Embed from './Embed';
import Modal from './Modal';

export default memo(({ data, year }) => {
  const [video, setVideo] = useState(null);
  const close = useCallback(() => setVideo(null), [setVideo]);
  return (
    <>
      {data.map((d, i) => (
        <Calendar key={year[i]} setVideo={setVideo} year={year[i]} data={d} />
      ))}
      <Modal close={close} isOpen={!!video}>
        <Embed video={video} />
      </Modal>
    </>
  );
});
