import { FC, useContext } from 'react';
import classes from './SideBarHeader.module.scss';
import { CloseLink } from '.';
import { AppContext } from '../../../Context';

interface SideBarHeaderProps {

}

export const SideBarHeader: FC<SideBarHeaderProps> = () => {

  const context = useContext(AppContext);

  return (

    <div className={`${classes['collapse-wrapper']}`}>
      <img src="/images/logo-grambotica.svg" />
      <button id="collapse-button" type="button">
        <CloseLink
          anchorElement='wrapper'
          modifier='close-link'
          onClick={context.setClose}
          clickValue={true} />
        <CloseLink
          anchorElement=''
          modifier='unclose-link'
          onClick={context.setClose}
          clickValue={false} />
      </button>
    </div>
  )
}