// lexer.js — Analizador Léxico para el sub-lenguaje JavaScript (Tema 39568_20)

const TOKEN_TYPES = {
  KW_OUTPUT: 'KW_OUTPUT',
  ASSIGN:    'ASSIGN',
  SEMICOLON: 'SEMICOLON',
  LPAREN:    'LPAREN',
  RPAREN:    'RPAREN',
  COMMA:     'COMMA',
  NUMBER:    'NUMBER',
  TEXT:      'TEXT',
  ID:        'ID',
  EOF:       'EOF',
  ERROR:     'ERROR',
};

class Token {
  constructor(type, lexeme, line, col) {
    this.type   = type;
    this.lexeme = lexeme;
    this.line   = line;
    this.col    = col;
  }
}

class Lexer {
  constructor(source) {
    this.source = source;
    this.pos    = 0;
    this.line   = 1;
    this.col    = 1;
    this.errors = [];
  }

  peek()    { return this.source[this.pos] || null; }
  advance() {
    const ch = this.source[this.pos++];
    if (ch === '\n') { this.line++; this.col = 1; }
    else             { this.col++; }
    return ch;
  }

  skipWhitespace() {
    while (this.pos < this.source.length && /\s/.test(this.peek())) this.advance();
  }

  readNumber(startLine, startCol) {
    let lex = '';
    while (this.peek() && /[0-9]/.test(this.peek())) lex += this.advance();
    return new Token(TOKEN_TYPES.NUMBER, lex, startLine, startCol);
  }

  readIdentifierOrKeyword(startLine, startCol) {
    let lex = '';
    while (this.peek() && /[a-zA-Z0-9_]/.test(this.peek())) lex += this.advance();
    const type = lex === 'output' ? TOKEN_TYPES.KW_OUTPUT : TOKEN_TYPES.ID;
    return new Token(type, lex, startLine, startCol);
  }

  readText(startLine, startCol) {
    let lex = '"';
    this.advance(); // consume opening "
    while (this.pos < this.source.length && this.peek() !== '"') {
      if (this.peek() === '\n') {
        this.errors.push({ line: startLine, msg: 'Cadena de texto sin cerrar (falta "")' });
        return new Token(TOKEN_TYPES.ERROR, lex, startLine, startCol);
      }
      lex += this.advance();
    }
    if (this.peek() === '"') {
      lex += this.advance(); // consume closing "
      return new Token(TOKEN_TYPES.TEXT, lex, startLine, startCol);
    }
    this.errors.push({ line: startLine, msg: 'Cadena de texto sin cerrar (falta "")' });
    return new Token(TOKEN_TYPES.ERROR, lex, startLine, startCol);
  }

  tokenize() {
    const tokens = [];
    while (this.pos < this.source.length) {
      this.skipWhitespace();
      if (this.pos >= this.source.length) break;

      const startLine = this.line;
      const startCol  = this.col;
      const ch        = this.peek();

      if (/[0-9]/.test(ch)) {
        tokens.push(this.readNumber(startLine, startCol));
      } else if (/[a-zA-Z]/.test(ch)) {
        tokens.push(this.readIdentifierOrKeyword(startLine, startCol));
      } else if (ch === '"') {
        tokens.push(this.readText(startLine, startCol));
      } else if (ch === '=') { this.advance(); tokens.push(new Token(TOKEN_TYPES.ASSIGN,    '=', startLine, startCol)); }
      else if (ch === ';') { this.advance(); tokens.push(new Token(TOKEN_TYPES.SEMICOLON, ';', startLine, startCol)); }
      else if (ch === '(') { this.advance(); tokens.push(new Token(TOKEN_TYPES.LPAREN,    '(', startLine, startCol)); }
      else if (ch === ')') { this.advance(); tokens.push(new Token(TOKEN_TYPES.RPAREN,    ')', startLine, startCol)); }
      else if (ch === ',') { this.advance(); tokens.push(new Token(TOKEN_TYPES.COMMA,     ',', startLine, startCol)); }
      else {
        this.advance();
        this.errors.push({ line: startLine, msg: `Carácter desconocido: '${ch}'` });
        tokens.push(new Token(TOKEN_TYPES.ERROR, ch, startLine, startCol));
      }
    }
    tokens.push(new Token(TOKEN_TYPES.EOF, '<EOF>', this.line, this.col));
    return tokens;
  }
}

// ── exports for Node.js and browser ──────────────────────────────────────────
if (typeof module !== 'undefined') { module.exports = { Lexer, Token, TOKEN_TYPES }; }
