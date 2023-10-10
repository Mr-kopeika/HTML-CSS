import { FC, useEffect } from "react";
import classes from './Login.module.scss'
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../Context";

export interface LoginProps {

}


export const Login: FC<LoginProps> = () => {

  const context = useContext(AppContext);

  useEffect(() => {
    document.title = 'Grambotica Login';
  })

  const clickHandler = () => {
    context.login = true;
    context.loginTime = new Date();
  }

  return (
    <div className={`${classes['page-container']}`}>
      {context.login && <Navigate to='/page/create-course' />}
      <h1>Please log in to your account</h1>
      <Link to='/page/create-course'>
        <button onClick={clickHandler}>
          Login
        </button>
      </Link>
    </div>
  )
}