import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import eventsData from "../data/events.json";
import { Card, CardBody, CardTitle, Button, Col, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EventDetails = () => {
  const { id } = useParams();
  const event = eventsData.find((e) => e.id === parseInt(id));
  const [rsvp, setRsvp] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetTime = new Date().getTime() + 1 * 60 * 60 * 1000;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!event) {
    return <h2 className="text-center">Event not found</h2>;
  }

  return (
    <div className="eventDetailsCss">
      <Col md={6} key={event.id}>
        <motion.div
          whileHover={{ scale: 1.05, backgroundColor: "#ff9600" }}
          className="motionDivClass"
        >
          <Card
            className="motionClass"
            style={{
              backgroundColor: "transparent",
              border: "none",
              position: "relative",
            }}
          >
            <div className="countdown-timer">
              <span>{timeLeft.minutes}m</span> :<span>{timeLeft.seconds}s</span>
              <span>Hurry Up </span>
            </div>

            <CardBody>
              <CardTitle tag="h4">{event.title}</CardTitle>
              <div className="d-flex">
                <div>
                  <small className="text-muted ms-1">{event.date}</small>
                  <span className="text-muted ms-2">|</span>
                  <small className="text-muted  ms-2">{event.time} </small>
                  <span className="text-muted  ms-2 me-2">|</span>
                  <small className="text-muted me-2">{event.location}</small>
                  <span className="text-muted ms-2">|</span>
                  <small className="text-muted ms-2">
                    Only <b>{event.seatsAvailable}</b> Seats Available
                  </small>
                </div>
              </div>
              <CardText className="text-muted">{event.description}</CardText>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                {!rsvp ? (
                  <Button color="success" onClick={() => setRsvp(true)}>
                    RSVP Now
                  </Button>
                ) : (
                  <div>
                    <h6>Your RSVP is confirmed!</h6>
                    <div className="d-flex justify-content-center align-items-center">
                      <QRCodeCanvas value={`event-${event.id}`} size={100} />
                    </div>
                  </div>
                )}
                <Link className="fw-bold" to={`/`}>
                  Back to Home
                </Link>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </Col>
    </div>
  );
};

export default EventDetails;
