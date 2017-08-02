Pedantic bootstrap
==================

1. Create folder with project
2. Create file `test/App.test.jsx` with

    it('renders a ScoreBoard component', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find(ScoreBoard).nodes).to.be.not.empty;
    });

3. Run `npm test` => Fails with "ENOENT: .... package.json"
4. Run `npm init`
   * When prompted `test command`, enter `mocha`
5. Run `npm test` => Fails with "'mocha' is not recognized as an internal or external command"
6. Run `npm add -D mocha && npm test`: Fails with "No test files found", because our test is .jsx!
7. Create file test/mocha.opts

    --compilers jsx:babel-register

8. Run `npm test`: Fails with "Cannot find module 'babel-register'"
9. Run `npm add -D babel-register && npm test`: Fails with syntax error on "<App />" (react stuff)
10. Create file ./.babelrc

    {
        "presets": [
            "react"
        ]
    }

11. Run `npm test`: "Couldn't find preset "react" relative to directory"
12. Run `npm add -D babel-preset-react && npm test`: Fails with "shallow is not defined"
13. Add to top of `test/App.test.jsx`:

    import {shallow} from "enzyme";

14. Run `npm test`: Fails with syntax error on "import"
15. Add preset "es2015" to `.babelrc` and run `npm test`: Couldn't find preset "es2015" relative to directory
16. `npm add -D babel-preset-es2015 && npm test` => "Cannot find module 'enzyme'"
17. Run `npm add -D enzyme && npm test` => "cannot find module react"
18. `npm add -P save react && npm test` => "react-dom is an implicit dependency in order to support react@0.13-14"
19. `npm add -P save react-dom && npm test` => "react-dom@15.5+ and react-test-renderer are implicit dependencies when using react@15.5+ with enzyme"
20. `npm add -D react-test-renderer && npm test` => "ReferenceError: React is not defined"
21. Add to top of test/App.test.jsx `import React from 'react';` and run `npm test` => "ReferenceError: App is not defined"
22. Add to top of test/App.test.jsx `import App from '../src/App.jsx';` and run `Cannot find module '../src/App.jsx'"
23. Create file `src/App.jsx` with

    import React from 'react';

    export default function App() {
      return <div>Hello world</div>;
    }

24. Run `npm test` => "ReferenceError: expect is not defined"
25. Add to top of `test/App.test.jsx`: `import {expect} from 'chai';` and run `npm test` => "Cannot find module 'chai'"
26. `npm add -D chai && npm test` => "ReferenceError: ScoreBoard is not defined"
27. Add to top of `test/App.test.jsx`: `import ScoreBoard from '../src/ScoreBoard.jsx';` and run `npm test` => "Cannot find module '../src/ScoreBoard.jsx'"
28. Create file `src/ScoreBoard.jsx` with

    import React from 'react';

    export default function ScoreBoard() {
      return <div>ScoreBoard</div>;
    }

29. Run `npm test` => "AssertionError: expected [] not to be empty"
30. In `src/App.jsx`, add to top `import ScoreBoard from "./ScoreBoard.jsx", update the contents of `function App()` to `return <ScoreBoard />` and run `npm test` => 
31. Test passes!


Quick bootstrap:
================

1. Create folder with project
2. Run `npm init`
   * When prompted `test command`, enter `mocha`
3. Create file `test/App.test.jsx` with

    import React from 'react';
    import {shallow} from "enzyme";
    import {expect} from 'chai';

    import App from '../src/App.jsx';
    import ScoreBoard from '../src/ScoreBoard.jsx';

    it('renders a ScoreBoard component', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find(ScoreBoard).nodes).to.be.not.empty;
    });

4. Create file `test/mocha.opts`

    --compilers jsx:babel-register

5. Create file `./.babelrc`

    {
        "presets": [
            "es2015", "react"
        ]
    }

6. Create file `src/App.jsx` with

    import React from 'react';

    export default function App() {
      return <div>Hello world</div>;
    }

7. Create file `src/ScoreBoard.jsx` (for test to know about the name ScoreBoard):

    import React from 'react';

    export default function ScoreBoard() {
      return <div>ScoreBoard</div>;
    }

7. Run `npm add --save-dev mocha chai babel-register babel-preset-es2015 babel-preset-react enzyme react-test-renderer`
8. Run `npm add --save react react-dom`
9. Run `npm test` => "AssertionError: expected [] not to be empty"
10. In `src/App.jsx`, add to top `import ScoreBoard from "./ScoreBoard.jsx", update the contents of `function App()` to `return <ScoreBoard />` and run `npm test` again
11. Test passes!




Pendantic web bootstrap
=======================

1. Create file `dist/index.html` with

    import React from 'react';
    import ReactDom from 'react-dom';

    import App from './App.jsx';

    ReactDom.render(<App />, document.getElementById('app'));

2. Open file:.../index.html in web browser. Browser console will show "Failed to load resource: net::ERR_FILE_NOT_FOUND"
3. In `package.json`, in `"scripts"` add `"start": "webpack-dev-server  --content-base dist",`
4. Run `npm start` => "'webpack-dev-server' is not recognized as an internal or external command"
5. Run `npm add -D webpack-dev-server && npm start` => Fails with "Cannot find module 'webpack'"
6. Run `npm add -D webpack && npm start` => Fails with "No configuration file found and no entry configured via CLI option... A configuration file could be named 'webpack.config.js'"
7. Create empty file `webpack.config.js` and run `npm start` => "Configuration file found but no entry configured."
8. Add `module.exports = { entry: './src/index.jsx' }` in `webpack.config.js` and run `npm start` => "Error: Can't resolve './src/index.jsx'"
9. Create file `src/index.jsx`:

    import React from 'react';
    import ReactDom from 'react-dom';

    import App from './App.jsx';

    ReactDom.render(<App />, document.getElementById('app'));

10. Server will fail with: "You may need an appropriate loader to handle this file type."
11. Update `webpack.config.js`:

    module.exports = {
        entry: './src/index.jsx',
        output: {
            path: __dirname + '/dist',
            filename: 'index.min.js'
        },
        module: {
          loaders: [
            { test: /.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
          ]      
        }
    }

12. Restart `npm start`: "Can't resolve 'babel-loader'"
13. Run `npm add -D babel-loader && npm start` => It works!


Streamlining and making it nice!
================================

* Have the tests automatically execute when a file is changed: In `package.json` add in "scripts" `"watch": "npm test -- --watch --growl"` and run `npm run watch`. Install Growl from http://www.growlforwindows.com/gfw/ and start it in order to get a nice popup when tests run.
* Use eslint to get warnings and errors on bad code: `npm add --save eslint mocha-eslint`, run `node_modules/bin/eslint --init` to generate a `.eslintrc.js` and add `test\eslint.js` to have linting run as part of the test:

    import lint from 'mocha-eslint';

    const paths = [
      "*.js",
      "src/**/*.js",
      "src/**/*.jsx",
      "test/**/*.js",
      "test/**/*.jsx"
    ];
    lint(paths, {});



TODO: Streamline

-    "start": "webpack-dev-server --content-base dist",
+    "start": "webpack-dev-server --content-base dist --watch-content-base --inline --hot",





