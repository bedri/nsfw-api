const profiles = {
    
    /**
     * @param {Array} predictions 
     * @returns {boolean}
     */
    default(predictions) {
        return this.loose(predictions)
    },

    /**
     * Solid filter to catch nudity strictly. Side-effect: Possibly filters some clean images also.
     * @param {Array} predictions 
     * @returns {boolean}
     */
    strict(predictions) {
        const processedPredictions = {}

        for (let index = 0; index < predictions.length; index++) {
            processedPredictions[predictions[index].className.toLowerCase()] = predictions[index].probability
        }
    
        return processedPredictions.porn > 0.000999
    },

    /**
     * It will catch porn images but may allow mild nudity.
     * @param {Array} predictions 
     * @returns {boolean}
     */
    loose(predictions) {
        const processedPredictions = {}
    
        for (let index = 0; index < predictions.length; index++) {
            processedPredictions[predictions[index].className.toLowerCase()] = predictions[index].probability
        }

        return processedPredictions.neutral < 0.8 && processedPredictions.porn > 0.09
    },
}

module.exports = {profiles}