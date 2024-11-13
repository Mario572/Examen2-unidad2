class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.derecha = null;
        this.izquierda = null;
    }
}

class Arbol {
    constructor() {
        this.ruta = null;
    }
    
    // Método para verificar si el árbol está vacío
    isEmpty() {
        return this.ruta === null;
    }
    
    // Método para añadir un valor
    add(valor) {
        if (this.isEmpty()) {
            this.ruta = new Nodo(valor);
            return;
        }

        let aux = this.ruta;

        while (aux) {
            if (valor < aux.valor) {
                if (aux.izquierda) {
                    aux = aux.izquierda;
                } else {
                    aux.izquierda = new Nodo(valor);
                    return;
                }
            } else {
                if (aux.derecha) {
                    aux = aux.derecha;
                } else {
                    aux.derecha = new Nodo(valor);
                    return;
                }
            }
        }
    }
    
    // Método para buscar un valor
    buscar(valor) {
        let aux = this.ruta;
        while (aux) {
            if (valor === aux.valor) {
                return true; // Valor encontrado
            } else if (valor < aux.valor) {
                aux = aux.izquierda;
            } else {
                aux = aux.derecha;
            }
        }
        return false; // Valor no encontrado
    }

    // Método para eliminar un nodo
    eliminar(valor) {
        this.ruta = this._eliminarNodo(this.ruta, valor);
    }
    
    _eliminarNodo(nodo, valor) {
        if (!nodo) {
            return null;
        }

        if (valor < nodo.valor) {
            nodo.izquierda = this._eliminarNodo(nodo.izquierda, valor);
        } else if (valor > nodo.valor) {
            nodo.derecha = this._eliminarNodo(nodo.derecha, valor);
        } else {
            // Nodo encontrado
            if (!nodo.izquierda) {
                return nodo.derecha;
            } else if (!nodo.derecha) {
                return nodo.izquierda;
            }

            // Nodo con dos hijos
            let minNodo = this._encontrarMin(nodo.derecha);
            nodo.valor = minNodo.valor;
            nodo.derecha = this._eliminarNodo(nodo.derecha, minNodo.valor);
        }

        return nodo;
    }

    // Encuentra el nodo con el valor mínimo en un subárbol
    _encontrarMin(nodo) {
        while (nodo.izquierda) {
            nodo = nodo.izquierda;
        }
        return nodo;
    }

    // Método para mostrar el árbol en la consola
    imprimirEnConsola(nodo = this.ruta, espacio = 0, nivel = 10) {
        if (nodo === null) {
            return;
        }

        espacio += nivel;
        this.imprimirEnConsola(nodo.derecha, espacio);

        console.log(" ".repeat(espacio - nivel) + nodo.valor);

        this.imprimirEnConsola(nodo.izquierda, espacio);
    }
}

// Pruebas
let arbol = new Arbol();
arbol.add(10);
arbol.add(5);
arbol.add(15);
arbol.add(3);
arbol.add(7);
arbol.add(12);
arbol.add(18);

console.log("Árbol original:");
arbol.imprimirEnConsola();

console.log("Buscar 7:", arbol.buscar(7));  // Debe devolver true
console.log("Buscar 20:", arbol.buscar(20));  // Debe devolver false

arbol.eliminar(5);
console.log("Árbol después de eliminar 5:");
arbol.imprimirEnConsola();


