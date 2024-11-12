function tokenize(javaCode) {
    const tokens = [];
    const tokenPatterns = [
        { type: 'KEYWORD', regex: /\b(int|String|boolean|public|class|static|void|for)\b/ },
        { type: 'IDENTIFIER', regex: /\b[a-zA-Z_]\w*\b/ },
        { type: 'NUMBER', regex: /\b\d+\b/ },
        { type: 'OPERATOR', regex: /[=+*\/<>!&|]/ },
        { type: 'PUNCTUATION', regex: /[{}();,]/ },
        { type: 'BRACKET', regex: /[\[\]]/ },
        { type: 'DOT', regex: /\./ },
        { type: 'STRING', regex: /"(?:[^"\\]|\\.)*"/ }
    ];

    let code = javaCode.trim();  // remover espacios
    while (code.length > 0) {
        let matched = false;
        for (let pattern of tokenPatterns) {
            const match = code.match(pattern.regex);
            if (match && match.index === 0) {
                tokens.push({ type: pattern.type, value: match[0] });
                code = code.slice(match[0].length).trim();
                matched = true;
                break;
            }
        }
        if (!matched) {
            // Manejo de error para mostrar el codigo restante
            throw new Error(`Token inesperado: "${code[0]}" en posición ${javaCode.length - code.length}`);
        }
    }
    return tokens;
}
