import React from "react";
import { QUERY_RESULT } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import css from "./Home.css";

export default function Home(props) {
  const { loading, data } = useQuery(QUERY_RESULT);
  const results = data?.results.length || [];

  console.log("ASDDD", data);

  const bloodMls = Number(470);
  const resultsNumber = Number(results);
  const numberOfResults = bloodMls * resultsNumber;

  console.log(numberOfResults);

  return (
    <div className="resultDisplayDiv">
      <Container>
        <Row>
          <Col>
            <h1 className="results">{numberOfResults} ml</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
