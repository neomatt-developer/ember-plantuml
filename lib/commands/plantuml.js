/* eslint-env node */

var plantuml = require('node-plantuml');
var fs = require('fs');
const path = require('path');
const walkSync = (d) => fs.statSync(d).isDirectory() ? fs.readdirSync(d).map(f => walkSync(path.join(d, f))) : d;

var inputFiles = walkSync("pums/src");

console.log("Generating UML..."); // eslint-disable-line

inputFiles.forEach((f) => {
  // console.log("Processing file: ", f); // eslint-disable-line
  var gen = plantuml.generate(f);
  var fileName = path.basename(f).slice(0, -4);
  var outputFile = path.join("pums/dest", path.basename(fileName) + ".png");
  gen.out.pipe(fs.createWriteStream(outputFile));
  // console.log("UML Graphics generated : ", outputFile); // eslint-disable-line
});

console.log("UML Graphics generated."); // eslint-disable-line
