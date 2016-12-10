'use strict'

// Expose function
module.exports = {
  offset: (elem) => {
    let rect = elem.getBoundingClientRect()
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    }
  }
}
