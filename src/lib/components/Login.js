import React, { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik";
const axios = require("axios");
import { useCookies } from 'react-cookie';
import * as Yup from 'yup';
import Router from "next/router";



const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(4, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
});
export const Login = () => {


    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    const [loginErrorResponse, setLoginErrorResponse] = useState("")
    const [reload, reRender] = useState()
    useEffect(() => { });

    const handleLogin = async (values) => {
        console.log(values)
        try {
            console.log("VALUES", values)
            const response = await axios.post(process.env.NEXT_PUBLIC_USER_LOGIN, { ...values })
            console.log(response);
            if (response.status === 200) {
                console.log("LOGGED IN ")
                setCookie("accessTokenAL", response.data.data.token, "/")
                setCookie("userNameAL", response.data.data.userName)
                setCookie("instituteNameAL", response.data.data.instituteName)
                setCookie("roleAL", response.data.data.role)
                reRender({})
                if (response.data.data.role != "bdm") {

                    Router.push("/")
                } else {
                    Router.push("/super-dtrf")
                }
                console.log(cookies.accessToken)
            }
        } catch (e) {

            // console.log(e.response.data.data);
        }
    }

    return (
        <div>
            <div id="app">
                <section className="section">
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h4>Login</h4>
                                    </div>
                                    <div className="card-body">
                                        <Formik
                                            initialValues={{
                                                email: "",
                                                password: ""
                                            }}
                                            validationSchema={loginSchema}
                                            onSubmit={(values, { setSubmitting }) => {
                                                handleLogin(values);
                                            }}
                                        >
                                            {({ values, errors, touched }) => (
                                                <Form>
                                                    <div>
                                                        <div className="form-group">
                                                            <label for="email">Email</label>
                                                            <Field
                                                                id="email"
                                                                type="email"
                                                                className="form-control"
                                                                name="email"
                                                                autofocus
                                                            />
                                                            {errors.email && touched.email ? (
                                                                <div className="formErr" >{errors.email}</div>
                                                            ) : null}
                                                            {/* <div className="invalid-feedback">
                                  Please fill in your email
                                </div> */}
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="d-block">
                                                                <label for="password" className="control-label">
                                                                    Password
                                                                </label>
                                                                <div className="float-right">
                                                                    <a
                                                                        href="auth-forgot-password.html"
                                                                        className="text-small"
                                                                    ></a>
                                                                </div>
                                                            </div>
                                                            <Field
                                                                id="password"
                                                                type="password"
                                                                className="form-control"
                                                                name="password"
                                                            />
                                                            {errors.password && touched.password ? (
                                                                <div className="formErr" >{errors.password}</div>
                                                            ) : null}
                                                            {/* <div className="invalid-feedback">
                                  please fill in your password
                                </div> */}
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="custom-control custom-checkbox">
                                                                <div className="formErr">{loginErrorResponse}</div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <button
                                                                type="submit"
                                                                className="btn btn-primary btn-lg btn-block"
                                                            >
                                                                Login
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>



    )
}


export default Login