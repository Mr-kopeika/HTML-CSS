import {FC, useEffect, useContext} from 'react'
import classes from './Settings.module.scss'
import { AppContext } from '../../Context'

interface SettingsProps {

}

export const Settings: FC<SettingsProps> = () => {

  useEffect(() => {
    if (context.setTitle) context.setTitle('Settings');
    document.title = 'Settings';
  })

  const context = useContext(AppContext);

  return (
    <div className={`${classes.container}`}></div>
  )
}