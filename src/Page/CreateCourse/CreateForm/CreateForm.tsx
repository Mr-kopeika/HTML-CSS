import { FC, useContext } from 'react'
import classes from './CreateForm.module.scss'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AppContext, Course } from '../../../Context'

interface CreateFormProps {

}

enum CourseTypeEnum {
  'Music' = "Music",
  'Computer Science' = 'Computer Science',
  'Art' = 'Art'
}

interface ICreateFormInputs {
  title: string
  description: string
  type: CourseTypeEnum
}

export const CreateForm: FC<CreateFormProps> = () => {

  const context = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ICreateFormInputs>();
  const onSubmit: SubmitHandler<ICreateFormInputs> = (data) => {

    const course: Course = {
      title: data.title,
      description: data.description,
      type: data.type
    }
    if (context.addCourse) {context.addCourse(course)}
  };
  const watchType = watch('type', CourseTypeEnum['Computer Science']);


  return (
    <form className={classes['create-form']} onSubmit={handleSubmit(onSubmit)}>

      <label className={classes.title}>
        <p>Title</p>
        <input type='text' {...register('title', {
          required: {
            value: (
              watchType == CourseTypeEnum['Computer Science'] ||
              watchType == CourseTypeEnum.Art
            ) ? true : false,
            message: 'Required'
          }
        })}
        />
        {errors.title && <p className={classes.invalid}>{errors.title.message}</p>}
      </label>

      <label className={classes.description}>
        <p>Description</p>
        <textarea {...register('description', {
          required: {
            value: (
              watchType == CourseTypeEnum['Computer Science'] ||
              watchType == CourseTypeEnum.Music
            ) ? true : false,
            message: 'Required'
          }
        })}
        />
        <div className={classes.resizer}></div>
        {errors.description && <p className={classes.invalid}>{errors.description.message}</p>}
      </label>

      <label className={classes.type}>
        <p>Type</p>
        <select {...register('type', { required: { value: true, message: 'Required' } })} >
          <option value='Computer Science'>Computer Science</option>
          <option value='Art'>Art</option>
          <option value='Music'>Music</option>
        </select>
        {errors.type && <p className={classes.invalid}>{errors.type.message}</p>}
      </label>

      <hr />

      <div className={classes.save}>
        <button className="save-button" type="submit">Save</button>
      </div>
    </form>
  )
}