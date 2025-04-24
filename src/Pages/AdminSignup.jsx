import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

const App = () => {
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
          (value) => value && !/^@.+$/.test(value.trim())
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
    onSubmit: (data) => {
      console.log(data)
      resetForm()
    }
  })

  return (
    <div className="container py-5">
      <div className="row justify-content-center ">
        <div className="col-md-6  border rounded ">
          <h1 className="mb-3 text-center mt-2">Admin Sign-up</h1>
          
          <form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="name"
                className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                placeholder="Enter your name"
                value={values.name}
                onChange={handleChange}
              />
              {touched.name && errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange}
              />
              {touched.email && errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

           

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                placeholder="Enter password"
                autoComplete="on"
                value={values.password}
                onChange={handleChange}
              />
              {touched.password && errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label htmlFor="conform_password" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="conform_password"
                name="conformPassword"
                className={`form-control ${touched.conformPassword && errors.conformPassword ? 'is-invalid' : ''}`}
                placeholder="Re-enter password"
                autoComplete="on"
                value={values.conformPassword}
                onChange={handleChange}
              />
              {touched.conformPassword && errors.conformPassword && (
                <div className="invalid-feedback">{errors.conformPassword}</div>
              )}
            </div>

            {/* Submit */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg mb-3">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
