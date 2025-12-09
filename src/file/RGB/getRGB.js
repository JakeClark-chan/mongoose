const jsonFile = require('../../listofcolors.json')
/**
 * Gets RGB value for color on color list
 * @param {string} color name of color to get value for
 * @returns {string} Color
 * @deprecated use getColor()
 */
module.exports = (color) => {
    var colorname = color.toLowerCase()
    if (Object.prototype.hasOwnProperty.call(jsonFile, colorname)) return jsonFile[colorname]['RGB'];
    else return null;
}