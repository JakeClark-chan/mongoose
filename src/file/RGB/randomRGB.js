const jsonFile = require('../../listofcolors.json')
/** Get Random HEX
 * Gets Random HEX value for color on color list
 * @deprecated use getRandomColor()
 */
module.exports = () => {
    let k = 0;
    let n = 0;
    JSON.stringify(jsonFile, (key, value) => (key && ++n || value));
    n *= Math.random();
    JSON.stringify(jsonFile, (key, value) => (key && --n | 0 || (k = key) || value));
    return jsonFile[k]['RGB']
}