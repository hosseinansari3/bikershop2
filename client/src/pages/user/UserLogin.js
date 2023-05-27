import React, { useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { signin } from "../../actions/users";
import { Link } from "react-router-dom";
import "./UserLogin.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Slide, toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignin = useSelector((state) => state.usersSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  let userName = "";
  let isLoggedin = false;

  if (typeof userInfo !== "undefined" && Object.keys(userInfo).length !== 0) {
    userName = userInfo.user.name;
    isLoggedin = true;
  }

  // handle login form submit
  const submitHandler = (e) => {
    e.preventDefault();
    // signin action here
    dispatch(signin(email, password));
  };
  const navigate = useNavigate();

  const loginSuccessNotif = () => toast("LOGGED IN SUCCESSFULLY!");

  useEffect(() => {
    if (isLoggedin) {
      loginSuccessNotif();
      navigate("/");
      console.log("logged in!");
    }
  }, [userInfo]);

  const validate = () =>
    Yup.object({
      username: Yup.string()
        .min(2, "Must be more than one character")
        .required("Username is required"),
      password: Yup.string()
        .min(8, "Must be more than 8 characters")
        .required("This field is required"),
    });

  const loginUser = (email, password) => {
    dispatch(signin(email, password))
      .then((res) => {
        toast.success(res, {
          position: toast.POSITION.BOTTOM_LEFT,
          transition: Slide,
        });
      })
      .catch((err) => {
        toast.error(err, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: false,
        });
      });
  };

  return (
    /*
    <Container>
      <ToastContainer />
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={validate}
        onSubmit={(values, { setSubmitting }) => {
          loginUser(values.username, values.password);
          setSubmitting(false);
        }}
      >
        <div className="login-form">
          <Container>
            <Row>
              <Col
                style={{
                  width: "100%",
                  justifyContent: "center",
                  display: "flex",
                }}
                md="4"
                sm="6"
                className="main-col"
              >
                <div className="form-container">
                  <Form className="form-horizontal">
                    <div className="form-group">
                      <span className="input-icon">
                        <i className="fa fa-user"></i>
                      </span>
                      <Field
                        name="username"
                        className="form-control"
                        placeholder="Enter username"
                      />
                      <ErrorMessage component={Toast} name="username" />
                    </div>
                    <div className="form-group">
                      <span className="input-icon">
                        <i className="fa fa-lock"></i>
                      </span>
                      <Field
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter password"
                      />
                      <ErrorMessage component={Toast} name="password" />
                    </div>
                    <div className="forgot-pass">
                      <a href="/">Lost password?</a>
                    </div>
                    <br />
                    <div className="forgot-pass">
                      Not a user, <Link to="/signup">Sign up</Link>
                    </div>
                    <Button
                      variant="primary"
                      type="submit"
                      className="btn signin"
                    >
                      Login
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Formik>
    </Container>
    */
    <span>nothing yet</span>
  );
}

export default LoginPage;
