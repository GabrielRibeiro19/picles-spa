import { useState } from 'react'
import { Button } from './components/common/Button'
import { ButtonVariant } from './components/common/Button/Button.constants'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Button onClick={() => setCount(count + 1)} variant={ButtonVariant.Default}>
      Quero adotar
    </Button>
    <Button onClick={() => setCount(count + 1)} variant={ButtonVariant.Outlined}>
      Tenho um abrigo
    </Button>
    <Button onClick={() => setCount(count + 1)} variant={ButtonVariant.Disabled}>
      Tenho um abrigo
    </Button>
    <Button onClick={() => setCount(count + 1)} variant={ButtonVariant.Text}>
      Tenho um abrigo
    </Button>
    count is {count}
    </>

  )
}
