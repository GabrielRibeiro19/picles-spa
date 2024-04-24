import { Button } from '../../../components/common/Button'
import { Input } from '../../../components/common/Input'
import { Panel } from '../../../components/layout/Panel'

import styles from './Shelter.module.css'

export function Shelter() {
  function submit(event: React.FormEvent) {
    event.preventDefault()
    console.log('submit')
  }

  return (
    <Panel>
      <form className={styles.container}>
        <Input label="WhatsApp" value="" />
        <Button>Salvar dados</Button>
      </form>
    </Panel>
  )
}
