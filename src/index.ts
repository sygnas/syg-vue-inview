/**
 * intersectionObserver を使って画面に入った時に data-inview="true" する。
 */
import { App } from "vue";

type TVueInviewOption = {
  rootMargin?: string;
  threshold?: number;
};

// 画面に入った時に書き換える属性
const ATTR_INVIEW = "data-inview";

// intersectionObserverの初期値
const DEFAULT: TVueInviewOption = {
  rootMargin: "-50px 0px",
  threshold: 0,
};

export const VueInview = {
  install(app: App, options: TVueInviewOption) {
    const opt = Object.assign(DEFAULT, options);
    // intersectionObserverの登録オブジェクト
    let observer: IntersectionObserver;

    /**
     * IntersectionObserver に反応した時に実行
     */
    const $_callback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        observer.unobserve(entry.target);
        entry.target.setAttribute(ATTR_INVIEW, "true");
      });
    };

    app.directive("inview", {
      /**
       * NodeListに挿入されたら intersectionObserver を登録する
       */
      mounted(el: Element, binding) {
        // v-inview="{rootMargin:'10px'}" のように指定されたオプションを使う
        const option = Object.assign(opt, binding.value);
        observer = new IntersectionObserver($_callback, option);
        observer.observe(el);
      },
      /**
       * NodeListから削除されたら observerから削除
       */
      unmounted(el: Element) {
        observer.unobserve(el);
      },
    });
  },
};
