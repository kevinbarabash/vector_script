require('babel/register');
var compile = require('./src/compile.js');
var math = require('./src/math.js');
var fs = require('fs');

math.add(5,10);

var code = fs.readFileSync('./test/test.js', 'utf-8');

var gen = compile(code);
console.log(gen);
eval(gen);


// sqrt(dot(a, a)) -> \sqrt{a \dot a} -> typset using KaTeX

// all expressions are a single line

// no looping

// autoprefix functions as necessary, e.g. sqrt -> Math.sqrt for evaluation

// instead of printint out values

// underscores -> properties, e.g a_0 -> a["0"], a_x -> a["x"]


var parser = require('./src/parser.js');

code = 'a = (1,2,3)\n' +  // a is a vector
    'b = (0,-1,1)\n' +    // b is a vector
    'c = a * b\n' +       // dot produces a scalar
    'sqrt(a * a)';        // norm(a)

var ast = parser.parse(code);

console.log(ast);
