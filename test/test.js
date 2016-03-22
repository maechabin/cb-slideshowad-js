;(function ($, QUnit, window, document, undefined) {

  "use strict";

  QUnit.module("ullscreen", {
    beforeEach: function () {
      this.slideshowad = $(".image");
    }
  });

  QUnit.test('$.fn.slideShowAd()が読み込まれているか', function (assert) {
    this.slideshowad.slideShowAd();
    assert.ok($.fn.slideShowAd, "Passed!!");
  });

  QUnit.test('兄弟要素のclass名が「cb-slideshow」になっているか', function (assert) {
    this.slideshowad.slideShowAd();
    var elem = this.slideshowad.next();
    assert.equal(elem.attr('class'), 'cb-slideshow', 'Passed!!');
  });

  QUnit.test('兄弟要素の子要素のサイズが一番最初の画像サイズと一致するか', function (assert) {
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

  QUnit.test('6000ms後の飛び先のURLが2番目の広告のURLと一致するか', function (assert) {
    this.slideshowad.slideShowAd();
    var _this = this;
    var link1 = this.slideshowad.find('a').eq(1).attr('href');
    var elem = $('.cb-slideshow');
    var link2 = '';
    var event = $.Event("click");
    setTimeout(function () {
      link2 = elem.attr('data');
      assert.equal(link1, link2, 'Passed!!');
    }, 6000);
      assert.notEqual(link1, link2, 'Passed!!');
  });

} (jQuery, QUnit, window, document));
