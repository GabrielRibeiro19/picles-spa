import { IShelter } from '../../interfaces/shelter'
import httpClient from '../api/httpClient'

export async function getShelter(): Promise<IShelter> {
  try {
    const { data } = await httpClient.get('/shelter')
    return data
  } catch (error) {
    console.log('Erro ao buscar abrigo: ', error)
    throw error
  }
}
