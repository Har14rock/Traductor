
function analyze(ast) {
    const symbolTable = {};

    function analyzeNode(node) {
        if (node.type === 'VariableDeclaration') {
            if (symbolTable[node.name]) {
                throw new Error(`La variable ${node.name} ya está declarada`);
            }
            symbolTable[node.name] = node.value;
        }
    }

    ast.body.forEach(analyzeNode);
}
