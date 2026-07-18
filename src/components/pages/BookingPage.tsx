import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/storeHooks";
import { TRAINS, TRIP } from "../../constans";
import TrainCard from "../BookingPage/TrainCard";
import type { ITrain } from "../../types";
import PassengersCounter from "../HomePage/PassengersCounter";
import StationInput from "../HomePage/StationInput";
import DatesInputs from "../HomePage/DatesInputs";
import "./BookingPage.css";
import holidays from "../../assets/images/holidays.png";
import packages from "../../assets/images/packages.png";
const AdCard = React.lazy(() => import('../BookingPage/AdCard'));

function BookingPage() {
  const navigate = useNavigate();
  const { tickets } = useAppSelector((store) => store.tickets);

  useEffect(() => {
    if (!tickets?.arrivalStation) navigate("/");
  }, []);

  const goToReview = () => {
    navigate("/review");
    window.scrollTo({
      top: 0,
      left:0,
      behavior: "smooth"
    });
  };

  if (!tickets) return <div></div>;

  return (
    <div className="booking">
      <div className="booking__container">
        <div className="booking__results">
          <p className="booking__results-title">Search Results</p>
          <div className="booking__results-form">
            <PassengersCounter
              passengers={tickets.passengers}
              trip={tickets.endDate ? TRIP.ROUND_TRIP : TRIP.ONE_WAY}
            />
            <div className="booking__stations-block">
              <StationInput
                name="Departure"
                station={tickets.departureStation}
              />
              <StationInput name="Arrival" station={tickets.arrivalStation} />
            </div>
            <DatesInputs
              startDate={new Date(tickets.startDate)}
              endDate={tickets.endDate ? new Date(tickets.endDate) : null}
              endDateIsActive={!!tickets.endDate}
            />
          </div>
        </div>
        <div className="booking__ad">
          <AdCard title="Planning your holidays" imgSrc={holidays} />
          <AdCard title="Train tourism packages" imgSrc={packages} />
          <div className="booking__ad-text">
            Our trains don't just transport people, they transport emotions and
            stories! From the mountains of Darjeeling to the beaches of Goa, we
            connect more than just stations. As Raj Koothrappali would say, "In
            India, we don't just ride trains, we experience cosmic journeys with
            occasional cow delays." Book now and embrace the colorful chaos!
          </div>
        </div>
        <div className="booking__trains">
          <p className="booking__trains-title">Available Trains</p>
          <div className="booking__trains-block">
            {TRAINS.map((train: ITrain) => (
              <TrainCard key={train.id} {...train} />
            ))}
          </div>
        </div>
        <button
          className="booking__btn"
          onClick={goToReview}
          disabled={!tickets?.train}
        >
          Tickets, Please!
        </button>
      </div>
    </div>
  );
}

export default BookingPage;
