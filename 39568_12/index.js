import fs from 'fs'; 
import antlr4 from 'antlr4'; 
import ForLoopLexer from './ForLoopLexer.js'; 
import ForLoopParser from './ForLoopParser.js'; 
import ForLoopVisitorImpl from './ForLoopVisitorImpl.js'; 
import ForLoopTranslatorImpl from './ForLoopTranslatorImpl.js'; 

// 1. Leer el archivo de entrada 
const input = fs.readFileSync('input.txt', 'utf8'); 

// 2. Crear el stream de caracteres 
const chars = new antlr4.InputStream(input); 

// 3. Lexer
const lexer = new ForLoopLexer(chars);

const erroresLexicos = [];
const erroresSintacticos = [];

// Capturar errores léxicos
lexer.removeErrorListeners(); 
lexer.addErrorListener({ 
    syntaxError: (recognizer, offendingSymbol, line, column, msg) => { 
        erroresLexicos.push({ linea: line, columna: column, mensaje: msg }); 
    } 
});

// 4. Llenar el token stream (dispara errores léxicos)
const tokens = new antlr4.CommonTokenStream(lexer);
tokens.fill();

// ⛔ Si hay errores léxicos, reportar y salir ANTES de parsear
if (erroresLexicos.length > 0) {
    console.log('═══════════════════════════════════════════════════');
    console.log('  ANÁLISIS DEL CÓDIGO FUENTE');
    console.log('═══════════════════════════════════════════════════');
    console.log(`❌ EL CÓDIGO TIENE ${erroresLexicos.length} ERROR(ES)`);
    console.log(`   Léxicos:     ${erroresLexicos.length}`);
    console.log(`   Sintácticos: 0`);
    console.log('═══════════════════════════════════════════════════\n');
    console.log('🔤 ERRORES LÉXICOS (caracteres no reconocidos):');
    console.log('---------------------------------------------------');
    erroresLexicos.forEach((e, i) => {
        console.log(`   ${i + 1}. Línea ${e.linea}, columna ${e.columna}`);
        console.log(`      → ${e.mensaje}`);
    });
    console.log();
    console.log('⛔ El programa NO se ejecutará por contener errores.');
    process.exit(1);
}

// 5. Parser
const parser = new ForLoopParser(tokens); 
parser.buildParseTrees = true; 

// Capturar errores sintácticos
parser.removeErrorListeners(); 
parser.addErrorListener({ 
    syntaxError: (recognizer, offendingSymbol, line, column, msg) => { 
        erroresSintacticos.push({ linea: line, columna: column, mensaje: msg }); 
    }, 
    reportAmbiguity: () => {}, 
    reportAttemptingFullContext: () => {}, 
    reportContextSensitivity: () => {} 
}); 

// 6. Construir el árbol
const tree = parser.programa(); 

// ============ REPORTE DE RESULTADO ============ 
const totalErrores = erroresSintacticos.length; 

console.log('═══════════════════════════════════════════════════'); 
console.log('  ANÁLISIS DEL CÓDIGO FUENTE'); 
console.log('═══════════════════════════════════════════════════'); 

if (totalErrores === 0) { 
    console.log('✅ EL CÓDIGO ES CORRECTO'); 
    console.log('   No se encontraron errores léxicos ni sintácticos.'); 
    console.log('═══════════════════════════════════════════════════\n'); 
} else { 
    console.log(`❌ EL CÓDIGO TIENE ${totalErrores} ERROR(ES)`); 
    console.log(`   Léxicos:     0`); 
    console.log(`   Sintácticos: ${erroresSintacticos.length}`); 
    console.log('═══════════════════════════════════════════════════\n'); 

    console.log('📝 ERRORES SINTÁCTICOS (estructura inválida):'); 
    console.log('---------------------------------------------------'); 
    erroresSintacticos.forEach((e, i) => { 
        console.log(`   ${i + 1}. Línea ${e.linea}, columna ${e.columna}`); 
        console.log(`      → ${e.mensaje}`); 
    }); 
    console.log(); 

    console.log('⛔ El programa NO se ejecutará por contener errores.'); 
    process.exit(1); 
} 

// ============ SI NO HAY ERRORES, CONTINUAR ============ 

// 7. Árbol sintáctico 
console.log('--- Árbol sintáctico ---'); 
console.log(tree.toStringTree(parser.ruleNames, parser)); 
console.log(); 

// 8. Tabla de tokens
const nombreToken = {
    [ForLoopLexer.FOR]:           'FOR',
    [ForLoopLexer.PRINTF]:        'PRINTF',
    [ForLoopLexer.BREAK]:         'BREAK',
    [ForLoopLexer.LT]:            'LT',
    [ForLoopLexer.LE]:            'LE',
    [ForLoopLexer.GT]:            'GT',
    [ForLoopLexer.GE]:            'GE',
    [ForLoopLexer.EQ]:            'EQ',
    [ForLoopLexer.NEQ]:           'NEQ',
    [ForLoopLexer.INC]:           'INC',
    [ForLoopLexer.DEC]:           'DEC',
    [ForLoopLexer.ASSIGN]:        'ASSIGN',
    [ForLoopLexer.SEMI]:          'SEMI',
    [ForLoopLexer.LPAREN]:        'LPAREN',
    [ForLoopLexer.RPAREN]:        'RPAREN',
    [ForLoopLexer.LBRACE]:        'LBRACE',
    [ForLoopLexer.RBRACE]:        'RBRACE',
    [ForLoopLexer.IDENTIFICADOR]: 'IDENTIFICADOR',
    [ForLoopLexer.NUMERO]:        'NUMERO',
    [ForLoopLexer.CADENA]:        'CADENA',
};

console.log('--- Tabla de Símbolos (Tokens) ---');
console.log('─'.repeat(60));
console.log('  #  │ Tipo          │ Valor       │ Línea │ Columna');
console.log('─'.repeat(60));

tokens.tokens.forEach((token, i) => {
    if (token.type === antlr4.Token.EOF) return;
    const tipo  = (nombreToken[token.type] ?? `TIPO_${token.type}`).padEnd(13);
    const valor = token.text.padEnd(12);
    const linea = String(token.line).padStart(5);
    const col   = String(token.column).padStart(7);
    const num   = String(i + 1).padStart(3);
    console.log(`  ${num} │ ${tipo} │ ${valor} │ ${linea} │ ${col}`);
});

console.log('─'.repeat(60));
console.log();

// 9. Traducción a JavaScript 
console.log('--- Traducción a JavaScript ---'); 
const translator = new ForLoopTranslatorImpl(); 
console.log(translator.visit(tree)); 
console.log(); 

// 10. Ejecutar el visitor
console.log('--- Ejecutando programa ---'); 
const visitor = new ForLoopVisitorImpl(); 
try { 
    visitor.visit(tree); 
    console.log('--- Fin del programa ---'); 
} catch (err) { 
    console.error('═══════════════════════════════════════════════════'); 
    console.error(`⚠️  ERROR EN TIEMPO DE EJECUCIÓN`); 
    console.error(`   ${err.message}`); 
    console.error('═══════════════════════════════════════════════════'); 
    process.exit(1); 
}