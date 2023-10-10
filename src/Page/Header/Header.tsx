import React, { FC, useContext } from 'react'
import classes from './Header.module.scss'
import { AppContext } from '../../Context'
import { useNavigate } from 'react-router';


interface HeaderProps {
}


export const Header: FC<HeaderProps> = () => {

  const contextData = useContext(AppContext);
  const navigate = useNavigate()

  return (

    <header className={classes.header}>
      <button className={classes.back} type="button"
        onClick={() => {
          contextData.isClose = !contextData.isClose;
          const pastPage = contextData.history.pop();
          if (pastPage) navigate(pastPage);
        }}>
        <img src="/images/back-svgrepo-com.svg" alt="back" />
        <span>Back</span>
      </button>
      <output className={classes["page-name"]}>{contextData.title}</output>
    </header>
  )
}