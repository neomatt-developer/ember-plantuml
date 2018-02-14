/* eslint-env node */

const plantuml = require('node-plantuml');
const fs = require('fs');
const path = require('path');
const glob = require( 'glob' );
const peg = require('pegjs');


const walkSync = (d) => fs.statSync(d).isDirectory() ? fs.readdirSync(d).map(f => walkSync(path.join(d, f))) : d;

const rule = fs.readFileSync('lib/parsers/model.pegjs', 'utf8');
const parser = peg.generate(rule);

var modelFiles = walkSync('pums/models');
modelFiles.forEach((f) => {
  var model = fs.readFileSync(f, 'utf8');
  var attributes = parser.parse(model).map((a) => a.key);
  var fileName = path.basename(f).slice(0, -3);
  var modelName = fileName.toUpperCase();
  var umlTemplate = `
@startuml
Model  <|-- ${modelName}

class ${modelName} {
${attributes.join('\n')}
}
@enduml
`;

  var outputFile = path.join("pums/src", path.basename(fileName) + ".pum");
  fs.writeFileSync(outputFile, umlTemplate);

});

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
