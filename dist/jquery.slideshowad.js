/**
* cb-slideshowad-js
+ @version v1.2.5
* @author Takanori Maeda (@maechabin)
* @license MIT license
*/
!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){(function(global){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_jquery="undefined"!=typeof window?window.$:"undefined"!=typeof global?global.$:null,SlideShowAd=(_interopRequireDefault(_jquery),function(){function SlideShowAd(element,options){_classCallCheck(this,SlideShowAd),this.element=element,this.$element=$(element),this.linkNumber=1,this.i=2,this.setTimer="",this.adImg=this.$element.find("a").eq(0).find("img").eq(0),this.displayImgFlag="div1",this.div1=$("<div>"),this.div2=$("<div>"),this.div3=$("<div>").attr("class","cb-slideshow"),this.link="",this.conf={},this.options=options,this.defaults={ad:[],width:"",height:"",zIndex:999,duration:1e3,interval:5e3,targetBlank:!1,slideShowType:"fade",backgroundColor:"#f5f5f5"}}return _createClass(SlideShowAd,[{key:"fadeImg",value:function(div){var _this2=this,d1="div1"===div?"div1":"div2",d2="div1"===div?"div2":"div1",d3=this.div3;this.link=this.conf.ad[this.linkNumber].url,d3.attr("data",this.link),this[d1].animate({opacity:0},this.conf.duration,function(){_this2[d1].css({"z-index":0,"background-image":"url("+_this2.conf.ad[_this2.i].img+")"}),_this2.linkNumber++,_this2.i++}),this[d2].css({"z-index":1}).animate({opacity:1},this.conf.duration),this.displayImgFlag=d2}},{key:"flipImg",value:function(div,r){var _this3=this,d1="div1"===div?"div1":"div2",d2="div1"===div?"div2":"div1",d3=this.div3,rotate="",deg="div1"===div?"180deg":"0deg";"X"===r&&(console.log(div),rotate="rotateX("+deg+")"),"Y"===r&&(rotate="rotateY("+deg+")"),this.link=this.conf.ad[this.linkNumber].url,d3.attr("data",this.link),d3.css({perspective:0,transition:"1s",transform:rotate,transformStyle:"preserve-3d"}),this[d2].css({transform:rotate}),setTimeout(function(){_this3[d1].css({"background-image":"url("+_this3.conf.ad[_this3.i].img+")",opacity:0}),_this3[d2].css("opacity",1),_this3.linkNumber++,_this3.i++,_this3.displayImgFlag=d2},300)}},{key:"changeImg",value:function(){switch(this.linkNumber>=this.conf.ad.length&&(this.linkNumber=0),this.i>=this.conf.ad.length&&(this.i=0),this.conf.slideShowType){case"fade":this.fadeImg(this.displayImgFlag);break;case"flipX":this.flipImg(this.displayImgFlag,"X");break;case"flipY":this.flipImg(this.displayImgFlag,"Y")}}},{key:"makeBg",value:function(){var div1DisplayStyle={},div2DisplayStyle={};"fade"===this.conf.slideShowType&&(div1DisplayStyle={"z-index":1},div2DisplayStyle={"z-index":0});var divStyle={"background-size":"contain","background-repeat":"no-repeat","background-color":this.conf.backgroundColor,position:"absolute",top:0,left:0,width:this.conf.width,height:this.conf.height},div1Style=$.extend({},div1DisplayStyle,{"background-image":"url("+this.conf.ad[0].img+")",opacity:1}),div2Style=$.extend({},div2DisplayStyle,{"background-image":"url("+this.conf.ad[1].img+")",opacity:0}),div3Style={"z-index":this.conf.zIndex,position:"relative",display:"inline-block",width:this.conf.width,height:this.conf.height,cursor:"pointer"};this.link=this.conf.ad[0].url,this.div1.css($.extend({},divStyle,div1Style)),this.div2.css($.extend({},divStyle,div2Style)),this.div3.append(this.div1,this.div2).css(div3Style).attr("data",this.link),this.$element.after(this.div3)}},{key:"preloadImg",value:function(){this.conf.ad.forEach(function(obj){var imgTag=document.createElement("img");imgTag.src=obj.img})}},{key:"getAd",value:function(){var _this=this;return _this.$element.find("a").each(function(){var $this=$(this),adObj={},img=$this.find("img").eq(0).attr("src")||"",url=$this.attr("href")||"",impimg=$this.children().eq(0).attr("src")||"";adObj={img:img,url:url,impimg:impimg},_this.defaults.ad.push(adObj)}),_this.ad}},{key:"getImgSize",value:function(){var imgSize={};if(this.adImg.attr("width")&&this.adImg.attr("height"))this.defaults.width=this.adImg.attr("width"),this.defaults.height=this.adImg.attr("height"),imgSize.width=this.defaults.width,imgSize.height=this.defaults.height;else{var imgObj=new Image;imgObj.src=img.attr("src"),this.defaults.width=imgObj.width,this.defaults.height=imgObj.height,imgSize.width=this.defaults.width,imgSize.height=this.defaults.height}return imgSize}},{key:"clickAd",value:function(){var _this4=this,elm=$(".cb-slideshow");elm.on("click",function(){_this4.conf.targetBlank?window.open(_this4.link):window.location.href=_this4.link})}},{key:"init",value:function(){var _this5=this;return this.getAd(),this.getImgSize(),this.conf=$.extend({},this.defaults,this.options),this.$element.css({display:"none",width:this.conf.width,height:this.conf.height}),this.makeBg(),this.conf.ad.length&&(this.preloadImg(),this.setTimer=setInterval(function(){_this5.changeImg()},this.conf.interval)),this.clickAd(),this}}]),SlideShowAd}());exports["default"]=SlideShowAd}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(require,module,exports){(function(global){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol?"symbol":typeof obj},_jquery="undefined"!=typeof window?window.$:"undefined"!=typeof global?global.$:null,_jquery2=_interopRequireDefault(_jquery),_SlideShowAd=require("./SlideShowAd"),_SlideShowAd2=_interopRequireDefault(_SlideShowAd);!function(factory){"object"===("undefined"==typeof module?"undefined":_typeof(module))&&"object"===_typeof(module.exports)?module.exports=factory("undefined"!=typeof window?window.$:"undefined"!=typeof global?global.$:null,require("SlideShowAd"),window,document):factory(_jquery2["default"],window,document)}(function($,window,document,undefined){$.extend($.fn,{slideShowAd:function(options){var _this=this;return this.each(function(){new _SlideShowAd2["default"](_this,options).init()})}})})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./SlideShowAd":1,SlideShowAd:1}]},{},[2]);
