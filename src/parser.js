
class Parser {
    constructor() {}

    parse(code) {
        let lines = code.split('\n');

        // TODO: trim input
        return lines.filter(line => line !== '').map(
                line => this.parseLine(line));
    }

    parseLine(line) {
        let regex = /[a-z]+|[=,\(\)\-\+\*\/]|[1-9][0-9]*|0/g;

        this.i = 0;
        this.tokens = line.match(regex);

        let left = this.parseExpression();

        try {
            this.match('=');
        } catch (e) {
            this.match('EOL');
            return left;
        }

        let right = this.parseExpression();
        return { type: 'assignment', left, right };
    }

    parseExpression() {
        let token = this.peek();

        if (token === '(') {
            this.eat();
            let components = [];
            components.push(this.parseExpression());
            while (this.hasToken()) {
                token = this.nextToken();
                if (token === ',') {
                    components.push(this.parseExpression());
                } else if (token === ')') {
                    return { type: 'vector', components };
                }
            }
        } else if (/[a-z]/.test(token)) {
            this.eat();
            return token;
        } else {
            return this.parseNumber();
        }
    }

    parseNumber() {
        let token = this.nextToken();
        let neg = token === '-';

        if (neg) {
            token = this.nextToken();
        }

        if (/[0-9]/.test(token)) {
            return (neg ? '-' : '') + token;
        } else {
            throw new Error('number expected');
        }
    }

    nextToken() {
        if (this.hasToken()) {
            return this.tokens[this.i++];
        } else {
            return 'EOL';
        }
    }

    eat() {
        this.i++;
    }

    peek() {
        return this.tokens[this.i];
    }

    hasToken() {
        return this.i < this.tokens.length;
    }

    match(expected) {
        let token = this.nextToken();
        if (token !== expected) {
            throw new Error(`expected "${expected}", got "${token}" in "${this.tokens.join('')}"`);
        }
    }
}

module.exports = Parser;
