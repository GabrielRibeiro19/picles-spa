import { ReactNode, SelectHTMLAttributes } from 'react'
import styles from './Select.module.css'

interface ISelect extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  children: ReactNode
}

export function Select({ label, children, ...rest }: ISelect) {
  return (
    <div className={styles.selectGroup}>
      <label htmlFor="">{label}</label>
      <select {...rest}>{children}</select>
    </div>
  )
}
