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

            email: '',
            password: ''

        },
        validationSchema: yup.object({

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
                )
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
                    <h1 className="mb-3 text-center mt-2">Admin Login</h1>

                    <form onSubmit={handleSubmit} noValidate>


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



                        {/* Submit */}
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-lg mb-3">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default App
