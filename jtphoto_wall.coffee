"use strict"



define 'jtPhotoWall', ['jquery', 'underscore'], (require, exports) ->
  $ = require 'jquery'
  _ = require 'underscore'
  randomAnimate = (items, outerWidth, outerHeight) ->
    animateOptionsList = [
      {
        left : -outerWidth
      }
      {
        left : outerWidth
      }
      {
        top : outerHeight
      }
      {
        top : -outerHeight
      }
    ]
    animateItems = _.sample items, 10
    max = animateOptionsList.length
    _.each animateItems, (item, i) ->
      item = $ item
      if !item.data 'hidden'
        tmpAnimateOptions = animateOptionsList[_.random(0, max)]
        item.data 'hidden', true
      else
        item.data 'hidden', false
        tmpAnimateOptions = 
          left : 0
          top : 0
      item.delay(i * 100).animate tmpAnimateOptions

  init = (items, interval = 6000) ->
    lastItem = items.filter ':last-child'
    outerWidth = lastItem.outerWidth()
    outerHeight = lastItem.outerHeight()
    timer = null
    start = ->
      clearTimeout timer if timer
      timer = setTimeout ->
        timer = null
        randomAnimate items, outerWidth, outerHeight
        start()
      , 6 * 1000
      null
    start()

  exports.init = init
  return