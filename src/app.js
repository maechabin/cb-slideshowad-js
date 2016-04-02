import jQuery from 'jquery';
import SlideShowAd from './SlideShowAd';

((factory) => {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(require('jquery'), require('SlideShowAd'), window, document);
  } else {
    factory(jQuery, window, document);
  }
}) (($, window, document, undefined) => {
  $.extend($.fn, {
    slideShowAd(options) {
      return this.each(() => {
        new SlideShowAd(this, options).init();
      });
    }
  });
});
