(function (name, definition) {
    // Check define
    var hasDefine = typeof define === 'function',
    // Check exports
        hasExports = typeof module !== 'undefined' && module.exports;

    if (hasDefine) {
        // AMD Module or CMD Module
        define(definition);
    } else if (hasExports) {
        // Node.js Module
        module.exports = definition();
    } else {
        // Assign to common namespaces or simply the global object (window)
        this[name] = definition();
    }
})("Logger", function(){

    var loggerLevelArray = ["debug", "log", "info", "warn", "error"];

    function Logger(level) {
        this.loggerLevel = level || "warn";
        //extend the proto, otherwise multiple instances will interaction effect by setLoggerEngine function
        this.loggerEngine = this.__originalEngine__ = extend({}, Logger.prototype);

        this.setLoggerLevel(this.loggerLevel);
    }

    Logger.prototype.debug = (console && console.debug) || new Function;
    Logger.prototype.log = (console && console.log) || new Function;
    Logger.prototype.info = (console && console.info) || new Function;
    Logger.prototype.warn = (console && console.warn) || new Function;
    Logger.prototype.error = (console && console.error) || new Function;
    
    /**
     * set logger level
     * reset the lower level grade to new Function
     * copy the higher level grade form the loggerEngine
     * @param level
     */
    Logger.prototype.setLoggerLevel = function (level) {
        var minLevelIndex = 0,
            levelCount = loggerLevelArray.length;

        //check the new level is in support logger levels or nor.
        while (level != loggerLevelArray[minLevelIndex]) {
            minLevelIndex++;
            if (minLevelIndex >= levelCount) break;
        }

        //not support logger level,throw new error
        if (minLevelIndex >= levelCount) {
            throw new Error("Uncorrect logger level:" + level);
        }

        //accept the new level
        this.loggerLevel = level;

        //reset the lower levels
        for (var i = 0; i < minLevelIndex; i++) {
            var levelItem = loggerLevelArray[i];
            this[levelItem] = new Function;
        }

        //copy the highers level
        for (var i = minLevelIndex; i < levelCount; i++) {
            var levelItem = loggerLevelArray[i];
            this[levelItem] = this.loggerEngine[levelItem] || new Function;
        }
    };
    /**
     * set new loggerEngine
     * check type; copy relation; reset my levels[debug,log...] function by setLoggerLevel
     * @param newEngine
     */
    Logger.prototype.setLoggerEngine = function (newEngine) {
        extend(this.loggerEngine, newEngine);
        this.setLoggerLevel(this.loggerLevel);
    };

    /**
     * simple obj extend func. Deprecated
     */
    function extend (finalObj) {
        finalObj = finalObj || {};
        for (var i = 1; i < arguments.length; i++) {
            var orign = arguments[i];
            for (var name in orign) {
                finalObj[name] = orign[name];
            }
        }
        return finalObj;
    };

    var logger = new Logger("error");
    logger.constructor = Logger;
    return logger;
});