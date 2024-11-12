
function generateJavaScript(ast) {
    let jsCode = '';

    ast.body.forEach(node => {
        if (node.type === 'VariableDeclaration') {
            jsCode += `let ${node.name} = ${node.value};\n`;
        }
    });

    return jsCode;
}
