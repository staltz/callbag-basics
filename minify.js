var compiler = require('google-closure-compiler-js').compile;
var fs = require('fs');
var source = fs.readFileSync('dist/bundle.js', 'utf8');

var compilerFlags = {
  jsCode: [{src: source}],
  languageIn: 'ES6',
  compilationLevel: 'ADVANCED',
};

var output = compiler(compilerFlags);
fs.writeFileSync('dist/bundle.min.js', output.compiledCode, 'utf8');
