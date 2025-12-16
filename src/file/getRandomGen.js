const rgbHex = require('./utils/RGBtoHEX');
const checkType = require('./utils/CheckType')
function rValue(minv, maxv) {
    let min = Math.ceil(minv);
    let max = Math.floor(maxv);
    return Math.floor((Math.random() * (max - min)) + min);
}

function getRGB() {
    var R = rValue(0, 255)
    var G = rValue(0, 255)
    var B = rValue(0, 255)
    return [R, G, B]
}
/** Random Gen
 * Get randomly generated color
 * @param {string} type HEX or RGB
 * @returns {string} color HEX or RGB
 */
    module.exports = (type) => {
        var cType = checkType(type)
        if (cType !== null) {
            if (cType === "RGB") {
                return getRGB()
            }
            if (cType === "HEX") {
                let [R, G, B] = getRGB()
                return rgbHex(R, G, B)
            }
             if (cType === "ER") {
                let [R, G, B] = getRGB()
                return getER(R, G, B)
            }
        }
    }