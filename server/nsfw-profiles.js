const profiles = {
    default(predictions) {
        let credit = 2
        for (let index = 0; index < predictions.length; index++) {
            const prediction = predictions[index]
            if ((prediction.className === "Porn" && prediction.probability > 0.000999 )
                || (prediction.className === "Sexy" && prediction.probability > 0.7)) {
                    credit --
            }
        }   
        return credit < 1
    },

    // need calibration
    allowSexy(predictions) {
        for (let index = 0; index < predictions.length; index++) {
            const prediction = predictions[index]
            if (prediction.className === "Porn" && prediction.probability > 0.8) {
                    return true
            }
        }   
        return false
    }
}

module.exports = {profiles}