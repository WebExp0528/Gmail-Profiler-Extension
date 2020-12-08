const {
    getHTMLPlugins,
    getOutput,
    getCopyPlugins,
    getFirefoxCopyPlugins,
    getEntry,
    getResolves,
} = require("./webpack.utils");
const config = require("./config.json");
const webpack = require("webpack");
const path = require("path");

const dotenv = require("dotenv").config({
    path: path.join(__dirname, ".env"),
});

Object.keys(dotenv.parsed)
    .map((key) => {
        dotenv.parsed[key] = JSON.stringify(dotenv.parsed[key]);
        return key;
    })
    .filter((key) => key.startsWith(`DEV_`))
    .forEach((key) => {
        dotenv.parsed[key.replace(`DEV_`, ``)] = dotenv.parsed[key];
        delete dotenv.parsed[key];
    });
console.log(dotenv.parsed);

const generalConfig = {
    node: {
        fs: "empty",
    },
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [
            {
                loader: "babel-loader",
                exclude: /node_modules/,
                test: /\.(js|jsx)$/,
                query: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                },
                resolve: {
                    extensions: [".js", ".jsx"],
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["eslint-loader"],
            },
            {
                test: /\.((c|sa|sc)ss)$/i,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            import: true,
                        },
                    },
                    {
                        loader: "sass-loader",
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "svg-url-loader",
                        options: {
                            limit: 10000,
                            outputPath: "assets/img/",
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "assets/fonts/",
                        },
                    },
                ],
            },
        ],
    },
    resolve: getResolves(),
};

const generalPlugins = [
    new webpack.DefinePlugin({
        ...dotenv.parsed,
    }),
];

module.exports = [
    {
        ...generalConfig,
        entry: getEntry(config.chromePath),
        output: getOutput("chrome", config.devDirectory),
        plugins: [
            ...generalPlugins,
            ...getHTMLPlugins("chrome", config.devDirectory, config.chromePath),
            ...getCopyPlugins("chrome", config.devDirectory, config.chromePath),
        ],
    },
    {
        ...generalConfig,
        entry: getEntry(config.operaPath),
        output: getOutput("opera", config.devDirectory),
        plugins: [
            ...generalPlugins,
            ...getHTMLPlugins("opera", config.devDirectory, config.operaPath),
            ...getCopyPlugins("opera", config.devDirectory, config.operaPath),
        ],
    },
    {
        ...generalConfig,
        entry: getEntry(config.firefoxPath),
        output: getOutput("firefox", config.devDirectory),
        plugins: [
            ...generalPlugins,
            ...getFirefoxCopyPlugins(
                "firefox",
                config.devDirectory,
                config.firefoxPath
            ),
            ...getHTMLPlugins(
                "firefox",
                config.devDirectory,
                config.firefoxPath
            ),
        ],
    },
];
