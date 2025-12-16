module.exports = (type) => {
    if (type !== undefined) {
        var ltype = type.toLowerCase()
        if (ltype === "hex") {
            return "HEX"
        } else
        if (ltype === "rgb") {
            return "RGB"
        } else return null
    } else {
        console.log("[EASY_COLOR][RANDOM_COLOR] TYPE not defined");
        return null
    }
}