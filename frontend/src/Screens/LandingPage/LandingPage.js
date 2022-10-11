import React from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./LandingPage.css";
import { useEffect } from "react";
const LandingPage = ({ history }) => {
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      history.push("/mytasks");
    }
  }, [history]);
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome To Task Manager</h1>
              <p className="subtitle">One safe place for all your Tasks</p>
            </div>
            <div className="bottonContainer">
              <a href="/login">
                <Button
                  style={{
                    backgroundColor: "#089c7b",
                    border: "0px",
                  }}
                  size="lg"
                  className="landingbutton"
                >
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button
                  style={{ backgroundColor: "#c7ce33", border: "0px" }}
                  size="lg"
                  className="landingbutton"
                  variant="outline-primary"
                >
                  Signup
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
