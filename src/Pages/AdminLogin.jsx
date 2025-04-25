import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../Feature/FirebaseConfig'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [signupData, setSignupData] = useState([])
  let nav = useNavigate()

  const getsignupData = async () => {
    let result = await getDocs(collection(db, "adminSignup"));
    let res = result.docs.map((val) => {

      return ({ id: val.id, ...val.data() })
    });

    setSignupData(res)
    console.log(signupData);

  }

  console.log(signupData);

  useEffect(() => {
    getsignupData()
  }, [])
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

      const findsignupUser = signupData.find((val) => {
        return val.email === data.email && val.password === data.password
      })
      console.log(data);

      if (findsignupUser) {

        await addDoc(collection(db, "adminLogin"), data)
        alert('Admin Login Successfully')

        nav('/adminpage')

      } else {
        alert('Invalid email or password')
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
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
