#!/usr/bin/env node
// index.js — Punto de entrada CLI (Node.js)
// Uso: node index.js [archivo]   (por defecto: input.txt)

const fs   = require('fs');
const path = require('path');

const { Lexer, TOKEN_TYPES }  = require('./src/lexer.js');
const { Parser, printTree }   = require('./src/parser.js');
const { Interpreter }         = require('./src/interpreter.js');

// ── Helpers ───────────────────────────────────────────────────────────────────
const SEP  = '─'.repeat(60);
const HR   = '═'.repeat(60);

function banner(title) {
  console.log('\n' + HR);
  console.log('  ' + title);
  console.log(HR);
}

// ── 0. Leer archivo ──────────────────────────────────────────────────────────
const fileName = process.argv[2] || 'input.txt';
const filePath = path.resolve(fileName);

if (!fs.existsSync(filePath)) {
  console.error(`❌  Archivo no encontrado: ${filePath}`);
  process.exit(1);
}

const source = fs.readFileSync(filePath, 'utf-8');
console.log(`\n📄  Procesando: ${filePath}`);

// ── 1. Análisis Léxico ────────────────────────────────────────────────────────
banner('1. ANÁLISIS LÉXICO');

const lexer  = new Lexer(source);
const tokens = lexer.tokenize();

// Tabla de lexemas/tokens
console.log('\n  TABLA DE LEXEMAS — TOKENS');
console.log('  ' + SEP);
console.log(`  ${'Línea'.padEnd(6)} ${'Col'.padEnd(5)} ${'Token'.padEnd(16)} Lexema`);
console.log('  ' + SEP);
tokens.forEach(t => {
  if (t.type !== TOKEN_TYPES.EOF)
    console.log(`  ${String(t.line).padEnd(6)} ${String(t.col).padEnd(5)} ${t.type.padEnd(16)} ${t.lexeme}`);
});
console.log('  ' + SEP);

if (lexer.errors.length > 0) {
  console.log('\n  ⚠  ERRORES LÉXICOS:');
  lexer.errors.forEach(e => console.log(`     Línea ${e.line}: ${e.msg}`));
} else {
  console.log('\n  ✅  Sin errores léxicos.');
}

// ── 2. Análisis Sintáctico ────────────────────────────────────────────────────
banner('2. ANÁLISIS SINTÁCTICO');

const parser = new Parser(tokens);
const ast    = parser.parse();

if (parser.errors.length > 0) {
  console.log('\n  ⚠  ERRORES SINTÁCTICOS:');
  parser.errors.forEach(e => console.log(`     Línea ${e.line}: ${e.msg}`));
} else {
  console.log('\n  ✅  La entrada es sintácticamente correcta.');
}

// ── 3. Árbol Sintáctico ───────────────────────────────────────────────────────
banner('3. ÁRBOL DE ANÁLISIS SINTÁCTICO');
console.log('\n' + printTree(ast));

// ── 4. Interpretación / Código JS ────────────────────────────────────────────
if (lexer.errors.length === 0 && parser.errors.length === 0) {
  banner('4. INTERPRETACIÓN');

  const interp = new Interpreter(ast);
  const result = interp.run();

  console.log('\n  ── Código JavaScript generado ──────────────────────────');
  result.jsCode.split('\n').forEach(l => console.log('  ' + l));

  console.log('\n  ── Salida de console.log / output() ────────────────────');
  result.outputs.forEach(o => console.log('  ' + o));

  if (Object.keys(result.env).length > 0) {
    console.log('\n  ── Variables en memoria ─────────────────────────────────');
    Object.entries(result.env).forEach(([k, v]) =>
      console.log(`  ${k.padEnd(16)} = ${v}`)
    );
  }
} else {
  banner('4. INTERPRETACIÓN');
  console.log('\n  ⛔  No se puede interpretar: existen errores léxicos o sintácticos.');
}

console.log('\n' + HR + '\n');
