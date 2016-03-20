var jQuery = require('jquery');

((factory) => {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(require('jquery'), window, document);
  } else {
    factory(jQuery, window, document);
  }
}) (($, window, document, undefined) => {

  class SlideShowAd {

    constructor(element, options) {
      this.element = element;
      this.$element = $(element);
      this.linkNumber = 1;
      this.i = 2;
      this.setTimer = '';
      this.displayImgFlag = 'div1';
      this.div1 = $('<div>');
      this.div2 = $('<div>');
      this.div3 = $('<div>').attr('class', 'cb-slideshow');
      this.link = '';
      this.conf = {};
      this.options = options;
      this.defaults = {
        ad: [],
        width: '',
        height: '',
        zindex: 999,
        duration: 1000,
        interval: 5000
      };
    }

    animateImg(div) {
      let d1 = (div === 'div1') ? 'div2' : 'div1';
      let d2 = (div === 'div1') ? 'div1' : 'div2';
      let _this = this;

      _this.link = this.conf.ad[_this.linkNumber].url;
      _this[d2].animate({
        'opacity': 0
      }, _this.conf.duration, () => {
        _this[d2].css({
          'z-index': 0,
          'background-image': `url(${_this.conf.ad[_this.i].img})`
        });
        _this.linkNumber++;
        _this.i++;
      });
      _this[d1].css({
        'z-index': 1
      }).animate({
        'opacity': 1
      }, _this.conf.duration);
      _this.displayImgFlag = d1;
    }

    changeImg() {
      if (this.linkNumber >= this.conf.ad.length) {
        this.linkNumber = 0;
      }
      if (this.i >= this.conf.ad.length) {
        this.i = 0;
      }
      this.animateImg(this.displayImgFlag);
    }

    makeBg() {
      let divStyle = {
        'background-size': 'contain',
        'background-repeat': 'no-repeat',
        'position': 'absolute',
        'top': 0,
        'left': 0,
        'width': this.conf.width,
        'height': this.conf.height,
        'cursor': 'pointer'
      };
      let div1Style = {
        'z-index': 1,
        'opacity': 1,
        'background-image': `url(${this.conf.ad[0].img})`
      };
      let div2Style = {
        'z-index': 0,
        'opacity': 0,
        'background-image': `url(${this.conf.ad[1].img})`
      };

      this.div3.css({
        'z-index': this.conf.zindex,
        'position': 'relative',
        'width': this.conf.width,
        'height': this.conf.height,
        'background-color': this.conf.background
      });
      this.div1.css($.extend({}, divStyle, div1Style));
      this.div2.css($.extend({}, divStyle, div2Style));
      this.div3.append(this.div1, this.div2);
      this.link = this.conf.ad[0].url;
      this.$element.after(this.div3);
    }

    preloadImg() {
      this.conf.ad.forEach((obj) => {
        let imgTag = document.createElement('img');
        imgTag.src = obj.img;
        imgTag.src = obj.impimg;
      });
    }

    getAd() {
      let _this = this;
      _this.$element.find('a').each(function () {
        let $this = $(this);
        let adObj = {};
        let img = $this.find('img').eq(0).attr('src') || '';
        let url = $this.attr('href') || '';
        let impimg = $this.children().eq(0).attr('src') || '';
        adObj　= {img, url, impimg};
        _this.defaults.ad.push(adObj);
      });
      return _this.ad;
    }

    getImgSize() {
      let _this = this;
      let img = _this.$element.find('a').find('img');
      img.each(function () {
        let $this = $(this);
        if ($this.attr('width') && $this.attr('height')) {
          _this.defaults.width = $this.attr('width');
          _this.defaults.height = $this.attr('height');
          return;
        }
      });
    }

    clickAd() {
      let elm = $('.cb-slideshow');
      elm.on('click', () => {
        window.open(this.link);
      });
    }

    init() {
      this.getAd();
      this.getImgSize();
      this.conf = $.extend({}, this.defaults, this.options);
      this.makeBg();
      if (this.conf.ad.length) {
        //this.preloadImg();
        this.setTimer = setInterval(() => {
          this.changeImg();
        }, this.conf.interval);
      }
      this.clickAd();
      return this;
    }

  }

  $.extend($.fn, {
    slideShowAd(options) {
      return this.each(() => {
        new SlideShowAd(this, options).init();
      });
    }
  });

});
