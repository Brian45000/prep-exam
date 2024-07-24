import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Advice } from "../components/Advice";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Home() {
  return (
    <>
      <Navbar />

      <div>
        <Card>
          <Card.Header>#Titre</Card.Header>
          <Card.Body>
            <Card.Title>Découvre ton astuce du jour ! </Card.Title>
            <Card.Text>
              <Advice />
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      <Footer />
    </>
  );
}

export default Home;
