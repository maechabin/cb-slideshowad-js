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
      this.adImg = this.$element.find('a').eq(0).find('img').eq(0);
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
        zIndex: 999,
        duration: 1000,
        interval: 5000,
        targetBlank: false,
        backgroundColor: '#f5f5f5'
      };
    }

    animateImg(div) {
      let d1 = (div === 'div1') ? 'div2' : 'div1';
      let d2 = (div === 'div1') ? 'div1' : 'div2';
      let elm = $('.cb-slideshow');
      let _this = this;

      _this.link = this.conf.ad[_this.linkNumber].url;
      elm.attr('data', _this.link);
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
        'background-color': this.conf.backgroundColor,
        'position': 'absolute',
        'top': 0,
        'left': 0,
        'width': this.conf.width,
        'height': this.conf.height
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
      let div3Style = {
        'z-index': this.conf.zIndex,
        'position': 'relative',
        'display': 'inline-block',
        'width': this.conf.width,
        'height': this.conf.height,
        'cursor': 'pointer'
      };

      this.link = this.conf.ad[0].url;
      this.div1.css($.extend({}, divStyle, div1Style));
      this.div2.css($.extend({}, divStyle, div2Style));
      this.div3
        .append(this.div1, this.div2)
        .css(div3Style)
        .attr('data', this.link);
      this.$element.after(this.div3);
    }

    preloadImg() {
      this.conf.ad.forEach((obj) => {
        let imgTag = document.createElement('img');
        imgTag.src = obj.img;
        //imgTag.src = obj.impimg;
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
      let imgSize = {};
      if (this.adImg.attr('width') && this.adImg.attr('height')) {
        this.defaults.width = this.adImg.attr('width');
        this.defaults.height = this.adImg.attr('height');
        imgSize.width = this.defaults.width;
        imgSize.height = this.defaults.height;
      } else {
        let imgObj = new Image();
        imgObj.src = img.attr('src');
        this.defaults.width = imgObj.width;
        this.defaults.height = imgObj.height;
        imgSize.width = this.defaults.width;
        imgSize.height = this.defaults.height;
      }
      return imgSize;
    }

    clickAd() {
      let elm = $('.cb-slideshow');
      elm.on('click', () => {
        if (this.conf.targetBlank) {
          window.open(this.link);
        } else {
          window.location.href = this.link;
        }
      });
    }

    init() {
      this.getAd();
      this.getImgSize();
      this.conf = $.extend({}, this.defaults, this.options);
      this.$element.css({
        'display': 'none',
        'width': this.conf.width,
        'height': this.conf.height
      });
      this.makeBg();
      if (this.conf.ad.length) {
        this.preloadImg();
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
