'use strict'

// Require d3
const d3 = require('d3')

// SVGIcon class
class SVGIcon {
  constructor (options) {
    this.element = document.querySelector(options.element)
    this.duration = options.duration
    this.states = Object.keys(options.paths)
    this.state = options.state
    this.paths = options.paths

    // Add svg-icon path
    d3.select(options.element)
      .append('path')
      .attr('class', 'svg-icon')
      .attr('d', this.paths[this.state])
      .attr('fill', 'var(--foreground)')
  }

  change (state) {
    // Change state
    this.state = state

    // Modify svg-icon path
    d3.select(this.element.querySelector('.svg-icon'))
      .transition()
      .duration(this.duration)
      .attr('d', this.paths[this.state])
      .attr('fill', 'var(--foreground)')
  }
}

// Export Animation class
module.exports = SVGIcon
