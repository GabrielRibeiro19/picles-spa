import { Button, ButtonVariant } from '../../../components/common/Button'
import { Input } from '../../../components/common/Input'
import { Panel } from '../../../components/layout/Panel'

import styles from './Shelter.module.css'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormMask } from 'use-mask-input'
import { toast } from 'sonner'
import { updateShelter } from '../../../services/shelter/updateShelter'
import { useQueryClient } from '@tanstack/react-query'
import { useShelter } from '../../../hooks/useShelter'
import { useEffect, useState } from 'react'
import { Skeleton } from '../../../components/common/Skeleton'
import { format } from 'date-fns'

const shelterSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter no mínimo 2 caracteres')
    .max(30, 'Nome deve ter no máximo 30 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().refine((value) => {
    const digits = value.replace(/\D/g, '').length
    return digits >= 10 && digits <= 11
  }, 'Telefone inválido'),
  whatsApp: z.string().refine((value) => {
    const digits = value.replace(/\D/g, '').length
    return digits >= 10 && digits <= 11
  }, 'WhatsApp inválido'),
})

type ShelterSchema = z.infer<typeof shelterSchema>

export function Shelter() {
  const { register, handleSubmit, reset, formState } = useForm<ShelterSchema>({
    resolver: zodResolver(shelterSchema),
  })

  const { data, isLoading } = useShelter()

  const [dateUpdateFormated, setDateUpdateFormated] = useState('')

  useEffect(() => {
    if (!isLoading && data) {
      reset({
        name: data.shelterName,
        email: data.shelterEmail,
        phone: data.shelterPhone,
        whatsApp: data.shelterWhatsApp,
      })

      const updateDateFormatted =
        data && format(new Date(data.updatedAt), `dd/MM/yyyy 'às' HH'h'mm`)

      setDateUpdateFormated(updateDateFormatted)
    }
  }, [data, isLoading, reset])

  const queryClient = useQueryClient()

  const registerWithMask = useHookFormMask(register)

  async function submit({ name, email, phone, whatsApp }: ShelterSchema) {
    const toastId = toast.loading('Salvando dados')

    try {
      await updateShelter({
        name,
        email,
        phone: phone.replace(/\D/g, ''),
        whatsApp: whatsApp.replace(/\D/g, ''),
      })

      queryClient.invalidateQueries({ queryKey: ['getShelter'] })

      setDateUpdateFormated(format(new Date(), `dd/MM/yyyy 'às' HH:mm`))

      toast.success('Dados salvos com sucesso', {
        id: toastId,
        closeButton: true,
      })
    } catch (error) {
      toast.error('Erro ao salvar os dados', { id: toastId, closeButton: true })
    }
  }

  return (
    <Panel>
      {isLoading && (
        <Skeleton
          count={4}
          width={320}
          height={50}
          style={{ margin: '15px 0' }}
        />
      )}
      {!isLoading && (
        <form className={styles.container} onSubmit={handleSubmit(submit)}>
          <div>
            <Input {...register('name')} label="Nome" />
            {formState.errors?.name && (
              <p className={styles.formError}>
                {formState.errors.name.message}
              </p>
            )}
          </div>
          <div>
            <Input {...register('email')} label="Email" />
            {formState.errors?.email && (
              <p className={styles.formError}>
                {formState.errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Input
              {...registerWithMask('phone', ['(99) [9]9999-9999'])}
              label="Telefone"
            />
            {formState.errors?.phone && (
              <p className={styles.formError}>
                {formState.errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <Input
              {...registerWithMask('whatsApp', ['(99) [9]9999-9999'])}
              label="WhatsApp"
            />
            {formState.errors?.whatsApp && (
              <p className={styles.formError}>
                {formState.errors.whatsApp.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            variant={
              !formState.isDirty
                ? ButtonVariant.Disabled
                : ButtonVariant.Default
            }
          >
            Salvar dados
          </Button>
          <div style={{ display: 'block', color: 'green', fontWeight: '600' }}>
            <p>última atualização em {dateUpdateFormated}</p>
          </div>
        </form>
      )}
    </Panel>
  )
}
