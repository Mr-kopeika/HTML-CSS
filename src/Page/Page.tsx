import { FC, useState, useContext, useEffect } from "react";
import classes from './Page.module.scss';
import { Navigate, Outlet } from "react-router";
import { Header, SideBar } from ".";
import { AppContext } from "../Context";
import { Course } from "../Context";

interface PageProps {
}

export const Page: FC<PageProps> = () => {

  const contextData = useContext(AppContext)
  const [title, setTitle] = useState('Create Course');
  const [isClose, setClose] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  const addCourse = (c: Course) => {
    setCourses([...courses, c]);
  }

  const value = {
    login: contextData.login,
    title: title,
    setTitle: setTitle,
    isClose: isClose,
    setClose: setClose,
    history: contextData.history,
    courses: courses,
    addCourse: addCourse,
  }




  useEffect(() => {
    const callback = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.code === 'KeyK') {
        event.preventDefault();
        setDialogOpen(!isDialogOpen);
      }
    };
    document.addEventListener('keydown', callback);
    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [isDialogOpen]);

  return (
    <AppContext.Provider value={value}>
      <div id="wrapper" className={`${classes.wrapper}`}>
        {contextData.login || <Navigate to='/login' />}
        <SideBar />
        <Header />
        <Outlet />
        <dialog open={isDialogOpen}>
          <p>You logged in at: {contextData.loginTime ? contextData.loginTime.toString() : null}</p>
          <p>Press Ctrl + K (Cmd + K for MacOS) to close.</p>
        </dialog>
      </div>
    </AppContext.Provider>
  )
}