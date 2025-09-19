import { useState } from 'react'
import { Calculadora } from './components/calculadora'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Calculadora />
    </>
  )
}

export default App
