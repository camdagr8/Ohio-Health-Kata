# Requirements

This code is a React app and requires the following to be installed on your system:

1.  Node ver >= 9.2.1
2.  NPM ver >= 2.0.0

## Running the Application

In Terminal run the following command from the application root:

```
$ npm install
```

Then launch the local instance:

```
$ npm run local
```

## Give it a Try!

Slide the start and end time markers left and right to calculate your pay.
![screen shot](https://image.ibb.co/eOMz9J/kata_ss.jpg)

## Running Tests

In Terminal run the following command from the application root:

```
$ npm test
```

## About the Code

This app is written using [Reactium](https://github.com/Atomic-Reactor/Reactium) a React rapid application framework I co-authored while at IBM. Reactium is focused on Domain Driven Design.

-   The Calculator React component can be found at: `~/src/app/components/Calculator.js`.
-   The Calculator processing class can be found at: `~/src/app/components/Calculator/calculate.js`.
-   The styles use Sass and are compiled into the `style.css` file using Gulp
-   The Style Guide markup can be viewed by launching the app and navigating to `http://localhost:3000/toolkit` in your browser.
