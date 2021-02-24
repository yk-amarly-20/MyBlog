import React from "react";

export function Viewport(ref: React.RefObject<HTMLElement>) {
  const [isInViewport, setIsInViewport] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;

    if (element === null) return;

    const eventListener = () => {
      const isViewport = checkViewport(element);
      setIsInViewport(isInViewport);
    };

    window.addEventListener("scroll", eventListener);
    eventListener();

    return () => window.removeEventListener("scroll", eventListener);
  }, []);

  return isInViewport;
}

function checkViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const Height = window.innerHeight || document.documentElement.clientHeight;
  const Width = window.innerWidth || document.documentElement.clientWidth;

  return rect.top < Height && rect.left < Width && rect.bottom > 0 && rect.right > 0;
}
