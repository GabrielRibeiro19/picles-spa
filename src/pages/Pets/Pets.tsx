import { Header } from '../../components/common/Header'
import { Grid } from '../../components/layout/Grid'
import styles from './Pets.module.css'
import { Card } from '../../components/common/Card'
import { imageBase64 } from './mock'
import { useEffect } from 'react'
import { Skeleton } from '../../components/common/Skeleton'

export function Pets() {
  useEffect(() => {}, [])
  return (
    <Grid>
      <div className={styles.container}>
        <Header />
        <main className={styles.list}>
          {true && <Skeleton count={1} containerClassName={styles.skeleton} />}
          <Card href="/pets/1" text="nina" thumb={imageBase64} />
          <Card href="/pets/2" text="bob" thumb="https://placehold.co/400" />
          <Card href="/pets/3" text="max" thumb="https://placehold.co/400" />
          <Card href="/pets/3" text="max" thumb="https://placehold.co/400" />
        </main>
      </div>
    </Grid>
  )
}
