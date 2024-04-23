import { Link, useParams } from 'react-router-dom'
import { Header } from '../../components/common/Header'
import { Grid } from '../../components/layout/Grid'
import styles from './PetDetails.module.css'
import { useQuery } from '@tanstack/react-query'
import { getPetById } from '../../services/pets/getPetById'
import { ImageBase64 } from '../../components/common/ImageBase64/ImageBase64'
import { Skeleton } from '../../components/common/Skeleton'
import { useShelter } from '../../hooks/useShelter'
import { Button, ButtonVariant } from '../../components/common/Button'
import whatsapp from '../../assets/whatsapp.svg'

export function PetDetails() {
  const { id } = useParams()

  const { data: shelterData, isError: shelterIsError } = useShelter()

  const {
    data: petData,
    isLoading: petIsLoading,
    isError: petIsError,
  } = useQuery({
    queryKey: ['get-pet-by-id', id],
    queryFn: async () => getPetById(id as string),
  })

  return (
    <Grid>
      <div className={styles.container}>
        <Header showReturn />
        <main className={styles.content}>
          {petIsLoading && (
            <div className={styles.skeleton}>
              <Skeleton circle width={200} height={200} />
              <Skeleton width={180} height={24} style={{ margin: 16 }} />
            </div>
          )}
          {!petIsLoading && (
            <>
              <ImageBase64
                className={styles.picture}
                alt={petData?.name}
                src={petData?.photo}
              />
              {petIsError && (
                <>
                  <h1>Pet não encontrado</h1>
                  <Link to="/pets" className={styles.link}>
                    Voltar para a listagem
                  </Link>
                </>
              )}
              {!petIsError && (
                <>
                  <h1>{petData?.name}</h1>
                  <span>Sobre o pet:</span>
                  <p>{petData?.bio}</p>
                  {!shelterIsError && (
                    <a
                      href={`https://wa.me/${shelterData?.shelterWhatsapp}?text=Olá, gostaria de falar sobre o ${petData?.name}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button variant={ButtonVariant.Text}>
                        <span className={styles.buttonWhatsapp}>
                          <img
                            src={whatsapp}
                            alt="WhatsApp do abrigo"
                            style={{ marginRight: 8 }}
                          />
                          Entre em contato com o abrigo
                        </span>
                      </Button>
                    </a>
                  )}
                </>
              )}
            </>
          )}
        </main>
      </div>
    </Grid>
  )
}
