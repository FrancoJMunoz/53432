import ForLoopVisitor from './ForLoopVisitor.js';

class ForLoopTranslatorImpl extends ForLoopVisitor {

    constructor() {
        super();
        this.indent = 0;
    }

    pad() {
        return '    '.repeat(this.indent);
    }

    visitPrograma(ctx) {
        const cuerpo = ctx.instrucciones().instruccion()
            .map(i => this.visit(i))
            .join('\n');
        return cuerpo;
    }

    visitInstruccion(ctx) {
        return this.visit(ctx.bucle());
    }

    visitBucle(ctx) {
        const init  = this.visit(ctx.inicializacion());
        const cond  = this.visit(ctx.condicion());
        const act   = this.visit(ctx.actualizacion());

        this.indent++;
        const cuerpo = this.visit(ctx.sentencia());
        this.indent--;

        return `for (${init}; ${cond}; ${act}) {\n${cuerpo}\n}`;
    }

    visitInicializacion(ctx) {
        const id  = ctx.IDENTIFICADOR().getText();
        const num = ctx.NUMERO().getText();
        return `let ${id} = ${num}`;
    }

    visitCondicion(ctx) {
        const id  = ctx.IDENTIFICADOR().getText();
        const op  = this.visit(ctx.operador_relacional());
        const num = ctx.NUMERO().getText();
        return `${id} ${op} ${num}`;
    }

    visitActualizacion(ctx) {
        const id = ctx.IDENTIFICADOR().getText();
        const op = this.visit(ctx.operador_incremento());
        return `${id}${op}`;
    }

    visitOperador_relacional(ctx) {
        return ctx.getText();
    }

    visitOperador_incremento(ctx) {
        return ctx.getText();
    }

    visitSentencia(ctx) {
        const salidas = ctx.salida().map(s => this.visit(s)).join('\n');
        const terminar = ctx.terminar() ? '\n' + this.visit(ctx.terminar()) : '';
        return salidas + terminar;
    }

    visitSalida(ctx) {
        const cadena = ctx.CADENA().getText();
        return `${this.pad()}console.log(${cadena});`;
    }

    visitTerminar(ctx) {
        return `${this.pad()}break;`;
    }
}

export default ForLoopTranslatorImpl;