// interpreter.js — Interprete / Generador de código JS para Tema 39568_20

class Interpreter {
  constructor(ast) {
    this.ast     = ast;
    this.env     = {};   // tabla de variables
    this.outputs = [];   // salida de instrucciones output()
    this.jsLines = [];   // código JS generado
  }

  run() {
    for (const stmt of this.ast.children) {
      this.execStatement(stmt);
    }
    return { env: this.env, outputs: this.outputs, jsCode: this.jsLines.join('\n') };
  }

  execStatement(stmt) {
    if (!stmt) return;
    if (stmt.type === 'AssignmentStatement') this.execAssignment(stmt);
    else if (stmt.type === 'OutputStatement') this.execOutput(stmt);
  }

  execAssignment(stmt) {
    const idNode  = stmt.children.find(c => c.type === 'Identifier');
    const valNode = stmt.children.find(c => c.type === 'Constant');
    if (!idNode || !valNode) return;

    const name     = idNode.token.lexeme;
    const constChild = valNode.children[0];
    let value;
    if (constChild.type === 'Number')      value = parseInt(constChild.token.lexeme, 10);
    else if (constChild.type === 'TextLiteral') value = constChild.token.lexeme; // includes quotes

    this.env[name] = value;

    // generate JS
    if (typeof value === 'number') this.jsLines.push(`let ${name} = ${value};`);
    else                           this.jsLines.push(`let ${name} = ${value};`);
  }

  execOutput(stmt) {
    const txtNode = stmt.children.find(c => c.type === 'TextLiteral');
    if (!txtNode) return;
    const raw  = txtNode.token.lexeme;                     // "Hello"
    const text = raw.slice(1, raw.length - 1);             // Hello
    this.outputs.push(text);
    this.jsLines.push(`console.log(${raw});`);
  }
}

if (typeof module !== 'undefined') { module.exports = { Interpreter }; }
