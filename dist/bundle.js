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

    _createClass(SlideShowAd, [{
      key: 'animateImg',
      value: function animateImg(div) {
        var d1 = div === 'div1' ? 'div2' : 'div1';
        var d2 = div === 'div1' ? 'div1' : 'div2';
        var elm = $('.cb-slideshow');
        var _this = this;

        _this.link = this.conf.ad[_this.linkNumber].url;
        elm.attr('data', _this.link);
        _this[d2].animate({
          'opacity': 0
        }, _this.conf.duration, function () {
          _this[d2].css({
            'z-index': 0,
            'background-image': 'url(' + _this.conf.ad[_this.i].img + ')'
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
    }, {
      key: 'changeImg',
      value: function changeImg() {
        if (this.linkNumber >= this.conf.ad.length) {
          this.linkNumber = 0;
        }
        if (this.i >= this.conf.ad.length) {
          this.i = 0;
        }
        this.animateImg(this.displayImgFlag);
      }
    }, {
      key: 'makeBg',
      value: function makeBg() {
        var divStyle = {
          'background-size': 'contain',
          'background-repeat': 'no-repeat',
          'position': 'absolute',
          'top': 0,
          'left': 0,
          'width': this.conf.width,
          'height': this.conf.height,
          'cursor': 'pointer'
        };
        var div1Style = {
          'z-index': 1,
          'opacity': 1,
          'background-image': 'url(' + this.conf.ad[0].img + ')'
        };
        var div2Style = {
          'z-index': 0,
          'opacity': 0,
          'background-image': 'url(' + this.conf.ad[1].img + ')'
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
        this.div3.attr('data', this.link);
        this.$element.after(this.div3);
      }
    }, {
      key: 'preloadImg',
      value: function preloadImg() {
        this.conf.ad.forEach(function (obj) {
          var imgTag = document.createElement('img');
          imgTag.src = obj.img;
          imgTag.src = obj.impimg;
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
        var _this = this;
        var img = _this.$element.find('a').eq(0).find('img').eq(0);
        img.each(function () {
          var $this = $(this);
          if ($this.attr('width') && $this.attr('height')) {
            _this.defaults.width = $this.attr('width');
            _this.defaults.height = $this.attr('height');
            return;
          }
        });
      }
    }, {
      key: 'clickAd',
      value: function clickAd() {
        var _this2 = this;

        var elm = $('.cb-slideshow');
        elm.on('click', function () {
          window.open(_this2.link);
        });
      }
    }, {
      key: 'init',
      value: function init() {
        var _this3 = this;

        this.getAd();
        this.getImgSize();
        this.conf = $.extend({}, this.defaults, this.options);
        this.makeBg();
        if (this.conf.ad.length) {
          //this.preloadImg();
          this.setTimer = setInterval(function () {
            _this3.changeImg();
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
      var _this4 = this;

      return this.each(function () {
        new SlideShowAd(_this4, options).init();
      });
    }
  });
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
