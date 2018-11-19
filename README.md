# craco-plugin-react-hot-reload

**Prerequisites**

Install [craco](https://github.com/sharegate/craco) and [react-hot-reload](https://github.com/gaearon/react-hot-loader)

[![npm version](https://badge.fury.io/js/craco-plugin-react-hot-reload.svg)](https://badge.fury.io/js/craco-plugin-react-hot-reload)

## Install

```
npm install craco-plugin-react-hot-reload --save-dev
```

## Usage

1. Add the plugin into your craco.config.js;
```
reactHotReloadPlugin = require('craco-plugin-react-hot-reload');

module.exports = {
    plugins: [{
        plugin: reactHotReloadPlugin
    }]
}
```

2. Follow 'step 2' from https://github.com/gaearon/react-hot-loader , replicated below:

```js
Mark your root component as hot-exported:
// App.js
import React from 'react'
import { hot } from 'react-hot-loader'

const App = () => <div>Hello World!</div>

export default hot(module)(App)
```

## Acknowledgements

[@cdharris](https://github.com/cdharris) for having created [react-app-rewire-hot-loader](https://github.com/cdharris/react-app-rewire-hot-loader).

## License

Licensed under the MIT License, Copyright ©️ 2018 Hasan Ayan. See [LICENSE.md](LICENSE.md) for more information.
