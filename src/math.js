function add(a, b) {
    if (typeof a === "number" && typeof b === "number") {
        return a + b;
    } else if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length === b.length) {
            if (a.length === 2) {
                return [a[0] + b[0], a[1] + b[1]];
            } else if (a.length === 3) {
                return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
            }
        }
    }
}

function sub(a, b) {
    if (typeof a === "number" && typeof b === "number") {
        return a - b;
    } else if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length === b.length) {
            if (a.length === 2) {
                return [a[0] - b[0], a[1] - b[1]];
            } else if (a.length === 3) {
                return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
            }
        }
    }
}

function mul(a, b) {
    if (typeof a === "number") {
        if (typeof b === "number") {
            return a * b;
        } else if (Array.isArray(b)) {
            if (b.length === 2) {
                return [a * b[0], a * b[1]];
            } else if (b.length === 3) {
                return [a * b[0], a * b[1], a * b[2]];
            }
        } else {
            throw "invalid operands";
        }
    } else {
        throw "invalid operands";
    }
}

function dot(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length === b.length) {
            if (a.length === 2) {
                return a[0] * b[0] + a[1] * b[1];
            } else if (a.length === 3) {
                return a[0] * b[0] + a[1] * b[1] + a[2] + b[2];
            }
        } else {
            throw "a and b must be the same length";
        }
    } else {
        throw "either a or b is not an array";
    }
}

module.exports = {
    add:add,
    sub:sub,
    mul:mul,
    dot:dot,
    sqrt:Math.sqrt
};
