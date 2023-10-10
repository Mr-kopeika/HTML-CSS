import {FC, useEffect, useContext} from 'react'
import classes from './CreateCourse.module.scss'
import { AppContext } from '../../Context'
import { CoursesTable, CreateForm } from '.';


interface CreateCourseProps {

}

export const CreateCourse: FC<CreateCourseProps> = () => {

  const context = useContext(AppContext);
  useEffect(() => {
    if (context.setTitle) context.setTitle('Create Course');
    document.title = 'Create Course';
  })

  return (
    <div className={`${classes.container}`}>
      <CreateForm />
      <CoursesTable />
    </div>
  )
}