import React from "react";
import { Accordion, Card, Button } from "react-bootstrap";

const tabs = [
  { id: 1, label: "Click here to view", description: "Content of Tab 1" }
  // { id: 2, label: "Tab 2", description: "Content of Tab 2" },
  // { id: 3, label: "Tab 3", description: "Content of Tab 3" }
];

export default function AccordionClass() {
  return (
    <div className="App">
      {tabs.map((tab) => (
        <Accordion key={tab.id}>
          {/* <Card> */}
          {/* <Card.Header> */}
          <Accordion.Toggle as={Button} variant="link" eventKey={tab.id}>
            {tab.label}
          </Accordion.Toggle>
          {/* </Card.Header> */}
          <Accordion.Collapse eventKey={tab.id}>
            <Card.Body>
              <p>One</p>
              <p>One</p>
              <p>One</p>
              <p>One</p>
              <p>One</p>
            </Card.Body>
          </Accordion.Collapse>
          {/* </Card> */}
        </Accordion>
      ))}
    </div>
  );
}
