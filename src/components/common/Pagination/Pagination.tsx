import styles from './Pagination.module.css'

interface IPagination {
  currentPage: number
  totalpages: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalpages,
  onPageChange,
}: IPagination) {
  const pageNumber = Array.from({ length: totalpages }, (_, index) => index + 1)

  return (
    <nav>
      <ul className={styles.pagination}>
        {pageNumber.map((number) => (
          <li
            key={number}
            {...(number === currentPage && { className: styles.active })}
            // className={currentPage === number ? styles.active : ''}
          >
            <button onClick={() => onPageChange(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
