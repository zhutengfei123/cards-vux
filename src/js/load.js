export const isBottom = (element, callback) => {
  element.addEventListener('scroll', () => {
    if (element.scrollTop + element.clientHeight >= element.scrollHeight && !this.loading) {
      callback();
    }
  });
};
