import { Button } from '../../../components/common/Button'
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShelterSchema>({
    resolver: zodResolver(shelterSchema),
  })

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
      <form className={styles.container} onSubmit={handleSubmit(submit)}>
        <div>
          <Input {...register('name')} label="Nome" />
          {errors?.name && (
            <p className={styles.formError}>{errors.name.message}</p>
          )}
        </div>
        <div>
          <Input {...register('email')} label="Email" />
          {errors?.email && (
            <p className={styles.formError}>{errors.email.message}</p>
          )}
        </div>
        <div>
          <Input
            {...registerWithMask('phone', ['(99) [9]9999-9999'])}
            label="Telefone"
          />
          {errors?.phone && (
            <p className={styles.formError}>{errors.phone.message}</p>
          )}
        </div>
        <div>
          <Input
            {...registerWithMask('whatsApp', ['(99) [9]9999-9999'])}
            label="WhatsApp"
          />
          {errors?.whatsApp && (
            <p className={styles.formError}>{errors.whatsApp.message}</p>
          )}
        </div>
        <Button>Salvar dados</Button>
      </form>
    </Panel>
  )
}
