/**
 * intersectionObserver を使って画面に入った時に data-inview="true" する。
 */

// 画面に入った時に書き換える属性
const ATTR_INVIEW = 'data-inview';

// intersectionObserverの初期値
const DEFAULT = {
  rootMargin: '-50px 0px',
  threshold: 0,
};


export default {
  install (Vue, options = {}) {

    const opt = Object.assign(DEFAULT, options);
    // intersectionObserverの登録オブジェクト
    let observer = null;

    Vue.directive('inview', {
      /**
       * NodeListに挿入されたら intersectionObserver を登録する
       */
      inserted(el, binding) {
        // v-inview="{rootMargin:'10px'}" のように指定されたオプションを使う
        const option = Object.assign(opt, binding.value);
        observer = new IntersectionObserver(observerCallback, option);
        observer.observe(el);
      },
      /**
       * NodeListから削除されたら observerから削除
       */
      unbind(el) {
        observer.unobserve(el);
      },
    });

    /**
     * IntersectionObserver に反応した時に実行
     */
    function observerCallback(entries, object) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        object.unobserve(entry.target);
        entry.target.setAttribute(ATTR_INVIEW, 'true');
      });
    }
  }
}
