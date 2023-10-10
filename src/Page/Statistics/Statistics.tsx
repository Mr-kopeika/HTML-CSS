import {FC, useContext, useEffect} from 'react'
import classes from './Statistics.module.scss'
import { AppContext } from '../../Context'

interface StatisticsProps {

}

export const Statistics: FC<StatisticsProps> = () => {

  const context = useContext(AppContext);

  useEffect(() => {
    if (context.setTitle) context.setTitle('Statistics');
    document.title = 'Statistics';
  })

  return (
    <div className={`${classes.container}`}></div>
  )
}