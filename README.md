# jquery-slideshowad-js

複数のバナー広告を組み合わせて`「スライドショー動画広告」`を実装するためのjQueryプラグイン。

## About

複数のバナー広告を組み合わせることによって、動画のように見せるスライドショー動画広告を手軽に実装できます。広告をリッチに見せることができ、広告のクリック率を向上させることができます。また静止画像では実現できなかった広告にストーリーを持たせるということが可能となり広告の訴求力を高めます。

主にアフィリエイトサービスの広告を使用することを想定しているので、アフィリエイトサービスからそのまま広告をコピーして実装できるようになっています。


## Demo

[http://jsrun.it/maechabin/sXti](http://jsrun.it/maechabin/sXti)

## Download

こちらのページから[ダウンロード](https://github.com/maechabin/jquery-slideShowAd-js/archive/master.zip)するか、`[git clone]`コマンドでローカルにコピーします。

```
$ git clone git@github.com:maechabin/jquery-slideShowAd-js.git 任意のディレクトリ名
```

機能の実装に使用するファイルは以下のjsファイルとなります。
- ./dist/jquery.slideshowad.js

## Usage

### 1. jQueryと当プラグインの読み込み

jQuery本体とdistディレクトリ内の「jquery.slideshowad.js」をページに読み込みます。

```html
<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="./dist/jquery.slideshowad.js"></script>
```

### 2. スライドショー動画広告を表示させる要素を準備

htmlファイル内にスライドショー動画広告を表示させる要素を作成し、任意のclass名またはid名を付けます。

```html
<div class="slideshowad-images">

</div>
```

作成した要素に対して、以下のスタイルを指定します。（ページ表示時に、設定した広告の画像が表示されるのを防ぐためです。）
```css
.slideshowad-images {
  display: none;
}
```

### 3. スライドショーさせる広告を設定

上記で作成した要素内にスライドショーさせる広告タグ（リンク, 画像[, インプレッション計測用画像]）を順に貼り付けます。貼り付けた順番にスライドショーが実行されます。貼り付ける広告の数に制限はありません。

```html
<div class="slideshowad-images">
  <!-- 1つ目の広告 -->
  <a href="http://example.com/">
    <img src="http://exapmle.com/example1.png" width="300" height="200">
  </a>
  <img src="http://example.com/img1.gif" width="1" height="1">
  <!-- 2つ目の広告 -->
  <a href="http://example.com/">
    <img src="http://exapmle.com/example2.png" width="300" height="200">
  </a>
  <img src="http://example.com/img2.gif" width="1" height="1">
  <!-- 3つ目の広告 -->
  <a href="http://example.com/">
    <img src="http://exapmle.com/example3.png" width="300" height="200">
  </a>
  <img src="http://example.com/img3.gif" width="1" height="1">
</div>
```

設定する広告タグは以下の形式（`img要素`を持った`a要素`）となります。a要素には必ずhref属性、img要素にはwidth属性、height属性を設定するようにしてください（width属性、height属性がない場合）。インプレッションを計測するためのimg要素はあってもなくても問題ありません。（多くのアフィリエイトサービスの広告タグは以下の形式となっていることが多いです）
```html
<!-- スライドショーの対象となる広告タグの形式 -->

<!-- 広告の飛び先URL（href属性必須） -->
<a href="http://example.com/">
    <!-- 広告の画像（width属性/height属性必須） -->
  <img src="http://exapmle.com/example.png" width="300" height="200">
</a>
<!-- インプレッション計測用のimg要素（任意） -->
<img src="http://example.com/img.gif" width="1" height="1">
```

### 4. プラグインを実行

ステップ2で作成した要素に対して、`.slideShowAd()`メソッドを実行します。

```javascript
$('.slideshowad-images').slideShowAd();
```

## Option

**width {String}**
スライドショー動画広告を表示させる要素の「幅」を指定します。CSSでwidthに指定できる値で指定します。デフォルト値は、1つ目の広告として貼り付けた画像のサイズの幅となります。

**height {String}**
スライドショー動画広告を表示させる要素の「高さ」を指定します。CSSでheightに指定できる値で指定します。デフォルト値は、1つ目の広告として貼り付けた画像のサイズの高さとなります。

**interval {Number}**
スライドショーの間隔を指定します。数値（単位はミリ秒)で指定します。デフォルト値は`5000`（5秒）。


オプションの指定方法は以下の通りです。slideShowAd()メソッドの引数にオブジェクトリテラル形式でオプションを指定します。
```javascript
// 幅300px、高さ250px、スライドショーの間隔を8秒に設定
$('.slideshowad-images').slideShowAd({
  'width': '300px',
  'height': '250px',
  'interval': '8000'
});
```

## 対応ASP（アフィリエイトサービス）一覧

そのまま管理画面から広告タグをコピーして使えるアフィリエイトサービスの一覧です（調査中）。

[A8.net](http://px.a8.net/svt/ejp?a8mat=2BYLM2+1C85JU+0K+10H0IQ) / [Moba8.net](http://px.moba8.net/svt/ejp?a8mat=2BU3YH+AFOK9M+3NY+6HU7L&guid=on) / [リンクシェア](http://www.linkshare.ne.jp/scland/mgm/?id=69Bb10/Y2MU) / [TGアフィリエイト](https://www.trafficgate.net/) / [Amazonアソシエイト](https://affiliate.amazon.co.jp/gp/associates/network/main.html)


## License

Mit License
