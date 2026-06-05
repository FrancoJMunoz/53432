# ForLoop Analyzer

Analizador léxico, sintáctico y traductor de sentencias `for` escritas en un lenguaje simplificado tipo C, implementado con **ANTLR4** y **JavaScript (Node.js)**.

---

## Descripción

Este proyecto implementa un analizador completo para bucles `for` con la siguiente funcionalidad:

- **Análisis léxico**: detecta tokens y reporta caracteres no reconocidos
- **Análisis sintáctico**: valida la estructura del código y reporta errores
- **Árbol de derivación**: genera el árbol sintáctico del programa
- **Tabla de tokens**: muestra todos los lexemas encontrados con tipo, valor, línea y columna
- **Traducción a JavaScript**: convierte el código fuente a JavaScript equivalente
- **Ejecución/Interpretación**: ejecuta el programa e imprime la salida en consola

- **NOTA**: El analizador se realizó en base al ejemplo brindado por la profesora Claudia Naveda, de un analizador de PSeInt. Si bien no se encuentra la carpeta "Generated", los archivos creados automáticamente por ANTLR4 están en la carpeta "39568_12", opté por NO moverlos para no generar fallos en el código.
---

## Estructura del Proyecto

```
39568_12/
├── ejemplos_input/             # Archivos de ejemplo para probar el analizador
│   ├── inputcorrecto1.txt
│   ├── inputcorrecto2.txt
│   ├── inputincorrecto1.txt
│   └── inputincorrecto2.txt
├── node_modules/               # Dependencias instaladas por npm (no editar)
│   └── antlr4/
├── antlr-4.13.2-complete.jar   # Herramienta ANTLR4 para regenerar la gramática
├── ForLoop.g4                  # Gramática ANTLR4
├── ForLoop.interp              # Archivo generado por ANTLR4
├── ForLoop.tokens              # Archivo generado por ANTLR4
├── ForLoopLexer.interp         # Archivo generado por ANTLR4
├── ForLoopLexer.js             # Lexer generado por ANTLR4
├── ForLoopLexer.tokens         # Archivo generado por ANTLR4
├── ForLoopParser.js            # Parser generado por ANTLR4
├── ForLoopVisitor.js           # Visitor base generado por ANTLR4
├── ForLoopVisitorImpl.js       # Visitor intérprete (ejecuta el programa)
├── ForLoopTranslatorImpl.js    # Visitor traductor (genera código JavaScript)
├── index.js                    # Punto de entrada principal
├── input.txt                   # Archivo con el código fuente a analizar
├── package.json
└── package-lock.json
```

---

## Requisitos

- [Node.js](https://nodejs.org/) v18 o superior
- [Java](https://www.java.com/) (solo para regenerar la gramática)

---

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd 39568_12

# Instalar dependencias
npm install
```

---

## Uso

1. Escribí el código fuente a analizar en el archivo `input.txt`:

```c
for (i = 0; i < 10; i++) {
    printf("Hola mundo");
}
```

2. Ejecutá el analizador:

```bash
npm start
```

---

## Sintaxis Soportada

El lenguaje acepta uno o más bucles `for` con la siguiente estructura:

```
for (<variable> = <numero>; <variable> <op_relacional> <numero>; <variable> <op_incremento>) {
    printf("<cadena>");
    ...
    break;   (opcional)
}
```

### Operadores relacionales
| Símbolo | Significado   |
|---------|---------------|
| `<`     | Menor que     |
| `<=`    | Menor o igual |
| `>`     | Mayor que     |
| `>=`    | Mayor o igual |
| `==`    | Igual         |
| `!=`    | Distinto      |

### Operadores de incremento/decremento
| Símbolo | Significado |
|---------|-------------|
| `++`    | Incremento  |
| `--`    | Decremento  |

---

## Ejemplos

### Código válido

```c
for (i = 0; i < 3; i++) {
    printf("Hola mundo");
}
```

**Salida en consola:**
```
═══════════════════════════════════════════════════
  ANÁLISIS DEL CÓDIGO FUENTE
═══════════════════════════════════════════════════
✅ EL CÓDIGO ES CORRECTO
   No se encontraron errores léxicos ni sintácticos.
═══════════════════════════════════════════════════

--- Árbol sintáctico ---
(programa (instrucciones (instruccion (bucle for ( ... ) { ... }))) <EOF>)

--- Tabla de Símbolos (Tokens) ---
────────────────────────────────────────────────────────────
  #  │ Tipo          │ Valor       │ Línea │ Columna
────────────────────────────────────────────────────────────
  1  │ FOR           │ for         │     1 │       0
  2  │ LPAREN        │ (           │     1 │       4
  ...
────────────────────────────────────────────────────────────

--- Traducción a JavaScript ---
for (let i = 0; i < 3; i++) {
    console.log("Hola mundo");
}

--- Ejecutando programa ---
Hola mundo
Hola mundo
Hola mundo
--- Fin del programa ---
```

### Código con error léxico

```c
for (@x = 1; x < 5; x++) {
    printf("Error");
}
```

**Salida en consola:**
```
═══════════════════════════════════════════════════
  ANÁLISIS DEL CÓDIGO FUENTE
═══════════════════════════════════════════════════
❌ EL CÓDIGO TIENE 1 ERROR(ES)
   Léxicos:     1
   Sintácticos: 0
═══════════════════════════════════════════════════

🔤 ERRORES LÉXICOS (caracteres no reconocidos):
---------------------------------------------------
   1. Línea 1, columna 5
      → token recognition error at: '@'

⛔ El programa NO se ejecutará por contener errores.
```

---

## Regenerar la Gramática

Si modificás el archivo `ForLoop.g4`, regenerá los archivos con:

```bash
java -jar antlr-4.13.2-complete.jar -Dlanguage=JavaScript -visitor ForLoop.g4
```

---

## Gramática (resumen)

```antlr
programa      : instrucciones EOF ;
instrucciones : instruccion+ ;
instruccion   : bucle ;
bucle         : FOR LPAREN inicializacion SEMI condicion SEMI actualizacion RPAREN LBRACE sentencia RBRACE ;
inicializacion: IDENTIFICADOR ASSIGN NUMERO ;
condicion     : IDENTIFICADOR operador_relacional NUMERO ;
actualizacion : IDENTIFICADOR operador_incremento ;
sentencia     : salida+ | salida* terminar ;
salida        : PRINTF LPAREN CADENA RPAREN SEMI ;
terminar      : BREAK SEMI ;
```
