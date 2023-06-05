import { useCallback, useEffect, useRef } from "react";
import useResizeObserver from "use-resize-observer";

// import throttle from "lodash/throttle";

// const THROTTLE_INTERVAL = 16;

const useStickySidebar = ({ targetRef }) => {
  const sidebarRef = targetRef;
  const lastScrollY = useRef(0);
  const lastSidebarHeight = useRef(0);

  const attachSidebarToTheTop = useCallback(() => {
    const sidebar = sidebarRef.current;

    sidebar.style.position = "sticky";
    sidebar.style.top = "0px";
  }, [sidebarRef]);

  const attachSidebarToTheBottom = useCallback(() => {
    const sidebar = sidebarRef.current;

    const { innerHeight } = window;

    sidebar.style.position = "sticky";
    const top = innerHeight - sidebar.offsetHeight;
    sidebar.style.top = `${top}px`;
  }, [sidebarRef]);

  const makeSidebarScroll = useCallback(
    (diff = 0) => {
      const sidebar = sidebarRef.current;

      const stickySidebarOffsetTop = sidebar.offsetTop;

      sidebar.style.position = "relative";
      const offset =
        stickySidebarOffsetTop - diff - sidebar.parentElement?.offsetTop;

      sidebar.style.top = `${offset}px`;
    },
    [sidebarRef]
  );

  const fixSidebarOverflow = () => {
    const sidebar = sidebarRef.current;

    if (!sidebar || !sidebar.parentElement) return;

    const parentOffset = sidebar.parentElement.getBoundingClientRect().bottom;
    const sidebarOffset = sidebar.getBoundingClientRect().bottom;

    const overflowDetected = sidebarOffset > parentOffset;

    if (overflowDetected) {
      const diff = sidebar.offsetHeight - lastSidebarHeight.current;
      makeSidebarScroll(diff);
    }

    lastSidebarHeight.current = sidebar.offsetHeight;
  };

  const calculateAndApplyPosition = useCallback(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const { pageYOffset, innerHeight } = window;

    const isSidebarTallerThanViewport = sidebar.offsetHeight >= innerHeight;

    const hasReachedSidebarEnd =
      sidebar.offsetTop + sidebar.offsetHeight <=
      Math.round(pageYOffset + innerHeight);

    const isScrollingDown = lastScrollY.current < pageYOffset;
    const isScrollingUp = !isScrollingDown;
    lastScrollY.current = pageYOffset;

    const hasReachedSidebarStartByScrollingUp =
      pageYOffset <= sidebar.offsetTop;

    if (!isSidebarTallerThanViewport) {
      attachSidebarToTheTop();

      return;
    }

    if (
      isSidebarTallerThanViewport &&
      hasReachedSidebarEnd &&
      isScrollingDown
    ) {
      attachSidebarToTheBottom();

      return;
    }

    if (
      isSidebarTallerThanViewport &&
      hasReachedSidebarStartByScrollingUp &&
      isScrollingUp
    ) {
      attachSidebarToTheTop();

      return;
    }

    if (isSidebarTallerThanViewport) {
      makeSidebarScroll();

      return;
    }
  }, [
    attachSidebarToTheBottom,
    attachSidebarToTheTop,
    makeSidebarScroll,
    sidebarRef,
  ]);

  useEffect(() => {
    // const throttledHandler = throttle(
    //   calculateAndApplyPosition,
    //   THROTTLE_INTERVAL
    // );

    window.addEventListener("scroll", calculateAndApplyPosition);

    return () => {
      window.removeEventListener("scroll", calculateAndApplyPosition);
    };
  }, [calculateAndApplyPosition, sidebarRef]);

  const onTargetResize = () => {
    fixSidebarOverflow();
  };

  useResizeObserver({
    ref: targetRef,
    onResize: onTargetResize,
    wait: 0,
  });
};

export default useStickySidebar;
