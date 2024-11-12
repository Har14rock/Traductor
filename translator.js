const javaInput = document.getElementById('javaInput');
const jsOutput = document.getElementById('jsOutput');
const translateButton = document.getElementById('translateButton');

// Función que traduce tokens de Java a JavaScript
function translateTokensToJS(tokens) {
    let jsCode = '';
    let indentationLevel = 0;
    const increaseIndentation = () => indentationLevel++;
    const decreaseIndentation = () => indentationLevel = Math.max(0, indentationLevel - 1);
    const addIndentation = () => '    '.repeat(indentationLevel); // 4 espacios por nivel de indentacion

    tokens.forEach((token, index) => {
        if (!token || !token.type) {
            throw new Error(`Token inesperado o indefinido en posición ${index}`);
        }

        //  tipo de token
        switch (token.type) {
            case 'KEYWORD':
                // Convierte tipos basicos
                if (['int', 'String', 'boolean', 'double'].includes(token.value)) {
                    jsCode += 'let ';
                } else if (['public', 'static', 'void'].includes(token.value)) {
                    // Ignora palabras clave específicas de Java
                } else {
                    jsCode += token.value + ' ';
                }
                break;

            case 'IDENTIFIER':
                // "System.out.println"  reemplazarlo con "console.log"
                if (token.value === 'System' && tokens[index + 1]?.value === '.' && tokens[index + 2]?.value === 'out' && tokens[index + 3]?.value === '.' && tokens[index + 4]?.value === 'println') {
                    jsCode += 'console.log';
                } else {
                    jsCode += token.value;
                }
                break;

            case 'PUNCTUATION':
                jsCode += token.value;
                // Añadir salto de linea si es una llave
                if (token.value === '{') {
                    increaseIndentation();
                    jsCode += '\n' + addIndentation();
                } else if (token.value === '}') {
                    decreaseIndentation();
                    jsCode = jsCode.trimEnd(); // Eliminar espacio antes de la llave de cierre
                    jsCode += '\n' + addIndentation() + '}';
                    if (tokens[index + 1]?.type !== 'PUNCTUATION') {
                        jsCode += '\n' + addIndentation();
                    }
                } else if (token.value === ';') {
                    jsCode += '\n' + addIndentation();
                }
                break;

            case 'DOT':
                jsCode += '.';
                break;

            case 'NUMBER':
            case 'OPERATOR':
            case 'BRACKET':
                jsCode += token.value;
                break;

            case 'STRING':
                jsCode += token.value;
                break;

            default:
                throw new Error(`Token inesperado: ${token.value} de tipo ${token.type}`);
        }
    });

    // limpiar codigo innecesario
    jsCode = jsCode.replace(/public class \w+\s*\{/, '');
    jsCode = jsCode.replace(/public static void main\s*\(.*?\)/, 'function main()');
    return jsCode.trim();
}

// Funcion que traduce el codigo Java a JavaScript
function translateJavaToJS(javaCode) {
    const tokens = tokenize(javaCode); //  esta definido en lexer.js
    return translateTokensToJS(tokens);
}

//  botón de traduccir
translateButton.addEventListener('click', () => {
    try {
        const javaCode = javaInput.value;
        const jsCode = translateJavaToJS(javaCode);
        jsOutput.value = jsCode;
    } catch (error) {
        jsOutput.value = `Error: ${error.message}`;
    }
});
