import { useState } from "react";
import { Footer } from "./Footer";


export const Calculadora = () => {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [period, setPeriod] = useState('');
  const [isMonth, setIsMonth] = useState(true);
  const [result, setResult] = useState('');
  const [resultText, setResultText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Función para convertir números a palabras
  const numberToWords = (num) => {
    if (num === 0) return 'cero';

    const unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const especiales = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const decenas = ['', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const centenas = ['', 'cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    let result = '';

    if (num >= 1000) {
      if (num >= 2000) {
        result += numberToWords(Math.floor(num / 1000)) + ' mil ';
      } else {
        result += 'mil ';
      }
      num %= 1000;
    }

    if (num >= 100) {
      if (num === 100) {
        result += 'cien ';
      } else {
        result += centenas[Math.floor(num / 100)] + ' ';
      }
      num %= 100;
    }

    if (num >= 20) {
      result += decenas[Math.floor(num / 10)] + (num % 10 !== 0 ? ' y ' : ' ');
      num %= 10;
    } else if (num >= 10) {
      result += especiales[num - 10] + ' ';
      num = 0;
    }

    if (num > 0) {
      result += unidades[num] + ' ';
    }

    return result.trim();
  };

  // Función para calcular el interés
  const calculate = () => {
    const days = isMonth ? period * 28 : period;
    const dailyRate = rate / 365 / 100;
    const interest = amount * (dailyRate * days);
    const roundedInterest = Math.floor(interest);

    setResult(interest.toFixed(2));
    setResultText(`Ganaste ${numberToWords(roundedInterest)} pesos en intereses.`);
  };

  // Función para limpiar todos los campos
  const clearFields = () => {
    setAmount('');
    setRate('');
    setPeriod('');
    setResult('');
    setResultText('');
  };

  // Función para alternar modo oscuro
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Función para limpiar cuando cambia el monto
  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
    setRate('');
    setPeriod('');
    setResult('');
    setResultText('');
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <button 
  className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-md md:px-4 md:py-2 flex items-center mt-4 md:mt-0"
  onClick={toggleDarkMode}
>
  {isDarkMode ? (
    <span role="img" aria-label="Modo Claro" className="text-2xl">💡</span> // Emoticono de bombilla para modo claro
  ) : (
    <span role="img" aria-label="Modo Oscuro" className="text-2xl">🌙</span> // Emoticono de luna para modo oscuro
  )}
</button>

      <h2 className="text-3xl font-bold mb-4 text-teal-600 mt-6 ml-4">Calculadora de Intereses</h2>
      <div className={`p-6 rounded-lg shadow-lg w-full max-w-md ${isDarkMode ? 'bg-gray-700' : 'bg-neutral-100'}`}>
        
        <div className="mb-4">
          <label className="block text-sm font-medium">Cantidad de dinero</label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className={`mt-1 block w-full border rounded-md p-2 ${isDarkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-gray-300 text-black border-gray-300 placeholder:text-gray'}`}
            placeholder="Ingrese el monto"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Porcentaje de TNA (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className={`mt-1 block w-full border rounded-md p-2 ${isDarkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-gray-300 text-black border-gray-300'}`}
            placeholder="Ingrese el porcentaje de TNA"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Período</label>
          <div className="flex items-center space-x-2">
          <input
    type="number"
    value={period}
    onChange={(e) => setPeriod(e.target.value)}
    className={` block w-full border rounded-md p-2 ${isDarkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-gray-300 text-black border-gray-300'}`}
    placeholder={isMonth ? "Ingrese los meses" : "Ingrese los días"}
  />
  <button
    className="bg-teal-700 text-white h-auto px-4 py-2 rounded-md whitespace-nowrap"
    onClick={() => setIsMonth(!isMonth)}
  >
    {isMonth ? "Cambiar a Días" : "Cambiar a Meses"}
  </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Ganancia de Intereses</label>
          <input
            type="text"
            value={result}
            readOnly
            className={`mt-1 block w-full border rounded-md p-2 ${isDarkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-gray-300 text-black border-gray-300 '}`}
            placeholder="El interés ganado aparecerá aquí"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">En palabras</label>
          <textarea
            value={resultText}
            readOnly
            className={`mt-1 block w-full border rounded-md p-2 resize-none ${isDarkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-gray-300 text-black border-gray-300'}`}
            style={{ minHeight: '4rem', maxHeight: '10rem', overflow: 'auto' }}
            placeholder="Resultado en palabras"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full bg-teal-700 text-white font-semibold py-2 rounded-md hover:bg-teal-600 transition duration-300"
        >
          Calcular
        </button>

        <button
          onClick={clearFields}
          className="w-full mt-2 bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition duration-300"
        >
          Limpiar
        </button>
      </div>
      
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};
