
function parse(tokens) {
    const AST = { type: 'Program', body: [] };

    function parseStatement() {
        const token = tokens.shift();
        if (token.type === 'KEYWORD' && token.value === 'int') {
            const variableName = tokens.shift().value;
            tokens.shift(); // remover '='
            const value = tokens.shift().value;
            tokens.shift(); // remover ';'
            return { type: 'VariableDeclaration', name: variableName, value: parseInt(value) };
        }
    }

    while (tokens.length > 0) {
        AST.body.push(parseStatement());
    }
    return AST;
}
