'use strict'

// Require SVGIcon class
const SVGIcon = require('./SVGIcon.class.js')

// IconContainer class
class IconContainer {
  constructor (icons) {
    this.iconOptions = icons
    this.icons = {}
  }

  _start () {
    for (var icon in this.iconOptions) {
      this[icon] = new SVGIcon(this.iconOptions[icon])
    }
  }
}

// Export IconContainer class
module.exports = IconContainer
