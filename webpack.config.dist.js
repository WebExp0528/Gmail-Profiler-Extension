const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const {
    getHTMLPlugins,
    getOutput,
    getCopyPlugins,
    getZipPlugin,
    getFirefoxCopyPlugins,
    getEntry,
    getResolves,
} = require("./webpack.utils");
const config = require("./config.json");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const dotenv = require("dotenv").config({
    path: path.join(__dirname, ".env"),
});

Object.keys(dotenv.parsed)
    .filter((key) => key.startsWith(`PROD_`))
    .forEach((key) => {
        dotenv.parsed[key.replace(`PROD_`, ``)] = dotenv.parsed[key];
        delete dotenv.parsed[key];
    });

const generalConfig = {
    node: {
        fs: "empty",
    },
    mode: "production",
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
        "process.env": dotenv.parsed,
    }),
];

module.exports = [
    {
        ...generalConfig,
        output: getOutput("chrome", config.tempDirectory),
        entry: getEntry(config.chromePath),
        plugins: [
            ...generalPlugins,
            new CleanWebpackPlugin(["dist", "temp"]),
            new UglifyJsPlugin(),
            ...getHTMLPlugins(
                "chrome",
                config.tempDirectory,
                config.chromePath
            ),
            ...getCopyPlugins(
                "chrome",
                config.tempDirectory,
                config.chromePath
            ),
            getZipPlugin("chrome", config.distDirectory),
        ],
    },
    {
        ...generalConfig,
        output: getOutput("opera", config.tempDirectory),
        entry: getEntry(config.operaPath),
        plugins: [
            ...generalPlugins,
            new CleanWebpackPlugin(["dist", "temp"]),
            new UglifyJsPlugin(),
            ...getHTMLPlugins("opera", config.tempDirectory, config.operaPath),
            ...getCopyPlugins("opera", config.tempDirectory, config.operaPath),
            getZipPlugin("opera", config.distDirectory),
        ],
    },
    {
        ...generalConfig,
        entry: getEntry(config.firefoxPath),
        output: getOutput("firefox", config.tempDirectory),
        plugins: [
            ...generalPlugins,
            new CleanWebpackPlugin(["dist", "temp"]),
            new UglifyJsPlugin(),
            ...getHTMLPlugins(
                "firefox",
                config.tempDirectory,
                config.firefoxPath
            ),
            ...getFirefoxCopyPlugins(
                "firefox",
                config.tempDirectory,
                config.firefoxPath
            ),
            getZipPlugin("firefox", config.distDirectory),
        ],
    },
];
