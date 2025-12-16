const jsonFile = require('../../listofcolors.json')
/** Get HEX
 * Gets HEX value for color on color list
 * @param {string} color name of color to get value for
 * @returns {string} Color
 * @deprecated use getColor()
 */
module.exports = (color) => {
    if(color !== undefined) {
        var colorname = color.toLowerCase()
        if (Object.prototype.hasOwnProperty.call(jsonFile, colorname)) return jsonFile[colorname]['HEX'];
        else throw new TypeError(`Color '${colorname}' does not exsist in list`)
    }
}