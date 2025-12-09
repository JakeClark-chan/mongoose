/* eslint-disable no-plusplus, no-bitwise, no-mixed-operators */
const jsonFile = require('../listofcolors.json')
const checkType = require('./utils/CheckType')

/** Get Random Color
 * Get ramdon color from list of colors
 * @param {string} type Type of color to get HEX or RGB
 * @returns {string} Color HEX or RGB
 */
module.exports = (type) => {
    var cType = checkType(type)
    if (cType !== null){
    let k = 0;
    let n = 0;
    JSON.stringify(jsonFile, (key, value) => (key && ++n || value));
    n *= Math.random();
    JSON.stringify(jsonFile, (key, value) => (key && --n | 0 || (k = key) || value));
    return jsonFile[k][cType]
    }
}