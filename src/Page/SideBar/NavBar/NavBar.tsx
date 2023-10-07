import React, { FC } from 'react';
import classes from './NavBar.module.scss';
import { NavBarItem } from '.';


interface NavBarProps {

}

interface INavItems {
  address: string;
  data: string;
}

export const NavBar: FC<NavBarProps> = () => {

  const navItems: INavItems[] = ([
    {address: 'create-course', data: 'Create Course'},
    {address: 'profile', data: 'Profile'},
    {address: 'statistics', data: 'Statistics'},
    {address: 'settings', data: 'Settings'},
  ])

  return (

    <nav id="navbar" className={`${classes.container}`}>
      {navItems.map(
        (item) => <NavBarItem address={item.address} data={item.data} key={item.address}/>)
      }
    </nav>
  )
}