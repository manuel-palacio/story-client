// <your-application>/config/application.js

module.exports = function (lineman) {
    //Override application configuration here
    return {
        server: {
            pushState: false,
            apiProxy: {
                enabled: true,
                port: 8080
            }
        }
    };
};
