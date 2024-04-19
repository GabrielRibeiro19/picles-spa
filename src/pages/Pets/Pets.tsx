import { Header } from '../../components/common/Header'
import { Grid } from '../../components/layout/Grid'
import styles from './Pets.module.css'
import { Card } from '../../components/common/Card'
import { Skeleton } from '../../components/common/Skeleton'
import { Select } from '../../components/common/Select'
import { Button } from '../../components/common/Button'
import { Pagination } from '../../components/common/Pagination'
import { useQuery } from '@tanstack/react-query'
import { getPets } from '../../services/pets/getPets'
import { useSearchParams } from 'react-router-dom'

export function Pets() {
  const [searchParams, setSearchParams] = useSearchParams()

  const urlParams = {
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    itemsPerPage: 2,
  }

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

        <div className={styles.filters}>
          <div className={styles.column}>
            <div className={styles.columns}>
              <Select label="Espécie">
                <option value="">Todas</option>
                <option value="">Cachorro</option>
                <option value="">Gato</option>
              </Select>
              <Select label="Porte">
                <option value="">Todos</option>
                <option value="">Pequeno</option>
                <option value="">Médio</option>
                <option value="">Grande</option>
              </Select>
              <Select label="Sexo">
                <option value="">Todos</option>
                <option value="">Masculino</option>
                <option value="">Feminino</option>
              </Select>
            </div>
          </div>
          <div className={styles.column}>
            <Button>Buscar</Button>
          </div>
        </div>
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
