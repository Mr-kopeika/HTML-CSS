import {FC, useEffect, useContext} from 'react'
import classes from './CreateCourse.module.scss'
import { AppContext } from '../../Context'


interface CreateCourseProps {

}

export const CreateCourse: FC<CreateCourseProps> = () => {

  useEffect(() => {
    if (context.setTitle) context.setTitle('Create Course');
    document.title = 'Create Course';
  })

  const context = useContext(AppContext);

  return (
    <div className={`${classes.container}`}></div>
  )
}