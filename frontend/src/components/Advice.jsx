// src/components/Advice.js

import React, { useState, useEffect } from "react";
import axios from "axios";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import "../styles/Advice.css"; // Importez le fichier CSS pour styliser le footer
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export function Advice() {
  //State
  const [id, setId] = useState("");
  const [astuce, setAstuce] = useState("");
  const [idSaisi, setidSaisi] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  //Comportement
  const fetchAdvice = async () => {
    try {
      await axios
        .get("https://api.adviceslip.com/advice")
        .then((res) => {
          if (res.data && res.data.slip) {
            setId(res.data.slip.id);
            setAstuce(res.data.slip.advice);
          } else {
            // toast.error("Invalid response structure");
            throw new Error("Invalid response structure");
          }
        })
        .catch(function (error) {
          // Faire un toast
          // toast.error(error);
          console.error("ERROR :", error);
        });
    } catch (error) {
      // toast.error(error);
      console.error("Error fetching advice:", error);
    }
  };

  const fetchAdviceID = async (id) => {
    try {
      await axios
        .get(`https://api.adviceslip.com/advice/${id}`)
        .then((res) => {
          if (res.data && res.data.slip) {
            setId(res.data.slip.id);
            setAstuce(res.data.slip.advice);
          } else {
            // toast.error("Invalid response structure");
            throw new Error("Invalid response structure");
          }
        })
        .catch(function (error) {
          // Faire un toast
          // toast.error(error);
          console.error("ERROR :", error);
        });
    } catch (error) {
      // toast.error(error);
      console.error("Error fetching advice:", error);
    }
  };

  const fetchAdviceIDbackend = async (id) => {
    try {
      await axios
        .get(`http://localhost:5000/our-api/${id}`, {
          headers: {
            "X-CSRF-Token": csrfToken, // Include CSRF token in headers
          },
        })
        .then((res) => {
          if (res.data && res.data.slip) {
            setId(res.data.slip.id);
            setAstuce(res.data.slip.advice);
          } else {
            throw new Error("Invalid response structure");
          }
        })
        .catch(function (error) {
          console.error("ERROR :", error);
        });
    } catch (error) {
      console.error("Error fetching advice:", error);
    }
  };

  // Fetch the CSRF token when the component mounts
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get("http://localhost:5000/");
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };
    fetchCsrfToken();
  }, []);

  useEffect(() => {
    fetchAdvice();
  }, []);

  // 2 fois a cause du premier use effect
  useEffect(() => {
    // toast.success("Astuce Mis à jour !");
  }, [astuce]);

  //Render
  return (
    <>
      {/* <ToastContainer /> */}
      <div className="advice">
        <h1>Conseil du jour # {id}</h1>
        <p>{astuce}</p>
        <Button onClick={fetchAdvice} variant="outline-danger">
          Une autre !
        </Button>

        <Form>
          <Form.Group className="mb-3" controlId="formBasicID">
            <Form.Label>ID</Form.Label>
            <Form.Control
              onChange={(e) => setidSaisi(e.target.value)}
              value={idSaisi}
              type="id"
              placeholder="Enter id"
            />
          </Form.Group>

          <Button
            onClick={() => fetchAdviceID(idSaisi)}
            variant="outline-primary"
          >
            Je veux celui là !
          </Button>

          <Button
            onClick={() => fetchAdviceIDbackend(idSaisi)}
            variant="outline-primary"
          >
            Bouton backend !
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Advice;
