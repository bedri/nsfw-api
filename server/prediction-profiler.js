class PredictionProfiler {

    profileName
    #profiler
    #predictions
    #processedPredictions = {}

    constructor(profileName) {
        this.profileName = typeof this[profileName] === 'function'
            ? profileName
            : 'default'
            
        this.#profiler = this[this.profileName]

    }

    /**
     * Process profiling
     * @param {Array} predictions 
     * @returns {boolean}
     */
    apply(predictions) {
        this.#predictions = predictions

        for (let index = 0; index < this.#predictions.length; index++) {
            this.#processedPredictions[this.#predictions[index].className.toLowerCase()] = this.#predictions[index].probability
        }

        return this.#profiler()
    }
    
     /**
     * @returns {boolean}
     */
    default() {
        return this.loose()
    }

    /**
     * For debug purposes
     * @returns {boolean}
     */
    allpass() {
        return false
    }

    /**
     * Solid filter to catch nudity strictly. Side-effect: Possibly filters some clean images also.
     * @returns {boolean}
     */
    strict() {
        return this.#processedPredictions.porn > 0.000999
    }

    /**
     * It will catch porn images but may allow mild nudity.
     * @returns {boolean}
     */
     loose() {
        return this.#processedPredictions.neutral < 0.8 && this.#processedPredictions.porn > 0.09
    }

    /**
     * Catch porn, allow nudity.
     * @returns {boolean}
     */
     adult() {
        return this.#processedPredictions.neutral < 0.8 && this.#processedPredictions.porn > 0.09
    }
}

module.exports = { PredictionProfiler }