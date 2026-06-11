import { useState } from 'react';
import './App.css';

function App() {
  const [pantalla, setPantalla] = useState("0");
  const [valorAnterior, setValorAnterior] = useState("");
  const [operacion, setOperacion] = useState(null);
  const [reiniciarPantalla, setReiniciarPantalla] = useState(false);

  // 1. Agregar números a la pantalla
  const agregarValor = (valor) => {
    if (pantalla === "0" || reiniciarPantalla) {
      setPantalla(valor);
      setReiniciarPantalla(false);
    } else {
      setPantalla(pantalla + valor);
    }
  };

  // 2. Agregar el punto decimal sin duplicados
  const agregarDecimal = () => {
    if (reiniciarPantalla) {
      setPantalla("0.");
      setReiniciarPantalla(false);
      return;
    }
    if (!pantalla.includes(".")) {
      setPantalla(pantalla + ".");
    }
  };

  // 3. Cambiar de signo (+/-)
  const cambiarSigno = () => {
    setPantalla((parseFloat(pantalla) * -1).toString());
  };

  // 4. Botón limpiar (AC)
  const limpiar = () => {
    setPantalla("0");
    setValorAnterior("");
    setOperacion(null);
    setReiniciarPantalla(false);
  };

  // 5. Botón borrar (Retroceso)
  const borrar = () => {
    if (pantalla.length > 1) {
      setPantalla(pantalla.slice(0, -1));
    } else {
      setPantalla("0");
    }
  };

  // 6. Configurar la operación (+, -, *, /)
  const manejarOperacion = (op) => {
    if (operacion !== null) {
      const resultadoParcial = ejecutarCalculo();
      setValorAnterior(resultadoParcial);
      setPantalla(resultadoParcial);
    } else {
      setValorAnterior(pantalla);
    }
    setOperacion(op);
    setReiniciarPantalla(true);
  };

  // 7. Lógica matemática manual (Sin usar eval)
  const ejecutarCalculo = () => {
    if (!operacion) return pantalla;

    const prev = parseFloat(valorAnterior);
    const actual = parseFloat(pantalla);
    let resultado = 0;

    switch (operacion) {
      case "+": resultado = prev + actual; break;
      case "-": resultado = prev - actual; break;
      case "*": resultado = prev * actual; break;
      case "/": 
        resultado = actual === 0 ? "Error" : prev / actual; 
        break;
      default: return pantalla;
    }

    // Limitar decimales flotantes largos
    if (typeof resultado === "number" && !Number.isInteger(resultado)) {
      resultado = Math.round(resultado * 10000000) / 10000000;
    }

    return resultado.toString();
  };

  const calcular = () => {
    const resultadoFinal = ejecutarCalculo();
    setPantalla(resultadoFinal);
    setOperacion(null);
    setReiniciarPantalla(true);
  };

  return (
    <div className="calculadora">
      <h1>Calculadora</h1>
      
      <input 
        type="text" 
        value={pantalla} 
        readOnly 
        className="pantalla" 
      />

      <div className="botones">
        {/* Fila Funciones (Aquí está la corrección exacta del botón <- ) */}
        <button className="btn fn" onClick={limpiar}>AC</button>
        <button className="btn fn" onClick={borrar}>&lt;-</button>
        <button className="btn fn" onClick={cambiarSigno}>+/-</button>
        <button className="btn op" onClick={() => manejarOperacion("/")}>&divide;</button>

        {/* Bloque Numérico y Operadores */}
        <button className="btn" onClick={() => agregarValor("7")}>7</button>
        <button className="btn" onClick={() => agregarValor("8")}>8</button>
        <button className="btn" onClick={() => agregarValor("9")}>9</button>
        <button className="btn op" onClick={() => manejarOperacion("*")}>&times;</button>

        <button className="btn" onClick={() => agregarValor("4")}>4</button>
        <button className="btn" onClick={() => agregarValor("5")}>5</button>
        <button className="btn" onClick={() => agregarValor("6")}>6</button>
        <button className="btn op" onClick={() => manejarOperacion("-")}>-</button>

        <button className="btn" onClick={() => agregarValor("1")}>1</button>
        <button className="btn" onClick={() => agregarValor("2")}>2</button>
        <button className="btn" onClick={() => agregarValor("3")}>3</button>
        <button className="btn op" onClick={() => manejarOperacion("+")}>+</button>

        {/* Fila Inferior */}
        <button className="btn" onClick={() => agregarValor("0")}>0</button>
        <button className="btn" onClick={agregarDecimal}>.</button>
        <button className="btn eq" onClick={calcular}>=</button>
      </div>
    </div>
  );
}

export default App;