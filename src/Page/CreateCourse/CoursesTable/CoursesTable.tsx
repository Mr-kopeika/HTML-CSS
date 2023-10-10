import { FC, useContext } from 'react'
import classes from './CoursesTable.module.scss'
import { TableRow } from '.'
import { AppContext } from '../../../Context'

interface CoursesTableProps {

}

export const CoursesTable: FC<CoursesTableProps> = () => {

  const context = useContext(AppContext);

  return context.courses.length ? (
    <table className={classes.courses} >
    <tbody>
      <TableRow
        header
        number='№'
        type='Type'
        title='Title'
        description='Description'
      />

      {context.courses.map(course => 
        <TableRow 
          description={course.description}
          title={course.title}
          type={course.type}
          number={context.courses.indexOf(course) + 1}
          key={context.courses.indexOf(course) + 1}
        />
        )}
    </tbody>
  </table>
  ) : (<></>)
}