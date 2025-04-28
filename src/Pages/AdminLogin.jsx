import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getsignupUSer } from '../Feature/SignupSlice'
import Swal from 'sweetalert2'
import { addloginUser, getloginUSer } from '../Feature/LoginSlice'

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { signup } = useSelector((state) => state.signup)
  let nav = useNavigate()
  let dispatch = useDispatch()
  const { login } = useSelector((state) => state.login || []);



  useEffect(() => {
    if (login.length == 1) {

      nav('/adminpage')
    }
  },[login])


  useEffect(() => {
    dispatch(getloginUSer())
  }, [dispatch])



  useEffect(() => {
    dispatch(getsignupUSer())
  }, [dispatch])

  // console.log(signup);

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    resetForm
  } = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: yup.object({
      email: yup
        .string()
        .required('Email is required')
        .email('Invalid email format')
        .test(
          'valid-structure',
          'Email must include a name before domain',
          (value) => value && !/^@.+$/.test(value.trim()) &&
            value.includes('@') && value.endsWith("gmail.com")
        ),
      password: yup
        .string()
        .required('Password is required!')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
          'Password must include upper, lower, number & symbol (8+ chars)'
        )
    }),
    onSubmit: async (data) => {

      const findsignupUser = signup.find((val) => {
        return val.email === data.email && val.password === data.password
      })



      if (findsignupUser) {

        dispatch(addloginUser(data))


        Swal.fire({
          title: " Login Successfully !",
          icon: "success",
          draggable: true,
          showConfirmButton: false,
          timer: 1900
        });



        setTimeout(() => {
          nav('/adminpage')
        }, 2000);

      } else {

        Swal.fire({
          title: " Invalid email or password ! && first Register Then Login",
          icon: "error",
          draggable: true,
          showConfirmButton: false,
          timer: 2000
        });

        setTimeout(() => {
          nav('/signup')

        }, 1900);

      }




      resetForm()
    }
  })

  const togglePassword = () => setShowPassword(!showPassword)

  return (
    <div className="container py-4  " >
      <div className="row justify-content-center gx-0 d-flexa d-flex align-items-center" style={{ minHeight: '100vh' }}>
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 border rounded p-3 p-sm-4">
          <h1 className="text-center mb-3">Admin Login</h1>
          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="mb-1">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                // className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                className='form-control'
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange}
              />

            </div>
            {touched.email && errors.email && (
              <div className="text-danger">{errors.email}</div>
            )}

            {/* Password */}
            <div className="mb-1 position-relative">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className='form-control'
                // className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                placeholder="Enter password"
                autoComplete="on"
                value={values.password}
                onChange={handleChange}
              />
              <span
                className="show"
                onClick={togglePassword}

              >
                {showPassword ? (
                  <i className="bi bi-eye-slash"></i>  // Use Bootstrap icon for hide
                ) : (
                  <i className="bi bi-eye"></i>  // Use Bootstrap icon for show
                )}
              </span>

            </div>
            {touched.password && errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}


            {/* Submit */}
            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-primary btn-lg">
                Login
              </button>
            </div>
          </form>
          <p className="text-center mt-2">Don't have an account? <Link to={`/signup`}>Sign-Up</Link></p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
