'use strict'

// Requrie path
const path = require('path')

// Expose function
module.exports = (folder, ext = '.js') => {
  // Fix folder
  folder = path.join('../..', folder)

  // Get list of modules
  const modList = require(folder)

  // Create container for modules
  let mods = {}

  // Loop through each module name
  modList.forEach((modName) => {
    // Save module
    mods[modName] = require(path.join(folder, modName + ext))
  })

  // Return module container
  return mods
}
