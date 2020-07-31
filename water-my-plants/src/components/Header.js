import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = styled.div`
  background: gray;
`;
const Links = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-evenly;
  font-size: 1.5rem;
  text-decoration: none;
`;

export default function header() {
  return (
    <Header>
      <header>
        <nav>
          <Links>
            <Link
              to={"/Register"}
              style={{ textDecoration: "none", color: "#ef8354" }}
              // style={{ color: "#ef8354" }}
            >
              SignUp
            </Link>
            <Link
              to={"/"}
              style={{ textDecoration: "none", color: "#ef8354" }}
              // style={{ color: "#ef8354" }}
            >
              Login
            </Link>
          </Links>
        </nav>
      </header>
    </Header>
  );
}
