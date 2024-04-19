import { useQuery } from '@tanstack/react-query'
import { getPets } from '../services/pets/getPets'
import { GetPetsRequest, GetPetsResponse } from '../interfaces/pet'

interface IUsePetList {
  data?: GetPetsResponse
  isLoading: boolean
}

export function usePetList(params: GetPetsRequest): IUsePetList {
  const { data, isLoading } = useQuery({
    queryKey: ['get-pets', params],
    queryFn: () => getPets(params),
    // staleTime: 1 * 60 * 1000, - para otimizar a performance e criar um cache por x tempo antes de fazer uma nova requisição
  })

  return { data, isLoading }
}
