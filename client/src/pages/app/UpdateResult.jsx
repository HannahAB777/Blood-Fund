import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_RESULT } from "../../utils/mutations";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import css from "./UpdateResults.css";
import { QUERY_RESULT } from "../../utils/queries";

export default function UpdateResult() {
  const location = useLocation();

  console.log(location);

  const [formState, setFormState] = useState({
    patientFirstName: "",
    patientLastName: "",
    phoneNumber: "",
  });

  const [UpdateResult, { data, loading, error }] = useMutation(UPDATE_RESULT, {
    refetchQueries: [
      QUERY_RESULT, // DocumentNode object parsed with gql
      "result", // Query name
    ],
  });

  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await UpdateResult({
      variables: {
        _id: location.state.id,
        patientFirstName: formState.patientFirstName,
        patientLastName: formState.patientLastName,
        phoneNumber: formState.phoneNumber,
      },
    });

    navigate("/app/enter-result");
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
          <h2>Enter Updated Results</h2>
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
            <div className="flex-row flex-end">
              <button className="resultsBtn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Col>
      <Col></Col>
    </Row>
  );
}
