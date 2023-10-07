import { FC, useContext } from 'react'
import classes from './SideBar.module.scss'
import { NavBar, SideBarHeader } from '.'
import { AppContext } from '../../Context'
import { useNavigate } from 'react-router'

interface SideBarProps {
}

export const SideBar: FC<SideBarProps> = () => {

  const context = useContext(AppContext);
  const navigate = useNavigate();

  const exitClickHandler = () => {
    context.history.length = 0;
    navigate(0);
  }

  return (
    <div className={`${classes.sidebar}`}>

      <SideBarHeader />

      <NavBar />

      <button
        id="exit"
        className={`${classes["exit-button"]}`}
        type="button"
        data-name="Exit"
        onClick={exitClickHandler}
      >
        <span>Exit</span>
      </button>

    </div>
  )
}