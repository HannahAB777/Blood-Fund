import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EnterResult from "./pages/app/EnterResult";
import Resources from "./pages/Resources";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import PublicLayout from "./layouts/PublicLayout";
import OurMission from "./pages/OurMission";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import React from "react";
import ProectedRoute from "./utils/ProectedRoute";
import UpdateResult from "./pages/app/UpdateResult";

// Construct our main GraphQL API endpoint
const httpLink = new HttpLink({ uri: "/graphql" });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem("id_token");

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <PublicLayout>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/ourmission" element={<OurMission />}></Route>

            <Route path="/resources" element={<Resources />}></Route>

            <Route path="/contact" element={<Contact />}></Route>

            <Route path="/signup" element={<SignUp />}></Route>

            <Route path="/login" element={<Login />}></Route>

            <Route path="/app/logout" element={<Home />}></Route>

            <Route
              path="/app/enter-result"
              element={
                <ProectedRoute>
                  <EnterResult />
                </ProectedRoute>
              }
            ></Route>
            <Route
              path="/app/update-result/:id"
              element={
                <ProectedRoute>
                  <UpdateResult/>
                </ProectedRoute>
              }
            ></Route>

            <Route path="/app/" element={<Home />}></Route>

            <Route
              path="*"
              element={<h1 className="display-2">Wrong page!</h1>}
            />
          </Routes>
        </PublicLayout>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
