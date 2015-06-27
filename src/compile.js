var esprima = require('esprima');
var escodegen = require('escodegen');
var estraverse = require('estraverse');

// restrictions
// arrays must contain the same type of data
// can't assign a type variable a new type of data


var symbolTable = {};


var compile = function(code) {
    var ast = esprima.parse(code);
    
    estraverse.replace(ast, {
        // TODO: handle unary operators
        // TODO: handle += and other assignment operators
        leave: function(node, parent) {
            if (node.type === "BinaryExpression") {
                if (node.operator === "+") {
                    return {
                        type: "CallExpression",
                        callee: {
                            type: "MemberExpression",
                            object: {
                                type: "Identifier",
                                name: "math"
                            },
                            property: {
                                type: "Identifier",
                                name: "add"
                            }
                        },
                        arguments: [node.left, node.right]
                    }
                } else if (node.operator === "-") {
                    return {
                        type: "CallExpression",
                        callee: {
                            type: "MemberExpression",
                            object: {
                                type: "Identifier",
                                name: "math"
                            },
                            property: {
                                type: "Identifier",
                                name: "sub"
                            }
                        },
                        arguments: [node.left, node.right]
                    }
                } else if (node.operator === "*") {
                    return {
                        type: "CallExpression",
                        callee: {
                            type: "MemberExpression",
                            object: {
                                type: "Identifier",
                                name: "math"
                            },
                            property: {
                                type: "Identifier",
                                name: "mul"
                            }
                        },
                        arguments: [node.left, node.right]
                    }
                }
            } else if (node.type === "CallExpression") {
                if (node.callee.type === "Identifier") {
                    if (node.callee.name === "dot") {
                        return {
                            type: "CallExpression",
                            callee: {
                                type: "MemberExpression",
                                object: {
                                    type: "Identifier",
                                    name: "math"
                                },
                                property: {
                                    type: "Identifier",
                                    name: "dot"
                                }
                            },
                            arguments: node.arguments
                        };
                    } else if (node.callee.name === "sqrt") {
                        return {
                            type: "CallExpression",
                            callee: {
                                type: "MemberExpression",
                                object: {
                                    type: "Identifier",
                                    name: "math"
                                },
                                property: {
                                    type: "Identifier",
                                    name: "sqrt"
                                }
                            },
                            arguments: node.arguments
                        };
                    } else if (node.callee.name === "print") {
                        return {
                            type: "CallExpression",
                            callee: {
                                type: "MemberExpression",
                                object: {
                                    type: "Identifier",
                                    name: "console"
                                },
                                property: {
                                    type: "Identifier",
                                    name: "log"
                                }
                            },
                            arguments: node.arguments
                        };
                    }
                }
            } 
        }
    });
    
    return escodegen.generate(ast);
};

module.exports = compile;
