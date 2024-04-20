import { useSearchParams } from 'react-router-dom'
import { Button } from '../../components/common/Button'
import { Card } from '../../components/common/Card'
import { Header } from '../../components/common/Header'
import { Pagination } from '../../components/common/Pagination'
import { Select } from '../../components/common/Select'
import { Skeleton } from '../../components/common/Skeleton'
import { Grid } from '../../components/layout/Grid'
import { usePetList } from '../../hooks/usePetList'
import styles from './Pets.module.css'

export function Pets() {
  const [searchParams, setSearchParams] = useSearchParams()

  const urlParams = {
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
  }

  const { data, isLoading } = usePetList(urlParams)

  function changePage(page: number) {
    setSearchParams((params) => {
      params.set('page', String(page))
      return params
    })
  }

  return (
    <Grid>
      <div className={styles.container}>
        <Header />

        <form className={styles.filters} action="">
          <div className={styles.columns}>
            <div className={styles.column}>
              <Select
                label="Espécie"
                options={[
                  { value: '', text: 'Todos' },
                  { value: 'cachorro', text: 'Cachorro' },
                  { value: 'gato', text: 'Gato' },
                ]}
              />
            </div>
            <div className={styles.column}>
              <Select
                label="Espécie"
                options={[
                  { value: '', text: 'Todos' },
                  { value: 'cachorro', text: 'Cachorro' },
                  { value: 'gato', text: 'Gato' },
                ]}
              />
            </div>
          </div>
          <Button type="submit">Buscar</Button>
        </form>

        {isLoading && (
          <Skeleton count={10} containerClassName={styles.skeleton} />
        )}
        <main className={styles.list}>
          {data?.items.map((item) => (
            <Card
              key={item.id}
              href={`/pets/${item.id}`}
              text={item.name}
              thumb={item.photo}
            />
          ))}
        </main>
        {data?.currentPage && (
          <Pagination
            currentPage={data.currentPage}
            totalpages={data.totalPages}
            onPageChange={(page) => changePage(page)}
          />
        )}
      </div>
    </Grid>
  )
}
