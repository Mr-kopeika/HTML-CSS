import {FC, useEffect, useContext} from 'react'
import classes from './Profile.module.scss'
import { AppContext } from '../../Context'


interface ProfileProps {

}

export const Profile: FC<ProfileProps> = () => {

  useEffect(() => {
    if (context.setTitle) context.setTitle('Profile');
    document.title = 'Profile';
  })

  const context = useContext(AppContext);

  return (
    <div className={`${classes.container}`}></div>
  )
}