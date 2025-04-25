import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import "./AdminSignup.css"
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../Feature/FirebaseConfig'
import { Link } from 'react-router-dom'


const AdminSignup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    resetForm
  } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      conformPassword: ''
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required('Name is required!')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters')
        .matches(/^[A-Za-z\s]+$/, 'Only alphabets and spaces are allowed'),
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
        ),
      conformPassword: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
    }),
    onSubmit: async (data) => {

      await addDoc(collection(db, "adminSignup"), data)
      alert('Admin Signup Successfully')
      resetForm()
    }
  })

  // Toggle password visibility
  const togglePassword = () => setShowPassword(!showPassword)
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)

  return (
    <div className="container py-5">
      <div className="row justify-content-center m-md-0 m-1">
        <div className="col-12 col-md-8 col-lg-6 mx-auto border rounded">
          <h1 className="mb-3 text-center mt-2">Admin Signup</h1>

          <form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className="mb-1">
              <label htmlFor="name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className='form-control'
                // className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                placeholder="Enter your name"
                value={values.name}
                onChange={handleChange}
              />

            </div>
            {touched.name && errors.name && (
              <div className="text-danger">{errors.name}</div>
            )}

            {/* Email */}
            <div className="mb-1">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className='form-control'
                // className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
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

            {/* Confirm Password */}
            <div className="mb-1 position-relative">
              <label htmlFor="conformPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="conformPassword"
                name="conformPassword"
                className='form-control'
                // className={`form-control ${touched.conformPassword && errors.conformPassword ? 'is-invalid' : ''}`}
                placeholder="Re-enter password"
                autoComplete="on"
                value={values.conformPassword}
                onChange={handleChange}
              />
              <span
                className="show"
                onClick={toggleConfirmPassword}

              >
                {showConfirmPassword ? (
                  <i className="bi bi-eye-slash "></i>  // Use Bootstrap icon for hide
                ) : (
                  <i className="bi bi-eye show"></i>  // Use Bootstrap icon for show
                )}
              </span>

            </div>
            {touched.conformPassword && errors.conformPassword && (
              <div className='text-danger'>{errors.conformPassword}</div>
            )}

            {/* Submit */}
            <div className="d-grid mt-3">
              <button type="submit" className="btn btn-primary btn-lg mb-1">
                Sign Up
              </button>
            </div>
          </form>
          <p className="text-center ">Already have an account? <Link to={`/login`}>Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default AdminSignup
