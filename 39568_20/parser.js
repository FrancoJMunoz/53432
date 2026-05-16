// parser.js — Analizador Sintáctico (Descenso Recursivo) para Tema 39568_20
// Gramática:
//   Program           ::= { SimpleStatement }
//   SimpleStatement   ::= AssignmentStatement | OutputStatement
//   AssignmentStatement ::= Identifier "=" Constant ";"
//   OutputStatement   ::= "output" "(" TextLiteral ")" ","
//   Constant          ::= Number | TextLiteral

const { TOKEN_TYPES } = typeof require !== 'undefined'
  ? require('./lexer.js')
  : window.__lexerModule;

// ── AST node helpers ──────────────────────────────────────────────────────────
function node(type, children = [], token = null) {
  return { type, children, token };
}

class Parser {
  constructor(tokens) {
    this.tokens  = tokens;
    this.pos     = 0;
    this.errors  = [];
  }

  peek()    { return this.tokens[this.pos]; }
  advance() { return this.tokens[this.pos < this.tokens.length - 1 ? this.pos++ : this.pos]; }

  match(type) {
    if (this.peek().type === type) return this.advance();
    return null;
  }

  expect(type, context) {
    const t = this.peek();
    if (t.type === type) return this.advance();
    this.errors.push({
      line: t.line,
      msg:  `[${context}] Se esperaba '${type}', se encontró '${t.type}' ("${t.lexeme}")`
    });
    return null; // no consume; intento de recuperación
  }

  // ── Parsing rules ───────────────────────────────────────────────────────────

  parseProgram() {
    const stmts = [];
    while (this.peek().type !== TOKEN_TYPES.EOF) {
      const prev = this.pos;
      const stmt = this.parseSimpleStatement();
      if (stmt) stmts.push(stmt);
      // panic recovery: si no avanzamos, consumimos un token para no ciclar
      if (this.pos === prev) {
        const bad = this.advance();
        this.errors.push({ line: bad.line, msg: `Token inesperado: '${bad.lexeme}'` });
      }
    }
    return node('Program', stmts);
  }

  parseSimpleStatement() {
    const t = this.peek();
    if (t.type === TOKEN_TYPES.KW_OUTPUT) return this.parseOutputStatement();
    if (t.type === TOKEN_TYPES.ID)        return this.parseAssignmentStatement();
    // error: no es un inicio válido de statement
    this.errors.push({ line: t.line, msg: `Inicio de sentencia inválido: '${t.lexeme}'` });
    return null;
  }

  parseAssignmentStatement() {
    const idTok  = this.expect(TOKEN_TYPES.ID,        'AssignmentStatement');
    const eqTok  = this.expect(TOKEN_TYPES.ASSIGN,    'AssignmentStatement');
    const valNode = this.parseConstant();
    const scTok  = this.expect(TOKEN_TYPES.SEMICOLON, 'AssignmentStatement');

    const children = [];
    if (idTok)  children.push(node('Identifier', [], idTok));
    if (eqTok)  children.push(node('=',          [], eqTok));
    if (valNode) children.push(valNode);
    if (scTok)  children.push(node(';',           [], scTok));
    return node('AssignmentStatement', children);
  }

  parseOutputStatement() {
    const kwTok = this.expect(TOKEN_TYPES.KW_OUTPUT, 'OutputStatement');
    const lpTok = this.expect(TOKEN_TYPES.LPAREN,    'OutputStatement');
    const txtNode = this.parseTextLiteral('OutputStatement');
    const rpTok = this.expect(TOKEN_TYPES.RPAREN,    'OutputStatement');
    const cmTok = this.expect(TOKEN_TYPES.COMMA,     'OutputStatement');

    const children = [];
    if (kwTok)  children.push(node('output',      [], kwTok));
    if (lpTok)  children.push(node('(',           [], lpTok));
    if (txtNode) children.push(txtNode);
    if (rpTok)  children.push(node(')',           [], rpTok));
    if (cmTok)  children.push(node(',',           [], cmTok));
    return node('OutputStatement', children);
  }

  parseConstant() {
    const t = this.peek();
    if (t.type === TOKEN_TYPES.NUMBER) {
      this.advance();
      return node('Constant', [node('Number', [], t)], t);
    }
    if (t.type === TOKEN_TYPES.TEXT) {
      this.advance();
      return node('Constant', [node('TextLiteral', [], t)], t);
    }
    this.errors.push({ line: t.line, msg: `Se esperaba Number o TextLiteral, se encontró '${t.type}' ("${t.lexeme}")` });
    return null;
  }

  parseTextLiteral(context) {
    const t = this.peek();
    if (t.type === TOKEN_TYPES.TEXT) {
      this.advance();
      return node('TextLiteral', [], t);
    }
    this.errors.push({ line: t.line, msg: `[${context}] Se esperaba un TextLiteral, se encontró '${t.type}' ("${t.lexeme}")` });
    return null;
  }

  parse() {
    return this.parseProgram();
  }
}

// ── Tree printer ──────────────────────────────────────────────────────────────
function printTree(n, prefix = '', isLast = true) {
  if (!n) return '';
  const connector = isLast ? '└── ' : '├── ';
  const label = n.token
    ? `${n.type}  [${n.token.lexeme}]`
    : n.type;
  let out = prefix + connector + label + '\n';
  const childPrefix = prefix + (isLast ? '    ' : '│   ');
  n.children.forEach((ch, i) => {
    out += printTree(ch, childPrefix, i === n.children.length - 1);
  });
  return out;
}

if (typeof module !== 'undefined') { module.exports = { Parser, printTree }; }
