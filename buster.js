var config = module.exports;

config["Brunch Notes Example"] = {
    extensions: [require("buster-coffee")],
    libs: ['public/javascripts/vendor.js'],
    sources: ['public/javascripts/app.js'],
    env: "browser",
    tests: [
        "test/**/*.coffee"
    ]
};
