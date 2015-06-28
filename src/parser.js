
let parse = function(code) {
    let lines = code.split('\n');

    // TODO: trim input
    return lines.filter(line => line !== '').map(parseLine);
};

let parseLine = function(line) {

    // TODO: break it input tokens
    let regex = /[a-z]+|[=,\(\)\-\+\*\/]|[1-9][0-9]*/g;

    let matches = line.match(regex);
    console.log(matches);

    return line;
};

module.exports = {
    parse: parse
};
