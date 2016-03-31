(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jQuery = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

(function (factory) {
  if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = factory((typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null), window, document);
  } else {
    factory(jQuery, window, document);
  }
})(function ($, window, document, undefined) {
  var SlideShowAd = function () {
    function SlideShowAd(element, options) {
      _classCallCheck(this, SlideShowAd);

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
        slideShowType: 'fade',
        backgroundColor: '#f5f5f5'
      };
    }

    _createClass(SlideShowAd, [{
      key: 'fadeImg',
      value: function fadeImg(div) {
        var _this2 = this;

        var d1 = div === 'div1' ? 'div2' : 'div1';
        var d2 = div === 'div1' ? 'div1' : 'div2';
        var elm = $('.cb-slideshow');
        this.link = this.conf.ad[this.linkNumber].url;
        elm.attr('data', this.link);

        this[d2].animate({
          'opacity': 0
        }, this.conf.duration, function () {
          _this2[d2].css({
            'z-index': 0,
            'background-image': 'url(' + _this2.conf.ad[_this2.i].img + ')'
          });
          _this2.linkNumber++;
          _this2.i++;
        });
        this[d1].css({
          'z-index': 1
        }).animate({
          'opacity': 1
        }, this.conf.duration);
        this.displayImgFlag = d1;
      }
    }, {
      key: 'flipImg',
      value: function flipImg(div) {
        var _this3 = this;

        var d1 = div === 'div1' ? 'div2' : 'div1';
        var d2 = div === 'div1' ? 'div1' : 'div2';
        var elm = $('.cb-slideshow');
        this.link = this.conf.ad[this.linkNumber].url;
        elm.attr('data', this.link);
        var a = div === 'div1' ? '180deg' : '0deg';

        elm.css({
          'perspective': 0,
          'transition': '1s',
          'transform': 'rotateY(' + a + ')',
          'transformStyle': 'preserve-3d'
        });

        this[d1].css({
          'transform': 'rotateY(' + a + ')'
        });

        setTimeout(function () {
          _this3[d1].css('opacity', 1);
          _this3[d2].css({
            'background-image': 'url(' + _this3.conf.ad[_this3.i].img + ')',
            'opacity': 0
          });
          _this3.linkNumber++;
          _this3.i++;
          _this3.displayImgFlag = d1;
        }, 300);
      }
    }, {
      key: 'changeImg',
      value: function changeImg() {
        if (this.linkNumber >= this.conf.ad.length) {
          this.linkNumber = 0;
        }
        if (this.i >= this.conf.ad.length) {
          this.i = 0;
        }

        switch (this.conf.slideShowType) {
          case 'fade':
            this.fadeImg(this.displayImgFlag);
            break;
          case 'flip':
            this.flipImg(this.displayImgFlag);
            break;
          default:
            break;
        }
      }
    }, {
      key: 'makeBg',
      value: function makeBg() {
        var div1DisplayStyle = {};
        var div2DisplayStyle = {};
        if (this.conf.slideShowType === 'fade') {
          div1DisplayStyle = { 'z-index': 1 };
          div2DisplayStyle = { 'z-index': 0 };
        }
        var divStyle = {
          'background-size': 'contain',
          'background-repeat': 'no-repeat',
          'background-color': this.conf.backgroundColor,
          'position': 'absolute',
          'top': 0,
          'left': 0,
          'width': this.conf.width,
          'height': this.conf.height
        };
        var div1Style = $.extend({}, div1DisplayStyle, {
          'background-image': 'url(' + this.conf.ad[0].img + ')',
          'opacity': 1
        });
        var div2Style = $.extend({}, div2DisplayStyle, {
          'background-image': 'url(' + this.conf.ad[1].img + ')',
          'opacity': 0
        });
        var div3Style = {
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
        this.div3.append(this.div1, this.div2).css(div3Style).attr('data', this.link);
        this.$element.after(this.div3);
      }
    }, {
      key: 'preloadImg',
      value: function preloadImg() {
        this.conf.ad.forEach(function (obj) {
          var imgTag = document.createElement('img');
          imgTag.src = obj.img;
          //imgTag.src = obj.impimg;
        });
      }
    }, {
      key: 'getAd',
      value: function getAd() {
        var _this = this;
        _this.$element.find('a').each(function () {
          var $this = $(this);
          var adObj = {};
          var img = $this.find('img').eq(0).attr('src') || '';
          var url = $this.attr('href') || '';
          var impimg = $this.children().eq(0).attr('src') || '';
          adObj = { img: img, url: url, impimg: impimg };
          _this.defaults.ad.push(adObj);
        });
        return _this.ad;
      }
    }, {
      key: 'getImgSize',
      value: function getImgSize() {
        var imgSize = {};
        if (this.adImg.attr('width') && this.adImg.attr('height')) {
          this.defaults.width = this.adImg.attr('width');
          this.defaults.height = this.adImg.attr('height');
          imgSize.width = this.defaults.width;
          imgSize.height = this.defaults.height;
        } else {
          var imgObj = new Image();
          imgObj.src = img.attr('src');
          this.defaults.width = imgObj.width;
          this.defaults.height = imgObj.height;
          imgSize.width = this.defaults.width;
          imgSize.height = this.defaults.height;
        }
        return imgSize;
      }
    }, {
      key: 'clickAd',
      value: function clickAd() {
        var _this4 = this;

        var elm = $('.cb-slideshow');
        elm.on('click', function () {
          if (_this4.conf.targetBlank) {
            window.open(_this4.link);
          } else {
            window.location.href = _this4.link;
          }
        });
      }
    }, {
      key: 'init',
      value: function init() {
        var _this5 = this;

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
          this.setTimer = setInterval(function () {
            _this5.changeImg();
          }, this.conf.interval);
        }
        this.clickAd();
        return this;
      }
    }]);

    return SlideShowAd;
  }();

  $.extend($.fn, {
    slideShowAd: function slideShowAd(options) {
      var _this6 = this;

      return this.each(function () {
        new SlideShowAd(_this6, options).init();
      });
    }
  });
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
