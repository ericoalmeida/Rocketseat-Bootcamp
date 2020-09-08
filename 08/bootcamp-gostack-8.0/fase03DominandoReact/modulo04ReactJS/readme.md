# Configurando projeto manual - React JS

# Dependencias
```
  "devDependencies": {
    "@babel/core": "^7.6.4",
    "@babel/preset-env": "^7.6.3",
    "@babel/preset-react": "^7.6.3",
    "babel-loader": "^8.0.6",
    "css-loader": "^3.2.0",
    "file-loader": "^4.2.0",
    "style-loader": "^1.0.0",
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10",
    "webpack-dev-server": "^3.9.0"
  },
  "dependencies": {
    "@babel/plugin-proposal-class-properties": "^7.5.5",
    "prop-types": "^15.7.2",
    "react": "^16.11.0",
    "react-dom": "^16.11.0"
  }

```



# babel.config.js
```
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: ["@babel/plugin-proposal-class-properties"]
}

```



# webpack.config.js
```
const {resolve} = require('path')

module.exports = {
  entry: resolve(__dirname, 'src', 'index.js'),
  output: {
    path: resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
        ]
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  }
}

```



# Scripts
```
  "scripts": {
    "build": "webpack --mode production",
    "dev": "webpack-dev-server --mode development"
  },

```