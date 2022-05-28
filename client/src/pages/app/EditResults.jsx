import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { QUERY_RESULT } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import css from "./EditResults.css";
import { DELETE_RESULT } from "../../utils/mutations";
import Auth from "../../utils/Auth";

export default function EditResults() {
  const { loading, data } = useQuery(QUERY_RESULT);
  const resultsList = data?.results || [];
  const [deleteResult, { error }] = useMutation(DELETE_RESULT);
  const navigate = useNavigate();

  const handleDeleteResult = async (
    patientFirstName,
    patientLastName,
    phoneNumber
  ) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await deleteResult({
        variables: { patientFirstName, patientLastName, phoneNumber },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container className="pastResults">
        <ul className="resultsList">
          {resultsList.map((result) => (
            <div key={result._id} className="individualResult">
              <li className="resultListItem">
                ID: {result._id}.    Patient Name:   {result.patientFirstName} {result.patientLastName}.    Contact Number: {result.phoneNumber}.    Date Created:
                {result.createdAt}.
              </li>
              <button
              className="resultsBtn" 
                onClick={(e) => {
                  navigate("/app/update-result/:id", {
                    state: {
                      id: result._id,
                      patientFirstName: result.patientFirstName,
                      patientLastName: result.patientLastName,
                      phoneNumber: result.phoneNumber,
                    },
                  });
                }}
              >
                Update
              </button>
              <button
              className="resultsBtn" 
                onClick={(e) => {
                  handleDeleteResult(
                    result.patientFirstName,
                    result.patientLastName,
                    result.phoneNumber
                  );
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </ul>
      </Container>
    </div>
  );
}
