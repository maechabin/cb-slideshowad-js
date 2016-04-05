import jQuery from 'jquery';
export default class SlideShowAd {

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
      slideShowType: 'fade',
      backgroundColor: '#f5f5f5'
    };
  }

  fadeImg(div) {
    let d1 = (div === 'div1') ? 'div1' : 'div2';
    let d2 = (div === 'div1') ? 'div2' : 'div1';
    let d3 = this.div3;
    this.link = this.conf.ad[this.linkNumber].url;
    d3.attr('data', this.link);

    this[d1].animate({
      'opacity': 0
    }, this.conf.duration, () => {
      this[d1].css({
        'z-index': 0,
        'background-image': `url(${this.conf.ad[this.i].img})`
      });
      this.linkNumber++;
      this.i++;
    });
    this[d2].css({
      'z-index': 1
    }).animate({
      'opacity': 1
    }, this.conf.duration);
    this.displayImgFlag = d2;
  }

  flipImg(div, r) {
    let d1 = (div === 'div1') ? 'div1' : 'div2';
    let d2 = (div === 'div1') ? 'div2' : 'div1';
    let d3 = this.div3;
    let rotate = '';
    let deg = (div === 'div1') ? '180deg' : '0deg';
    if (r === 'X') {
      rotate = `rotateX(${deg})`;
    }
    if (r === 'Y') {
      rotate = `rotateY(${deg})`;
    }
    this.link = this.conf.ad[this.linkNumber].url;
    d3.attr('data', this.link);

    d3.css({
      'perspective': 0,
      'transition': '1s',
      'transform': rotate,
      'transformStyle': 'preserve-3d'
    });

    this[d2].css({
      'transform': rotate,
    });

    setTimeout(() => {
      this[d1].css({
        'background-image': `url(${this.conf.ad[this.i].img})`,
        'opacity': 0
      });
      this[d2].css('opacity', 1);
      this.linkNumber++;
      this.i++;
      this.displayImgFlag = d2;
    }, 300);
  }

  slideImg(div, d) {
    let d1 = (div === 'div1') ? 'div1' : 'div2';
    let d2 = (div === 'div1') ? 'div2' : 'div1';
    let d3 = this.div3;
    let direction = d;
    let directionValue = '';
    if (d === 'left' || d === 'right') {
      directionValue = this.conf.width;
    }
    if (d === 'top' || d === 'bottom') {
      directionValue = this.conf.height;
    }
    this.link = this.conf.ad[this.linkNumber].url;
    this[d1].css({
      'top': 'auto',
      'left': 'auto',
      [direction]: 0,
    });
    this[d2].css({
      'top': 'auto',
      'left': 'auto',
      [direction]: `-${directionValue}px`,
      'opacity': 1
    });

    this[d1].stop().animate({
      [direction]: `${directionValue}px`
    }, 1000, () => {
      this[d1].css({
        'background-image': `url(${this.conf.ad[this.i].img})`
      });
      this.linkNumber++;
      this.i++;
      this.displayImgFlag = d2;
    });
    this[d2].stop().animate({
      [direction]: 0
    }, 1000);
  }

  changeImg() {
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
      case 'flipX':
        this.flipImg(this.displayImgFlag, 'X');
        break;
      case 'flipY':
        this.flipImg(this.displayImgFlag, 'Y');
        break;
      case 'slideLeft':
        this.slideImg(this.displayImgFlag, 'left');
        break;
      case 'slideRight':
        this.slideImg(this.displayImgFlag, 'right');
        break;
      case 'slideTop':
        this.slideImg(this.displayImgFlag, 'top');
        break;
      case 'slideBottom':
        this.slideImg(this.displayImgFlag, 'bottom');
        break;
      default:
        break;
    }
  }

  makeBg() {
    let div1DisplayStyle = {};
    let div2DisplayStyle = {};
    if (this.conf.slideShowType === 'fade') {
      div1DisplayStyle = {'z-index': 1};
      div2DisplayStyle = {'z-index': 0};
    }
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
    let div1Style = $.extend({}, div1DisplayStyle, {
      'background-image': `url(${this.conf.ad[0].img})`,
      'opacity': 1
    });
    let div2Style = $.extend({}, div2DisplayStyle, {
      'background-image': `url(${this.conf.ad[1].img})`,
      'opacity': 0
    });
    let div3Style = {
      'z-index': this.conf.zIndex,
      'position': 'relative',
      'display': 'inline-block',
      'width': this.conf.width,
      'height': this.conf.height,
      'cursor': 'pointer',
      'overflow': 'hidden'
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
    this.div3.on('click', (e) => {
      e.preventDefault();
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
