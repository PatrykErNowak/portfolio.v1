export const isMobileView = function () {
  return (
    window.navigator.userAgentData?.mobile ||
    window.matchMedia('(max-width: 768px)').matches
  );
};
