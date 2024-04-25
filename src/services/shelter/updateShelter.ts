import {
  IUpdateShelterRequest,
  IUpdateShelterResponse,
} from '../../interfaces/shelter'
import httpClient from '../api/httpClient'

export async function updateShelter(
  params: IUpdateShelterRequest,
): Promise<IUpdateShelterResponse> {
  try {
    const { data } = await httpClient.put<IUpdateShelterResponse>(
      '/shelter',
      params,
    )
    return data
  } catch (error) {
    console.error('Erro ao atualizar abrigo', error)
    throw error
  }
}
