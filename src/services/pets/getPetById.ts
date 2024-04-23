import { IPet } from '../../interfaces/pet'
import httpClient from '../api/httpClient'

export async function getPetById(id: string): Promise<IPet> {
  try {
    const { data } = await httpClient.get(`/pet/${id}`)
    return data
  } catch (error) {
    console.error('Erro ao buscar pet por id: ', error)
    throw error
  }
}
