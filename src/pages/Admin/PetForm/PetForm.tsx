import { Panel } from '../../../components/layout/Panel'

import styles from './PetForm.module.css'

export function PetForm() {
  return (
    <Panel>
      <div className={styles.container}>
        <h1>Novo pet</h1>
        <PetForm />
      </div>
    </Panel>
  )
}
