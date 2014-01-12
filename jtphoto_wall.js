(function() {
  "use strict";

  define('jtPhotoWall', ['jquery', 'underscore'], function(require, exports) {
    var $, init, randomAnimate, _;
    $ = require('jquery');
    _ = require('underscore');
    randomAnimate = function(items, outerWidth, outerHeight) {
      var animateItems, animateOptionsList, max;
      animateOptionsList = [
        {
          left: -outerWidth
        }, {
          left: outerWidth
        }, {
          top: outerHeight
        }, {
          top: -outerHeight
        }
      ];
      animateItems = _.sample(items, 10);
      max = animateOptionsList.length;
      return _.each(animateItems, function(item, i) {
        var tmpAnimateOptions;
        item = $(item);
        if (!item.data('hidden')) {
          tmpAnimateOptions = animateOptionsList[_.random(0, max)];
          item.data('hidden', true);
        } else {
          item.data('hidden', false);
          tmpAnimateOptions = {
            left: 0,
            top: 0
          };
        }
        return item.delay(i * 100).animate(tmpAnimateOptions);
      });
    };
    init = function(items, interval) {
      var lastItem, outerHeight, outerWidth, start, timer;
      if (interval == null) {
        interval = 6000;
      }
      lastItem = items.filter(':last-child');
      outerWidth = lastItem.outerWidth();
      outerHeight = lastItem.outerHeight();
      timer = null;
      start = function() {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(function() {
          timer = null;
          randomAnimate(items, outerWidth, outerHeight);
          return start();
        }, 6 * 1000);
        return null;
      };
      return start();
    };
    exports.init = init;
  });

}).call(this);
