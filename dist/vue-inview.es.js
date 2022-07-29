const ATTR_INVIEW = "data-inview";
const DEFAULT = {
  rootMargin: "-50px 0px",
  threshold: 0
};
const VueInview = {
  install(app, options) {
    const opt = Object.assign(DEFAULT, options);
    let observer;
    const $_callback = (entries, observer2) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting)
          return;
        observer2.unobserve(entry.target);
        entry.target.setAttribute(ATTR_INVIEW, "true");
      });
    };
    app.directive("inview", {
      mounted(el, binding) {
        const option = Object.assign(opt, binding.value);
        observer = new IntersectionObserver($_callback, option);
        observer.observe(el);
      },
      unmounted(el) {
        observer.unobserve(el);
      }
    });
  }
};

export { VueInview };
//# sourceMappingURL=vue-inview.es.js.map
