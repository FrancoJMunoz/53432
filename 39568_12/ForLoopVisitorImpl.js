import ForLoopVisitor from './ForLoopVisitor.js';

class ForLoopVisitorImpl extends ForLoopVisitor {

    constructor() {
        super();
        this.variables = {}; // memoria de variables
    }

    visitPrograma(ctx) {
        ctx.instrucciones().instruccion().forEach(inst => this.visit(inst));
        return null;
    }

    visitInstruccion(ctx) {
        return this.visit(ctx.bucle());
    }

    visitBucle(ctx) {
        // Inicialización: i = 0
        this.visit(ctx.inicializacion());

        // Mientras la condición sea verdadera
        while (this.visit(ctx.condicion())) {
            // Ejecutar el cuerpo
            this.visit(ctx.sentencia());

            // Actualizar: i++ o i--
            const resultado = this.visit(ctx.actualizacion());

            // Si hubo break, salir del bucle
            if (resultado === 'break') break;
        }

        return null;
    }

    visitInicializacion(ctx) {
        const nombre = ctx.IDENTIFICADOR().getText();
        const valor  = parseInt(ctx.NUMERO().getText());
        this.variables[nombre] = valor;
        return null;
    }

    visitCondicion(ctx) {
        const nombre = ctx.IDENTIFICADOR().getText();
        const valor  = this.variables[nombre];
        const num    = parseInt(ctx.NUMERO().getText());
        const op     = ctx.operador_relacional().getText();

        switch (op) {
            case '<':  return valor < num;
            case '<=': return valor <= num;
            case '>':  return valor > num;
            case '>=': return valor >= num;
            case '==': return valor === num;
            case '!=': return valor !== num;
        }
    }

    visitActualizacion(ctx) {
        const nombre = ctx.IDENTIFICADOR().getText();
        const op     = ctx.operador_incremento().getText();

        if (op === '++') this.variables[nombre]++;
        if (op === '--') this.variables[nombre]--;

        return null;
    }

    visitSentencia(ctx) {
        for (const s of ctx.salida()) {
            const resultado = this.visit(s);
            if (resultado === 'break') return 'break';
        }
        if (ctx.terminar()) return this.visit(ctx.terminar());
        return null;
    }

    visitSalida(ctx) {
        const cadena = ctx.CADENA().getText();
        const texto  = cadena.slice(1, -1); // quita las comillas
        console.log(texto);
        return null;
    }

    visitTerminar(ctx) {
        return 'break'; // señal para salir del bucle
    }
}

export default ForLoopVisitorImpl;