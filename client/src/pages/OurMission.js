import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import css from './OurMission.css';

export default function OurMission() {
  return (
    <div className='align-items-center mission-div'>
    <Container>
    <Row>
    <Col>
    <h1 className='missionText'>Our Mission Statement</h1>
    </Col>
    </Row>
    <Row>
    <Col>
    <p className='missionText mission-p'>
    "Our mission is to bring education and wellness to our community to relieve the stigma assocaiated with sexual orientation, practices and sexual health."
    </p>
    </Col>
    </Row>
    </Container>
    </div>
  )
}
