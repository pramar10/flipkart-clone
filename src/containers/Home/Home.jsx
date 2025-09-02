import React from "react";
import Layout from "../../components/Layout/Layout";
import { Col, Container, Row } from "react-bootstrap";
import "./styles.css";
import { NavLink } from "react-router-dom";

function Home() {
  return <Layout sidebar></Layout>;
}

export default Home;
