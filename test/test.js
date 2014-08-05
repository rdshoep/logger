/*
 * @description
 *   Please write the test.js.js script's description
 * @author rdshoep(rdshoep@126.com)
 *   http://www.rdshoep.com/
 * @version 
 *   1.0.0(2014/8/5)
 */

var logger = require("../build/logger");

//default level error, lower level garde don't show anything
console.log("---default setting---");
logger.debug("debug info");
logger.log("log info");
logger.info("info info");
logger.warn("warn info");
logger.error("error info");

//change the level to info
console.log("---change the level to info---");
logger.setLoggerLevel("info");

logger.debug("debug info");
logger.log("log info");
logger.info("info info");
logger.warn("warn info");
logger.error("error info");


//change the debugEngine
console.log("---change the debugEngine use my code ---");
logger.setLoggerEngine({
    warn: function(){
        console.log([].concat([].slice.call(arguments, 0)).join(","), "| this is my warn control");
    }
});

logger.info("info info");
logger.warn("warn info");
logger.error("error info");