import React from "react";

function useScrollToUp() {
  const scrollToUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return scrollToUp();
}

export default useScrollToUp;
