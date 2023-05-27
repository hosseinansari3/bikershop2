import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { register } from "../../actions/users";

function RegisterPage() {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    // check if password and confirm password match
    if (Password !== ConfirmPassword) {
      alert("password and confirm password do not match");
    } else {
      // register action here
      dispatch(register(Username, Email, Password));
    }
  };

  return (
    /*
    <Container>
      <Col>
        <Row>
          <div className="login">
            <form className="form" onSubmit={submitHandler}>
              <TextField
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                label="ConfirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="outlined"
                onClick={(e) => {
                  console.log(Password);
                }}
              >
                Register
              </Button>
            </form>
          </div>
        </Row>
      </Col>
    </Container>
    */
    <span>nothing yet</span>
  );
}

export default RegisterPage;
