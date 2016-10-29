// Require d3
var d3 = require('d3')

class SAnimation {
  constructor (options) {
    this.element = options.element
    this.duration = options.duration
    this.states = Object.keys(options.paths)
    this.state = options.state
    this.paths = options.paths

    // Add play-button path
    d3.select(options.element)
      .append('path')
      .attr('class', 'play-button')
      .attr('d', this.paths[this.state])
      .attr('fill', 'var(--foreground)')
  }

  change (state) {
    console.log('Switching to', state)
    // Change state
    this.state = state

    // Modify play-button path
    d3.select(this.element.querySelector('.play-button'))
      .transition()
      .duration(this.duration)
      .attr('d', this.paths[this.state])
      .attr('fill', 'var(--foreground)')

    // Set class
    // this.element.className = this.state
  }
}

// Make the standard happy
window.Animation = SAnimation

module.exports = SAnimation
