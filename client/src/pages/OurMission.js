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
    "Our mission is to bring education and wellness to our community to relieve the stigma assocaiated with sexual orientation, practices and sexual health.
    According to life blood australia 1 in 2 donations are being canceled currently. There are so many limited groups of people we are able to source from in such a time of need. Specifically gay men and those who enage in sex with gay men. The blood Fund aim to show data from this group and other fringe groups affected by donation bans so see how much clean blood is lost to prove empirically that these sources can be valuable donners. Challenging internalized homophobia and other unconscious cultural bias. To do this, I wanted to show how much blood was lost through a reporting system. Were when a member of a banned group blood tests are clean they can pledge their desire to donate their blood. I would then display this donation in terms of millimeters lost (470ml whole blood every three months). In the hope that seeing these numbers in real time the general public would understand the true impact of these laws. Not only in the blood but the ignorance they inspire, instilling fear and homopobic leading to violence and bigotry"
    </p>
    </Col>
    </Row>
    </Container>
    </div>
  )
}
