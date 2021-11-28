<h2> <em>Visual Studio Code Custom Extension Starter Template<sup><sup>&nbsp;<B>[Angular v13.0.1]</B></sup></sup> with Angular Application </em></h2>

This project was generated with [Angular CLI] .

## Starter Template Features

1. VSCode Extension integrated with Angular Application.
2. Integrate User component of Angular application for custom vscode extension.
3. Display list of dummy users in angular application .
4. Integration of Feature component,services for User Component in Angular application.
5. Integrate Navigation - Router module in Angular application.
6. Add `{ useHash: true }` in Router module because the angular application is running inside vscode-webview instead od running on server.
7. Replace `<base href='/'>` with `<base href='#'>` inside *src/app/index.html* to resolve ***Unhandled Navigation Error*** for running angular application inside vscode extension.

## Project Environment

- [Node.js](https://nodejs.org/en/download/) -  v14.18.1 .
- [NPM](https://nodejs.org/en/download/) - v8.1.4 .
- [Angular CLI ](https://github.com/angular/angular-cli) - v13.0.1.
- [Visual Studio Code Editor ](https://code.visualstudio.com/download) - v1.62.3.
- [Visual Studio Code Exension API](https://code.visualstudio.com/api) - v1.62.0

## Installation / Build the application

- Download the sample template (Git Clone / Zip Format).
- Run `npm install` to install all packages(dependencies) for this application.
- Run  `npm install -g typescript` to set up Typescript and it's compiler.

<h3> Build the application </h3>

- Run `ng build` to build the angular application. The build artifacts will be stored in the `dist/angular` directory.
- Run `npm run build && tsc -p tsconfig.extension.json` to build angular application and vscode extension together.
The build artifacts will be stored in the `dist/angular` directory for Angular and, `dist/extension-src` for vscode extension.

<h3> Start Angular application locally</h3>

- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
- Run `ng serve --open` to start the angulat server and open the browser `http://localhost:4200/`.

<h3> Start visual studio code extension (Running Angular server is not rewuired)</h3>

- Open Visual Code Editor tool, Import the application in workspace. Press [Ctrl+Shift+F5] to compile and run the extension in a new Extension Development Host window.

## Running vscode extension

- Once Extension Development Host window started, click on extension-icon that appeared on visual studio code editor's sidebar.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.