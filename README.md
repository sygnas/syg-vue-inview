# syg-vue-inview
Vue用のIntersectionObserverなもの。


## Description
スクロールしてビューポートに入ったらdata属性を与える。

画面に入ったらエフェクトを加えたいけど、余計な機能は不要、cssは自分で書く、という人向け。

## Release

- 2019.11.14
  - とりあえず公開

## Usage

### Install

```sh
npm install --save @sygnas/vue-inview
```
### html / JS / css

```Vue
<div v-inview class="inview">foo</div>
```

```JavaScript
import VueInview from '@sygnas/vue-inview';

Vue.use(VueInview);
```

```Sass
.inview{
    opacity: 0;
    transform: translateY(20px);
    transition: .2s;

    // ビューポートに入ると data-inview属性が「true」になるので、
    // エレメントを表示させる
    &[data-inview = "true"]{
        opacity: 1;
        transform: translateY(0);
    }
}
```


## License
MIT