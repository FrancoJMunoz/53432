grammar ForLoop;

// ─────────────────────────────────────────
//  REGLAS DE PARSER
// ─────────────────────────────────────────

programa
    : instrucciones EOF
    ;

instrucciones
    : instruccion+
    ;

instruccion
    : bucle
    ;

bucle
    : FOR LPAREN inicializacion SEMI condicion SEMI actualizacion RPAREN LBRACE sentencia RBRACE
    ;

inicializacion
    : IDENTIFICADOR ASSIGN NUMERO
    ;

condicion
    : IDENTIFICADOR operador_relacional NUMERO
    ;

actualizacion
    : IDENTIFICADOR operador_incremento
    ;

operador_relacional
    : LT
    | LE
    | GT
    | GE
    | EQ
    | NEQ
    ;

operador_incremento
    : INC
    | DEC
    ;

sentencia
    : salida+
    | salida* terminar
    ;

salida
    : PRINTF LPAREN CADENA RPAREN SEMI
    ;

terminar
    : BREAK SEMI
    ;

// ─────────────────────────────────────────
//  REGLAS DE LEXER
// ─────────────────────────────────────────

// Palabras clave
FOR     : 'for'    ;
PRINTF  : 'printf' ;
BREAK   : 'break'  ;

// Operadores relacionales
LT  : '<'  ;
LE  : '<=' ;
GT  : '>'  ;
GE  : '>=' ;
EQ  : '==' ;
NEQ : '!=' ;

// Operadores de incremento/decremento
INC : '++' ;
DEC : '--' ;

// Operadores y puntuación
ASSIGN : '='  ;
SEMI   : ';'  ;
LPAREN : '('  ;
RPAREN : ')'  ;
LBRACE : '{'  ;
RBRACE : '}'  ;

// Identificador: letra seguida de letras o dígitos
IDENTIFICADOR
    : LETRA (LETRA | DIGITO)*
    ;

// Número: uno o más dígitos
NUMERO
    : DIGITO+
    ;

// Cadena: texto entre comillas dobles con letras, dígitos y símbolos
CADENA
    : '"' CARACTER* '"'
    ;

// ─────────────────────────────────────────
//  FRAGMENTOS (auxiliares del lexer)
// ─────────────────────────────────────────

fragment CARACTER
    : LETRA
    | DIGITO
    | SIMBOLO
    ;

fragment LETRA
    : [a-zA-Z]
    ;

fragment DIGITO
    : [0-9]
    ;

fragment SIMBOLO
    : [.,!?:; ]
    | '\''
    ;

// Ignorar espacios en blanco y saltos de línea
WS
    : [ \t\r\n]+ -> skip
    ;
