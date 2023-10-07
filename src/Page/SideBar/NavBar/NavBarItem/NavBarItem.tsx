import React, { FC, useState, useContext } from 'react';
import classes from './NavBarItem.module.scss';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../../../Context';


interface NavBarItemProps {
  data: string,
  address: string
}

export const NavBarItem: FC<NavBarItemProps> = ({ data, address }) => {

  const [pluses, setPluses] = useState('');
  const context = useContext(AppContext);
  
  const addPluses = () => {
    setPluses(pluses + '+');
  }

  const clickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    addPluses();
    context.history.push(window.location.pathname);
  }


  return (
    <button className={`${classes["navbar-item"]}`}>
      <NavLink
        to={address + (context.isClose ? '#wrapper' : '')}
        className={({isActive, isPending}) => 
          {
            return isPending ? '' : isActive ? classes.active : ''
          }
        }
        onClick={clickHandler}
        data-name={data}
      >
        <img src="/images/circle.svg" alt="circle" />
        <output>{pluses}</output>
        <span>{data}</span>
      </NavLink>
    </button>
  )
}