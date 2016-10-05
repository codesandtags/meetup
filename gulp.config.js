'use strict';

module.exports = {
    // Base paths
    "dist": "./dist",
    "app":  {
        "path": "./app",
        "scripts": {
            "src": "./app/scripts/**/*.js",
            "des" : "/scripts/js",
            "vendor": "/scripts/vendor/"
        },
        "styles":{
            "src": ["./app/styles/**/*.css", "app/styles/**/*.scss"],
            "des": "/styles/",
            "vendor": "/styles/vendor/"
        },
        "fonts": {
            "src": "/fonts/**/*.{ttf,woff,eof,svg}",
            "des": "/styles/fonts/"
        },
        "images": {
            "src": "/images/**/*",
            "des" : "/images/"
        },
        "views": {
            "path": "./app/views/**",
            "src": "./app/**/*.html",
            "des": "/views/"
        },
        "i18n": {
            "path": "./app/i18n/**",
            "des": "/i18n/"
        }
    },

    // Development Environment
    "development":{
    }
};
