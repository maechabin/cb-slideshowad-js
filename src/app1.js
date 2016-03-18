var jQuery = require("jquery");
var assign = require("object-assign");

((factory) => {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory(require("jquery"), window, document);
  } else {
    factory(jQuery, window, document);
  }
}) (($, window, document, undefined) => {

  class SlideShowAd {

    constructor(element, options) {
      this.element = element;
      this.$element = $(element);
      this.i = 2;
      this.setTimer = "";
      this.displayImgFlag = "div1";
      this.div1 = $("<div>");
      this.div2 = $("<div>");
      this.div3 = $("<div>");
      this.conf = {};
      this.options = options;
      this.defaults = {
        ad: [],
        width: "300px",
        height: "250px",
        zindex: 999,
        duration: 1000,
        interval: 3000
      };
    }

    animateImg(div) {
      let d1 = (div === "div1") ? "div2" : "div1";
      let d2 = (div === "div1") ? "div1" : "div2";
      let self = this;

      this[d2].animate({
        "opacity": 0
      }, this.conf.duration, () => {
        self[d2].css({
          "z-index": 0,
          "background-image": "url(" + self.conf.ad[self.i].img + ")"
        });
        self.i++;
      });
      this[d1].css({
        "z-index": 1
      }).animate({
        "opacity": 1
      }, this.conf.duration);
      this.displayImgFlag = d1;
    }

    changeImg() {
      if (this.i >= this.conf.ad.length) {
        this.i = 0;
      }
      this.animateImg(this.displayImgFlag);
    }

    makeBg() {
      let divStyle = {
        "position": "absolute",
        "top": 0,
        "left": 0,
        "width": this.conf.width,
        "height": this.conf.height,
      };
      let div1Style = {
        "z-index": 1,
        "opacity": 1,
        "background-image": "url(" + this.conf.ad[0].img + ")"
      };
      let div2Style = {
        "z-index": 0,
        "opacity": 0,
        "background-image": "url(" + this.conf.ad[1].img + ")"
      };

      this.div3.css({
        "z-index": this.conf.zindex,
        "position": "relative",
        "width": this.conf.width,
        "height": this.conf.height,
        "background-color": this.conf.background
      });
      this.div1.css(assign({}, divStyle, div1Style));
      this.div2.css(assign({}, divStyle, div2Style));
      this.div3.append(this.div1, this.div2);
      this.$element.after(this.div3);
    }

    preloadImg() {
      this.conf.ad.forEach((obj) => {
        let imgTag = document.createElement("img");
        imgTag.src = obj.img;
      });
    }

    getAd() {
      let _this = this;
      this.$element.find('a').each(function () {
        let $this = $(this);
        let adObj = {};
        let img = $this.find('img').attr('src');
        let url = $this.attr('href');
        adObj.img = img;
        adObj.url = url;
        _this.conf.ad.push(adObj);
      });
      return _this.ad;
    }

    init() {
      this.conf = assign({}, this.defaults, this.options);
      this.getAd();
      this.makeBg();
      if (this.conf.ad.length) {
        let timer;
        this.preloadImg();
        this.setTimer = setInterval(() => {
          this.changeImg();
        }, this.conf.interval);
      }
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
