interface IFilterColumn {
  name: 'gender' | 'size' | 'type'
  title: string
  options: { value: string; text: string }[]
}

export const filterColumns: IFilterColumn[] = [
  {
    name: 'type',
    title: 'Espécie',
    options: [
      { value: '', text: 'Todas' },
      { value: 'cachorro', text: 'Cachorros' },
      { value: 'gato', text: 'Gatos' },
    ],
  },
  {
    name: 'size',
    title: 'Porte',
    options: [
      { value: '', text: 'Todos' },
      { value: 'pequeno', text: 'Pequeno' },
      { value: 'medio', text: 'Médio' },
      { value: 'grande', text: 'Grande' },
    ],
  },
  {
    name: 'gender',
    title: 'Sexo',
    options: [
      { value: '', text: 'Todos' },
      { value: 'macho', text: 'Macho' },
      { value: 'femea', text: 'Fêmea' },
    ],
  },
]
