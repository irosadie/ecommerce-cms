'use client'
import { Fragment } from 'react'
import styles from './page.module.scss'
import { useLogin } from '$/hooks/use-login'
import { useFormik } from 'formik'

type LoginProps = {}

const LaginPage = () => {

  useLogin()

  const formLogin = useFormik<LoginProps>({
    initialValues: {},
    validationSchema: null,
    onSubmit: async _values => {
      const isValidate = false

      if (isValidate) {
        alert('after login')
      }
    },
  })

  return (
    <Fragment>
      <section>
        <div className={styles.container}>
          <form onSubmit={formLogin.handleSubmit}>
            <input />
            <input />
            <button type='reset'>Login</button>
            <button type='submit'>Login</button>
          </form>
        </div>
      </section>
    </Fragment>
  )
}

export default LaginPage