import { FC } from 'react'
import classes from './TableRow.module.scss'

interface TableRowProps {
  header?: boolean
  number: number | string
  type: string
  title: string
  description: string
}

export const TableRow: FC<TableRowProps> = ({ number, type, title, description, header }) => {


  return header ? (
    <tr>
      <th className={classes.number}>{number}</th>
      <th className={classes.type}>{type}</th>
      <th className={classes.title}>{title}</th>
      <th>{description}</th>
    </tr>
  ) : (
    <tr>
      <td className={classes.number}>{number}</td>
      <td className={classes.type}>{type}</td>
      <td className={classes.title}>{title}</td>
      <td className={classes.description}>{description}</td>
    </tr>
  )
}