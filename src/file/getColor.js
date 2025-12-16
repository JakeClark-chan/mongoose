const jsonFile = require('../listofcolors.json')
const checkType = require('./utils/CheckType')

/** Get Color
 * Get color from list of colors
 * @param {string} type Type of color to get HEX or RGB
 * @param {string} color name of color get from here (https://github.com/Havoc925/DJS-Easy-Color/blob/master/test/colors.txt)
 * @returns {string} Color HEX or RGB
 */
module.exports = (type, color) => {
    var cType = checkType(type)
    if (cType !== null){
        var colorname = color.toLowerCase()
        if (Object.prototype.hasOwnProperty.call(jsonFile, colorname)) return jsonFile[colorname][cType];
        else return null;
    }
}
