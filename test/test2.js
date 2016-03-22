;(function ($, QUnit, window, document, undefined) {

  "use strict";

  QUnit.module("slideShowAd Option", {
    beforeEach: function () {
      this.slideshowad = $(".image");
      this.slideshowad.slideShowAd({
        width: '300px',
        height: '250px',
        interval: 1000,
        zindex: 1000
      });
    }
  });

  QUnit.test('兄弟要素のz−indexの値がオプションで設定した値と一致する', function (assert) {
    var elem = $('.cb-slideshow');
    assert.equal(elem.css('z-index'), 1000, 'Passed!!');
  });

  QUnit.test('兄弟要素の子要素のサイズがオプションで設定したサイズと一致する', function (assert) {
    var elem = this.slideshowad.next();
    var child1 = elem.children().eq(0);
    var child2 = elem.children().eq(1);
    var img = this.slideshowad.find('a').eq(0).find('img').eq(0);
    assert.equal('300', child1.width(), 'Passed!!');
    assert.equal('250', child1.height(), 'Passed!!');
    assert.equal('300', child2.width(), 'Passed!!');
    assert.equal('250', child2.height(), 'Passed!!');
  });

  QUnit.test('2000ms後のプラグインで生成した飛び先の画像/URLが、プラグインで最初に生成された画像/URLと異なる', function (assert) {
    var _this = this;
    var img1 = 'url(\"' + this.slideshowad.find('a').eq(0).find('img').eq(0).attr('src') + '\")';
    var link1 = this.slideshowad.find('a').eq(0).attr('href');
    var elem = $('.cb-slideshow');
    var img2 = elem.children().eq(0).css('background-image');
    var link2 = elem.attr('data');
    setTimeout(function () {
      var img3 = elem.children().eq(1).css('background-image');
      var link3 = elem.attr('data');
      assert.notEqual(img2, img3, 'Passed!!');
      assert.notEqual(link2, link3, 'Passed!!');
    }, 2000);
      assert.equal(img1, img2, 'Passed!!');
      assert.equal(link1, link2, 'Passed!!');
  });

} (jQuery, QUnit, window, document));
