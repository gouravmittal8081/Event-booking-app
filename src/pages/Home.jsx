import React from "react";
import EventList from "../components/EventList";

const Home = () => {
  return (
    <div className="container mt-5 homeCard">
      <h1 className="text-center text-3xl font-bold colorHome">
        Live Event Booking Portal
      </h1>
      <EventList />
    </div>
  );
};

export default Home;
