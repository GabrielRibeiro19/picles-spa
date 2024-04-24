import { useRef } from 'react'
import { Button } from '../../../components/common/Button'
import { Input } from '../../../components/common/Input'
import { Panel } from '../../../components/layout/Panel'

import styles from './Shelter.module.css'

export function Shelter() {
  const inputRef = useRef(null)
  function submit(event: React.FormEvent) {
    event.preventDefault()
  }

  return (
    <Panel>
      <form className={styles.container} onSubmit={submit}>
        <Input ref={inputRef} label="WhatsApp" />
        <Button>Salvar dados</Button>
      </form>
    </Panel>
  )
}
