# Student Evaluation Tool

React app with [Redux](https://redux.js.org/). This is front-end of a project done for [Codaisseur](https://www.codaisseur.com/) as a final assignment. The back-end is found here: https://github.com/ff05/evaluation-tool-api 

It is a tool for teachers to be able to:
- add a new class 
- add students to the class
- evaluate the student by giving him / her a color and a small summary per date
- see the average evaluation per class
- ask a question to a student randomly, but with chances higher for students with bad evaluations.

__Work in progress:__ days to review student evaluation of a particular date cannot be selected yet.

<img align="left" width="46%" src="https://github.com/ff05/evaluation-tool/blob/master/src/assets/images/screenshot-class.png" alt="Artists"/>
<img align="left" width="46%" src="https://github.com/ff05/evaluation-tool/blob/master/src/assets/images/screenshot-student.png" alt="Artists"/>
<br clear="left"/>

To __run locally__, make sure:
 * you have [Yarn](https://yarnpkg.com/en/) and [NodeJS](https://nodejs.org/en/) installed.
 * the [backend](https://github.com/ff05/evaluation-tool-api) up and running

```bash
git clone git@github.com:ff05/evaluation-tool.git
cd evaluation-tool
yarn install
yarn start
```
