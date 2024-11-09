// elementos del DOM
const javaInput = document.getElementById('javaInput');
const jsOutput = document.getElementById('jsOutput');
const translateButton = document.getElementById('translateButton');

// Función que traduce Java a JavaScript
function translateJavaToJS(javaCode) {
    // reglas básicas de Java a JavaScript
    const rules = [
        { regex: /\bint\b/g, replacement: 'let' },
        { regex: /\bString\b/g, replacement: 'let' },
        { regex: /\bdouble\b/g, replacement: 'let' },
        { regex: /\bboolean\b/g, replacement: 'let' },
        { regex: /System\.out\.println/g, replacement: 'console.log' },
        { regex: /public\s+class\s+(\w+)/g, replacement: 'class $1' },
        { regex: /public\s+static\s+void\s+main\(String\[\]\s+args\)/g, replacement: 'function main()' },
        { regex: /for\s*\((int|let)\s+(\w+)\s*=\s*(\d+);\s*\2\s*<\s*(\d+);\s*\2\+\+\)/g, replacement: 'for (let $2 = $3; $2 < $4; $2++)' }
    ];

    // código de entrada
    let jsCode = javaCode;
    rules.forEach(rule => {
        jsCode = jsCode.replace(rule.regex, rule.replacement);
    });

    return jsCode;
}

// botón de traducción
translateButton.addEventListener('click', () => {
    const javaCode = javaInput.value;
    const jsCode = translateJavaToJS(javaCode);
    jsOutput.value = jsCode;
});
