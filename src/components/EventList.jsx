import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import { Clock } from "react-feather";
import { motion } from "framer-motion";
import eventsData from "../data/events.json";

const EventList = () => {
  const [filter, setFilter] = useState("");

  const filteredEvents = filter
    ? eventsData.filter((event) => event.category.includes(filter))
    : eventsData;

  const colors = [
    "#f9b234",
    "#3ecd5e",
    "#e44002",
    "#952aff",
    "#cd3e94",
    "#4c49ea",
  ];
  const hoverColors = [
    "#ff0000",
    "#28a745",
    "#ff5733",
    "#7d3cff",
    "#e83e8c",
    "#6c63ff",
  ];

  return (
    <div className="mt-4 eventList">
      <Form>
        <FormGroup>
          <Label for="categoryFilter" className="categoryFilter">
            Filter by Category
          </Label>
          <Input
            type="select"
            id="categoryFilter"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Technology">Technology</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Business">Business</option>
            <option value="Health & Wellness">Health & Wellness</option>
            <option value="Artificial Intelligence">AI</option>
          </Input>
        </FormGroup>
      </Form>
      <Row>
        {filteredEvents.map((event, index) => {
          const bgColor = colors[index % colors.length];
          const hoverBgColor = hoverColors[index % hoverColors.length];
          return (
            <Col md={6} key={event.id} className="mb-4">
              <motion.div
                whileHover={{ scale: 1.05, backgroundColor: hoverBgColor }}
                style={{
                  backgroundColor: bgColor,
                  borderRadius: "15px",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <Card className="motionClass" id="motionId">
                  <CardBody>
                    <div className="d-flex text-center align-items-center flex-column">
                      <Clock size="32" className="mb-1" />
                      <h5 className="mb-1 fw-bolder text-white">
                        {event.title}
                      </h5>
                      <p className="text-white">Date: {event.date}</p>
                      <p className="mb-55 text-white">
                        Location: {event.location}
                      </p>
                      <Link to={`/event/${event.id}`} className="btn btn-light">
                        View Details
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default EventList;
