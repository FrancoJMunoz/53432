# Analizador Léxico-Sintáctico — Tema 39568_20

Implementación de un analizador para un sub-lenguaje de JavaScript, desarrollado con JavaScript puro (arquitectura equivalente a ANTLR4 con target JS). Incluye interfaz web interactiva y herramienta de línea de comandos (Node.js).

---

## Gramática implementada

```
Program             ::= { SimpleStatement }
SimpleStatement     ::= AssignmentStatement | OutputStatement
AssignmentStatement ::= Identifier "=" Constant ";"
OutputStatement     ::= "output" "(" TextLiteral ")" ","
Constant            ::= Number | TextLiteral
TextLiteral         ::= '"' { any character except '"' } '"'
Identifier          ::= letter { letter | digit | "_" }
Number              ::= digit { digit }
```

---

## Estructura del repositorio

```
39568_20/
├── index.js                  ← CLI (Node.js)
├── analizador.html           ← Interfaz web interactiva
├── input.txt                 ← Archivo de entrada por defecto
├── gramatica.txt             ← Gramática en notación BNF
├── package.json
├── src/
│   ├── lexer.js              ← Analizador léxico
│   ├── parser.js             ← Analizador sintáctico (descenso recursivo)
│   └── interpreter.js        ← Intérprete / generador de código JS
└── examples/
    ├── ejemplo_correcto1.txt
    ├── ejemplo_correcto2.txt
    ├── ejemplo_incorrecto1.txt
    └── ejemplo_incorrecto2.txt
```

---

## Opción A — Interfaz Web (recomendada)

Abrir el archivo `analizador.html` directamente en cualquier navegador moderno (Chrome, Firefox, Edge).

**No requiere instalación ni servidor.**

### Funcionalidades de la interfaz:

| Pestaña | Contenido |
|---------|-----------|
| 🔤 Tokens | Tabla completa de lexemas y tokens reconocidos |
| ⚠ Errores | Lista de errores léxicos y sintácticos con número de línea |
| 🌳 Árbol | Árbol de análisis sintáctico concreto en formato texto |
| ▶ Interpretación | Código JS generado + salida de `output()` + variables en memoria |

- Botón **▶ Analizar** o `Ctrl+Enter` para ejecutar el análisis
- Menú desplegable para cargar los 4 ejemplos de prueba
- El editor soporta `Tab` para indentación

---

## Opción B — Línea de comandos (Node.js)

### Requisitos

- Node.js ≥ 14.0.0

### Ejecución

```bash
# Clonar el repositorio
git clone https://github.com/<tu-legajo>/<tu-legajo>.git
cd <tu-legajo>

# Analizar el archivo por defecto (input.txt)
node index.js

# Analizar un archivo específico
node index.js input.txt
node index.js examples/ejemplo_correcto1.txt
node index.js examples/ejemplo_incorrecto1.txt

# Atajos con npm scripts
npm run ejemplo1    # ejemplo_correcto1.txt
npm run ejemplo2    # ejemplo_correcto2.txt
npm run error1      # ejemplo_incorrecto1.txt
npm run error2      # ejemplo_incorrecto2.txt
```

### Salida del CLI

El programa imprime en consola:
1. **Tabla de lexemas–tokens** reconocidos durante el análisis léxico
2. **Errores léxicos** (si existen) con número de línea y descripción
3. **Errores sintácticos** (si existen) con número de línea y causa
4. **Árbol de análisis sintáctico** concreto en formato texto (con conectores └── / ├──)
5. **Código JavaScript generado** + variables en memoria + salida de `output()` (solo si no hay errores)

---

## Ejemplos incluidos

### ✅ Correcto 1 (`ejemplo_correcto1.txt`)
```
x = 42;
nombre = "Juan";
output("Hola mundo"),
edad = 25;
output("Fin del programa"),
```

### ✅ Correcto 2 (`ejemplo_correcto2.txt`)
```
valor1 = 100;
resultado = 999;
output("Suma calculada"),
output("Proceso exitoso"),
```

### ❌ Incorrecto 1 (`ejemplo_incorrecto1.txt`)
Error: falta `;` al final de la primera sentencia de asignación.

### ❌ Incorrecto 2 (`ejemplo_incorrecto2.txt`)
Error: falta `,` al final de la sentencia `output`.

---

## Módulos del analizador

| Módulo | Equivalente ANTLR4 | Descripción |
|--------|-------------------|-------------|
| `src/lexer.js` | Lexer generado | Tokenización manual carácter por carácter |
| `src/parser.js` | Parser generado | Descenso recursivo, construcción del AST |
| `src/interpreter.js` | Visitor/Listener | Recorre el AST y genera/ejecuta código JS |
| `index.js` | Main runner | Orquesta todos los módulos (CLI) |
| `analizador.html` | — | Frontend completo todo-en-uno |

---

## Tokens reconocidos

| Token | Descripción | Ejemplo |
|-------|-------------|---------|
| `KW_OUTPUT` | Palabra reservada | `output` |
| `ID` | Identificador | `nombre`, `x1` |
| `NUMBER` | Número entero | `42`, `100` |
| `TEXT` | Literal de texto | `"Hola"` |
| `ASSIGN` | Operador asignación | `=` |
| `SEMICOLON` | Punto y coma | `;` |
| `LPAREN` | Paréntesis abre | `(` |
| `RPAREN` | Paréntesis cierra | `)` |
| `COMMA` | Coma | `,` |
| `EOF` | Fin de archivo | — |
