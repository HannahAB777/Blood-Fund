import React  from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import emailjs from 'emailjs-com';
import css from './Contact.css';

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const submitRequest = async (e) => {
    e.preventDefault();
    console.log({ email, message, name });

    emailjs.sendForm("service_htsdhk7", "template_9ke63bf", e.target, "NWjq-n3njb60ugI1n").then(res =>{
        console.log(res);
    }).catch(console.error());

    setName("");
    setEmail("");
    setMessage("");
   
  };
  return (<div className="contactDiv">
    <Container className="align-items-center contactContainer">
    <Row>
      <Row className="contactMe">
        <Col lg="7" className="d-flex align-items-center">
          <form className="contact_form w-100" onSubmit={submitRequest}>
            <Row>
              <Col lg="6" className="form-group rounded-0 formText">
                <input
                  className="form-control formBoxContact"
                  id="name"
                  name= "name"
                  placeholder="Name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
              <Col lg="6" className="form-group rounded-0 formText">
                <input
                  className="form-control formBoxContact"
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </Col>
            </Row>
            <Row>
            <Col lg="12">
            <textarea
              className="form-control formBoxContact formText"
              name="message"
              type="text"
              placeholder="Type your message here..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              required
              rows="7"
            ></textarea>
            </Col>
            </Row>
            <Row className="btnRow">
              <Col className="btn-col">
                <button className="btn formText" type="sumbit">
                  Send
                </button>
              </Col>
              </Row>
          </form>
        </Col>
      </Row>
      <Row className="socialIconRow">
  
      </Row>
      </Row>
    </Container>
    </div>
  );
}