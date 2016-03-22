# jquery-slideshowad-js

複数のバナー広告を組み合わせて`「スライドショー動画広告」`を実装するためのjQueryプラグイン。

## About

複数のバナー広告を組み合わせることによって、動画のように見せるスライドショー動画広告を手軽に実装できます。広告をリッチに見せることができ、広告のクリック率を向上させることができます。

主にアフィリエイトサービスの広告を使用することを想定しているので、アフィリエイトサービスからそのまま広告をコピーして実装できるようになっています。


## Demo

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

htmlファイル内にスライドショー動画広告を表示させる要素を作成し、任意のclassまたはid名を付けます。

```html
<div class="slideshowad-images">

</div>
```

### 3. スライドショーさせる広告を設定

上記で作成した要素内にスライドショーさせる広告タグ（リンク, 画像[, インプレッション用画像]）を貼り付けます。貼り付ける広告の数の制限はありません。

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

設定する広告タグは以下の形式（`img要素`を持った`a要素`）となります。a要素には必ずhref属性、img要素にはwidth属性、height属性を設定するようにしてください。インプレッションを計測するためのimg要素はあってもなくても問題ありません。
```html
<a href="http://example.com/">
  <img src="http://exapmle.com/example.png" width="300" height="200">
</a>
<img src="http://example.com/img.gif" width="1" height="1">
```

### 4. プラグインを実行

ステップ2で作成した要素に対して、`.slideShowAd()`メソッドを実行します。

```javascript
$('.slideshowad-images').slideShowAd();
```

## Option


## License

Mit License
