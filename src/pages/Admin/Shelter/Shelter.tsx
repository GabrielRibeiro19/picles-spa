import { Button } from '../../../components/common/Button'
import { Input } from '../../../components/common/Input'
import { Panel } from '../../../components/layout/Panel'

import styles from './Shelter.module.css'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormMask } from 'use-mask-input'

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
  whatsapp: z.string().refine((value) => {
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

  const registerWithMask = useHookFormMask(register)

  function submit({ name, email, phone, whatsapp }: ShelterSchema) {
    console.log(name)
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
            {...registerWithMask('whatsapp', ['(99) [9]9999-9999'])}
            label="WhatsApp"
          />
          {errors?.whatsapp && (
            <p className={styles.formError}>{errors.whatsapp.message}</p>
          )}
        </div>
        <Button>Salvar dados</Button>
      </form>
    </Panel>
  )
}
