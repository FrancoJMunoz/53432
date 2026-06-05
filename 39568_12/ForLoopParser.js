// Generated from ForLoop.g4 by ANTLR 4.13.2
// jshint ignore: start
import antlr4 from 'antlr4';
import ForLoopVisitor from './ForLoopVisitor.js';

const serializedATN = [4,1,21,85,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,
2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,1,0,1,0,1,0,
1,1,4,1,29,8,1,11,1,12,1,30,1,2,1,2,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,
1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,6,1,6,1,6,1,7,1,7,1,8,1,8,
1,9,4,9,63,8,9,11,9,12,9,64,1,9,5,9,68,8,9,10,9,12,9,71,9,9,1,9,3,9,74,8,
9,1,10,1,10,1,10,1,10,1,10,1,10,1,11,1,11,1,11,1,11,0,0,12,0,2,4,6,8,10,
12,14,16,18,20,22,0,2,1,0,4,9,1,0,10,11,76,0,24,1,0,0,0,2,28,1,0,0,0,4,32,
1,0,0,0,6,34,1,0,0,0,8,46,1,0,0,0,10,50,1,0,0,0,12,54,1,0,0,0,14,57,1,0,
0,0,16,59,1,0,0,0,18,73,1,0,0,0,20,75,1,0,0,0,22,81,1,0,0,0,24,25,3,2,1,
0,25,26,5,0,0,1,26,1,1,0,0,0,27,29,3,4,2,0,28,27,1,0,0,0,29,30,1,0,0,0,30,
28,1,0,0,0,30,31,1,0,0,0,31,3,1,0,0,0,32,33,3,6,3,0,33,5,1,0,0,0,34,35,5,
1,0,0,35,36,5,14,0,0,36,37,3,8,4,0,37,38,5,13,0,0,38,39,3,10,5,0,39,40,5,
13,0,0,40,41,3,12,6,0,41,42,5,15,0,0,42,43,5,16,0,0,43,44,3,18,9,0,44,45,
5,17,0,0,45,7,1,0,0,0,46,47,5,18,0,0,47,48,5,12,0,0,48,49,5,19,0,0,49,9,
1,0,0,0,50,51,5,18,0,0,51,52,3,14,7,0,52,53,5,19,0,0,53,11,1,0,0,0,54,55,
5,18,0,0,55,56,3,16,8,0,56,13,1,0,0,0,57,58,7,0,0,0,58,15,1,0,0,0,59,60,
7,1,0,0,60,17,1,0,0,0,61,63,3,20,10,0,62,61,1,0,0,0,63,64,1,0,0,0,64,62,
1,0,0,0,64,65,1,0,0,0,65,74,1,0,0,0,66,68,3,20,10,0,67,66,1,0,0,0,68,71,
1,0,0,0,69,67,1,0,0,0,69,70,1,0,0,0,70,72,1,0,0,0,71,69,1,0,0,0,72,74,3,
22,11,0,73,62,1,0,0,0,73,69,1,0,0,0,74,19,1,0,0,0,75,76,5,2,0,0,76,77,5,
14,0,0,77,78,5,20,0,0,78,79,5,15,0,0,79,80,5,13,0,0,80,21,1,0,0,0,81,82,
5,3,0,0,82,83,5,13,0,0,83,23,1,0,0,0,4,30,64,69,73];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class ForLoopParser extends antlr4.Parser {

    static grammarFileName = "ForLoop.g4";
    static literalNames = [ null, "'for'", "'printf'", "'break'", "'<'", 
                            "'<='", "'>'", "'>='", "'=='", "'!='", "'++'", 
                            "'--'", "'='", "';'", "'('", "')'", "'{'", "'}'" ];
    static symbolicNames = [ null, "FOR", "PRINTF", "BREAK", "LT", "LE", 
                             "GT", "GE", "EQ", "NEQ", "INC", "DEC", "ASSIGN", 
                             "SEMI", "LPAREN", "RPAREN", "LBRACE", "RBRACE", 
                             "IDENTIFICADOR", "NUMERO", "CADENA", "WS" ];
    static ruleNames = [ "programa", "instrucciones", "instruccion", "bucle", 
                         "inicializacion", "condicion", "actualizacion", 
                         "operador_relacional", "operador_incremento", "sentencia", 
                         "salida", "terminar" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = ForLoopParser.ruleNames;
        this.literalNames = ForLoopParser.literalNames;
        this.symbolicNames = ForLoopParser.symbolicNames;
    }



	programa() {
	    let localctx = new ProgramaContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, ForLoopParser.RULE_programa);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 24;
	        this.instrucciones();
	        this.state = 25;
	        this.match(ForLoopParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	instrucciones() {
	    let localctx = new InstruccionesContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, ForLoopParser.RULE_instrucciones);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 28; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 27;
	            this.instruccion();
	            this.state = 30; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===1);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	instruccion() {
	    let localctx = new InstruccionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, ForLoopParser.RULE_instruccion);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 32;
	        this.bucle();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	bucle() {
	    let localctx = new BucleContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, ForLoopParser.RULE_bucle);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 34;
	        this.match(ForLoopParser.FOR);
	        this.state = 35;
	        this.match(ForLoopParser.LPAREN);
	        this.state = 36;
	        this.inicializacion();
	        this.state = 37;
	        this.match(ForLoopParser.SEMI);
	        this.state = 38;
	        this.condicion();
	        this.state = 39;
	        this.match(ForLoopParser.SEMI);
	        this.state = 40;
	        this.actualizacion();
	        this.state = 41;
	        this.match(ForLoopParser.RPAREN);
	        this.state = 42;
	        this.match(ForLoopParser.LBRACE);
	        this.state = 43;
	        this.sentencia();
	        this.state = 44;
	        this.match(ForLoopParser.RBRACE);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	inicializacion() {
	    let localctx = new InicializacionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, ForLoopParser.RULE_inicializacion);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 46;
	        this.match(ForLoopParser.IDENTIFICADOR);
	        this.state = 47;
	        this.match(ForLoopParser.ASSIGN);
	        this.state = 48;
	        this.match(ForLoopParser.NUMERO);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	condicion() {
	    let localctx = new CondicionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, ForLoopParser.RULE_condicion);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 50;
	        this.match(ForLoopParser.IDENTIFICADOR);
	        this.state = 51;
	        this.operador_relacional();
	        this.state = 52;
	        this.match(ForLoopParser.NUMERO);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	actualizacion() {
	    let localctx = new ActualizacionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, ForLoopParser.RULE_actualizacion);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 54;
	        this.match(ForLoopParser.IDENTIFICADOR);
	        this.state = 55;
	        this.operador_incremento();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	operador_relacional() {
	    let localctx = new Operador_relacionalContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, ForLoopParser.RULE_operador_relacional);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 57;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) === 0 && ((1 << _la) & 1008) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	operador_incremento() {
	    let localctx = new Operador_incrementoContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, ForLoopParser.RULE_operador_incremento);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 59;
	        _la = this._input.LA(1);
	        if(!(_la===10 || _la===11)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	sentencia() {
	    let localctx = new SentenciaContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, ForLoopParser.RULE_sentencia);
	    var _la = 0;
	    try {
	        this.state = 73;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 62; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            do {
	                this.state = 61;
	                this.salida();
	                this.state = 64; 
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            } while(_la===2);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 69;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===2) {
	                this.state = 66;
	                this.salida();
	                this.state = 71;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 72;
	            this.terminar();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	salida() {
	    let localctx = new SalidaContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, ForLoopParser.RULE_salida);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 75;
	        this.match(ForLoopParser.PRINTF);
	        this.state = 76;
	        this.match(ForLoopParser.LPAREN);
	        this.state = 77;
	        this.match(ForLoopParser.CADENA);
	        this.state = 78;
	        this.match(ForLoopParser.RPAREN);
	        this.state = 79;
	        this.match(ForLoopParser.SEMI);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	terminar() {
	    let localctx = new TerminarContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, ForLoopParser.RULE_terminar);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 81;
	        this.match(ForLoopParser.BREAK);
	        this.state = 82;
	        this.match(ForLoopParser.SEMI);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

ForLoopParser.EOF = antlr4.Token.EOF;
ForLoopParser.FOR = 1;
ForLoopParser.PRINTF = 2;
ForLoopParser.BREAK = 3;
ForLoopParser.LT = 4;
ForLoopParser.LE = 5;
ForLoopParser.GT = 6;
ForLoopParser.GE = 7;
ForLoopParser.EQ = 8;
ForLoopParser.NEQ = 9;
ForLoopParser.INC = 10;
ForLoopParser.DEC = 11;
ForLoopParser.ASSIGN = 12;
ForLoopParser.SEMI = 13;
ForLoopParser.LPAREN = 14;
ForLoopParser.RPAREN = 15;
ForLoopParser.LBRACE = 16;
ForLoopParser.RBRACE = 17;
ForLoopParser.IDENTIFICADOR = 18;
ForLoopParser.NUMERO = 19;
ForLoopParser.CADENA = 20;
ForLoopParser.WS = 21;

ForLoopParser.RULE_programa = 0;
ForLoopParser.RULE_instrucciones = 1;
ForLoopParser.RULE_instruccion = 2;
ForLoopParser.RULE_bucle = 3;
ForLoopParser.RULE_inicializacion = 4;
ForLoopParser.RULE_condicion = 5;
ForLoopParser.RULE_actualizacion = 6;
ForLoopParser.RULE_operador_relacional = 7;
ForLoopParser.RULE_operador_incremento = 8;
ForLoopParser.RULE_sentencia = 9;
ForLoopParser.RULE_salida = 10;
ForLoopParser.RULE_terminar = 11;

class ProgramaContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ForLoopParser.RULE_programa;
    }

	instrucciones() {
	    return this.getTypedRuleContext(InstruccionesContext,0);
	};

	EOF() {
	    return this.getToken(ForLoopParser.EOF, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof ForLoopVisitor ) {
	        return visitor.visitPrograma(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class InstruccionesContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ForLoopParser.RULE_instrucciones;
    }

	instruccion = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(InstruccionContext);
	    } else {
	        return this.getTypedRuleContext(InstruccionContext,i);
	    }
	};

	accept(visitor) {
	    if ( visitor instanceof ForLoopVisitor ) {
	        return visitor.visitInstrucciones(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class InstruccionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ForLoopParser.RULE_instruccion;
    }

	bucle() {
	    return this.getTypedRuleContext(BucleContext,0);
	};

	accept(visitor) {
	    if ( visitor instanceof ForLoopVisitor ) {
	        return visitor.visitInstruccion(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class BucleContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ForLoopParser.RULE_bucle;
    }

	FOR() {
	    return this.getToken(ForLoopParser.FOR, 0);
	};

	LPAREN() {
	    return this.getToken(ForLoopParser.LPAREN, 0);
	};

	inicializacion() {
	    return this.getTypedRuleContext(InicializacionContext,0);
	};

	SEMI = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ForLoopParser.SEMI);
	    } else {
	        return this.getToken(ForLoopParser.SEMI, i);
	    }
	};


	condicion() {
	    return this.getTypedRuleContext(CondicionContext,0);
	};

	actualizacion() {
	    return this.getTypedRuleContext(ActualizacionContext,0);
	};

	RPAREN() {
	    return this.getToken(ForLoopParser.RPAREN, 0);
	};

	LBRACE() {
	    return this.getToken(ForLoopParser.LBRACE, 0);
	};

	sentencia() {
	    return this.getTypedRuleContext(SentenciaContext,0);
	};

	RBRACE() {
	    return this.getToken(ForLoopParser.RBRACE, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof ForLoopVisitor ) {
	        return visitor.visitBucle(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class InicializacionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ForLoopParser.RULE_inicializacion;
    }

	IDENTIFICADOR() {
	    return this.getToken(ForLoopParser.IDENTIFICADOR, 0);
	};

	ASSIGN() {
	    return this.getToken(ForLoopParser.ASSIGN, 0);
	};

	NUMERO() {
	    return this.getToken(ForLoopParser.NUMERO, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof ForLoopVisitor ) {
	        return visitor.visitInicializacion(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class CondicionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ForLoopParser.RULE_condicion;
    }

	IDENTIFICADOR() {
	    return this.getToken(ForLoopParser.IDENTIFICADOR, 0);
	};

	operador_relacional() {
	    return this.getTypedRuleContext(Operador_relacionalContext,0);
	};

	NUMERO() {
	    return this.getToken(ForLoopParser.NUMERO, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof ForLoopVisitor ) {
	        return visitor.visitCondicion(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ActualizacionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ForLoopParser.RULE_actualizacion;
    }

	IDENTIFICADOR() {
	    return this.getToken(ForLoopParser.IDENTIFICADOR, 0);
	};

	operador_incremento() {
	    return this.getTypedRuleContext(Operador_incrementoContext,0);
	};

	accept(visitor) {
	    if ( visitor instanceof ForLoopVisitor ) {
	        return visitor.visitActualizacion(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Operador_relacionalContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ForLoopParser.RULE_operador_relacional;
    }

	LT() {
	    return this.getToken(ForLoopParser.LT, 0);
	};

	LE() {
	    return this.getToken(ForLoopParser.LE, 0);
	};

	GT() {
	    return this.getToken(ForLoopParser.GT, 0);
	};

	GE() {
	    return this.getToken(ForLoopParser.GE, 0);
	};

	EQ() {
	    return this.getToken(ForLoopParser.EQ, 0);
	};

	NEQ() {
	    return this.getToken(ForLoopParser.NEQ, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof ForLoopVisitor ) {
	        return visitor.visitOperador_relacional(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Operador_incrementoContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ForLoopParser.RULE_operador_incremento;
    }

	INC() {
	    return this.getToken(ForLoopParser.INC, 0);
	};

	DEC() {
	    return this.getToken(ForLoopParser.DEC, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof ForLoopVisitor ) {
	        return visitor.visitOperador_incremento(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class SentenciaContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ForLoopParser.RULE_sentencia;
    }

	salida = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(SalidaContext);
	    } else {
	        return this.getTypedRuleContext(SalidaContext,i);
	    }
	};

	terminar() {
	    return this.getTypedRuleContext(TerminarContext,0);
	};

	accept(visitor) {
	    if ( visitor instanceof ForLoopVisitor ) {
	        return visitor.visitSentencia(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class SalidaContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ForLoopParser.RULE_salida;
    }

	PRINTF() {
	    return this.getToken(ForLoopParser.PRINTF, 0);
	};

	LPAREN() {
	    return this.getToken(ForLoopParser.LPAREN, 0);
	};

	CADENA() {
	    return this.getToken(ForLoopParser.CADENA, 0);
	};

	RPAREN() {
	    return this.getToken(ForLoopParser.RPAREN, 0);
	};

	SEMI() {
	    return this.getToken(ForLoopParser.SEMI, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof ForLoopVisitor ) {
	        return visitor.visitSalida(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class TerminarContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ForLoopParser.RULE_terminar;
    }

	BREAK() {
	    return this.getToken(ForLoopParser.BREAK, 0);
	};

	SEMI() {
	    return this.getToken(ForLoopParser.SEMI, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof ForLoopVisitor ) {
	        return visitor.visitTerminar(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}




ForLoopParser.ProgramaContext = ProgramaContext; 
ForLoopParser.InstruccionesContext = InstruccionesContext; 
ForLoopParser.InstruccionContext = InstruccionContext; 
ForLoopParser.BucleContext = BucleContext; 
ForLoopParser.InicializacionContext = InicializacionContext; 
ForLoopParser.CondicionContext = CondicionContext; 
ForLoopParser.ActualizacionContext = ActualizacionContext; 
ForLoopParser.Operador_relacionalContext = Operador_relacionalContext; 
ForLoopParser.Operador_incrementoContext = Operador_incrementoContext; 
ForLoopParser.SentenciaContext = SentenciaContext; 
ForLoopParser.SalidaContext = SalidaContext; 
ForLoopParser.TerminarContext = TerminarContext; 
