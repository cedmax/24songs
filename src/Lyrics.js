import React, { memo, useState, useCallback, useRef, useEffect } from "react";

const getDomainFromUrl = url => {
  const a = document.createElement("a");
  a.href = url;
  return a.hostname;
};

const text2html = data =>
  data.lyrics.replace(/\n/g, "<br />") +
  `<br/><br/>via <a target="_blank" rel="noopener noreferrer" href="${
    data.url
  }">${getDomainFromUrl(data.url)}</a><br/><br/>`;

export default memo(({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, 0);
    }
  }, [ref, data.lyrics]);

  const toggleOpen = useCallback(() => {
    setIsOpen(open => !open);
  }, []);

  const dontPropagate = useCallback(e => {
    e.stopPropagation();
  }, []);

  return (
    data.lyrics && (
      <div onClick={toggleOpen} className={`lyrics${isOpen ? " open" : ""}`}>
        <p
          onClick={dontPropagate}
          ref={ref}
          dangerouslySetInnerHTML={{ __html: text2html(data) }}
        />
      </div>
    )
  );
});
