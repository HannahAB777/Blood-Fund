import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_RESULT } from "../../utils/mutations";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import css from "./EnterResults.css";
import EditResults from "./EditResults";
import { QUERY_RESULT } from "../../utils/queries";

export default function EnterResult() {
  const [formState, setFormState] = useState({
    patientFirstName: "",
    patientLastName: "",
    phoneNumber: "",
    createdAt: "",
  });
  const [addResult, { error }] = useMutation(ADD_RESULT, {
    refetchQueries: [
      QUERY_RESULT, // DocumentNode object parsed with gql
      "result", // Query name
    ],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addResult({
      variables: {
        patientFirstName: formState.patientFirstName,
        patientLastName: formState.patientLastName,
        phoneNumber: formState.phoneNumber,
        createdAt: new Date(formState.createdAt),
      },
    });
    // addResult.save();
    // resetform({ values: "" });
    setFormState({
      patientFirstName: "",
      patientLastName: "",
      phoneNumber: "",
      createdAt: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Row>
      <Col>
        <div className="container enterResultsDiv">
          <h2>Enter Results</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="flex-row space-between my-2">
              <label htmlFor="patientFirstName">First Name:</label>
              <input
                className="formBox"
                placeholder="First Name"
                name="patientFirstName"
                type="patientFirstName"
                id="patientFirstName"
                onChange={handleChange}
              />
            </div>
            <div className="flex-row space-between my-2">
              <label htmlFor="patientLastName">Last Name:</label>
              <input
                className="formBox"
                placeholder="Last Name"
                name="patientLastName"
                type="patientLastName"
                id="patientLastName"
                onChange={handleChange}
              />
            </div>
            <div className="flex-row space-between my-2">
              <label htmlFor="phoneNumber">Contact Number:</label>
              <input
                className="formBox"
                placeholder="Contact Number"
                name="phoneNumber"
                type="phoneNumber"
                id="phoneNumber"
                onChange={handleChange}
              />
            </div>
            <div className="flex-row space-between my-2">
              <label htmlFor="createdAt">Date Created :</label>
              <input
                className="formBox"
                type="date"
                id="createdAt"
                name="createdAt"
                min="2022-01-01"
                onChange={handleChange}
              />
            </div>
            <div className="flex-row flex-end">
              <button className="resultsBtn" type="submit">
                Submit
              </button>
            </div>
            <div>{error && <div>{error}</div>}</div>
          </form>
        </div>
      </Col>
      <Col>
        <EditResults></EditResults>
      </Col>
    </Row>
  );
}
