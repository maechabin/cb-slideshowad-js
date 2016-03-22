;(function ($, QUnit, window, document, undefined) {

  "use strict";

  QUnit.module("slideShowAd Defult", {
    beforeEach: function () {
      this.slideshowad = $(".image");
    }
  });

  QUnit.test('$.fn.slideShowAd()が読み込まれている', function (assert) {
    this.slideshowad.slideShowAd();
    assert.ok($.fn.slideShowAd, "Passed!!");
  });

  QUnit.test('兄弟要素のclass名が「cb-slideshow」になっている', function (assert) {
    this.slideshowad.slideShowAd();
    var elem = this.slideshowad.next();
    assert.equal(elem.attr('class'), 'cb-slideshow', 'Passed!!');
  });

  QUnit.test('兄弟要素の子要素のサイズが一番最初の画像サイズと一致する', function (assert) {
    this.slideshowad.slideShowAd();
    var elem = this.slideshowad.next();
    var child1 = elem.children().eq(0);
    var child2 = elem.children().eq(1);
    var img = this.slideshowad.find('a').eq(0).find('img').eq(0);
    assert.equal(img.attr('width'), child1.width(), 'Passed!!');
    assert.equal(img.attr('height'), child1.height(), 'Passed!!');
    assert.equal(img.attr('width'), child2.width(), 'Passed!!');
    assert.equal(img.attr('height'), child2.height(), 'Passed!!');
  });

  QUnit.test('1000ms後のプラグインで生成した飛び先の画像/URLが、HTMLで指定した2番目の広告の画像/URLと一致する', function (assert) {
    this.slideshowad.slideShowAd();
    var _this = this;
    var img1 = 'url(\"' + this.slideshowad.find('a').eq(0).find('img').eq(0).attr('src') + '\")';
    var link1 = this.slideshowad.find('a').eq(0).attr('href');
    var elem = $('.cb-slideshow');
    var img2 = elem.children().eq(0).css('background-image');
    var link2 = elem.attr('data');
    setTimeout(function () {
      var img3 = elem.children().eq(0).css('background-image');
      var link3 = elem.attr('data');
      assert.equal(img1, img3, 'Passed!!');
      assert.equal(link1, link3, 'Passed!!');
    }, 1000);
      assert.equal(img1, img2, 'Passed!!');
      assert.equal(link1, link2, 'Passed!!');
  });

  QUnit.test('6000ms後のプラグインで生成した飛び先の画像/URLが、HTMLで指定した2番目の広告の画像/URLと一致する', function (assert) {
    this.slideshowad.slideShowAd();
    var _this = this;
    var img1 = 'url(\"' + this.slideshowad.find('a').eq(1).find('img').eq(0).attr('src') + '\")';
    var link1 = this.slideshowad.find('a').eq(1).attr('href');
    var elem = $('.cb-slideshow');
    var img2 = elem.children().eq(1).css('background-image');
    var link2 = elem.attr('data');
    setTimeout(function () {
      var img3 = elem.children().eq(1).css('background-image');
      var link3 = elem.attr('data');
      assert.equal(img1, img3, 'Passed!!');
      assert.equal(link1, link3, 'Passed!!');
    }, 6000);
      assert.equal(img1, img2, 'Passed!!');
      assert.notEqual(link1, link2, 'Passed!!');
  });

} (jQuery, QUnit, window, document));
