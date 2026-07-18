import StationInput from "../HomePage/StationInput";
import PassengersCounter from "../HomePage/PassengersCounter";
import DatesInputs from "../HomePage/DatesInputs";
import MessageBox from "../MessageBox/MessageBox";
import { useState } from "react";
import { TRIP } from "../../constans";
import type { IStation } from "../../types/index";
import { setTickets } from "../../store/ticketsSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/storeHooks";
import "./HomePage.css";
import { STATIONS } from "../../constans/stations";

function HomePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [passengers, setPassengers] = useState(1);
  const [trip, setTrip] = useState(TRIP.ROUND_TRIP);
  const [departureStation, setDepartureStation] = useState<IStation | null>(
    null,
  );
  const [arrivalStation, setArrivalStation] = useState<IStation | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [error, setError] = useState<string>("");

  const getTickets = () => {
    const tickets = {
      passengers,
      arrivalStation,
      departureStation,
      startDate: startDate?.toISOString() || "",
      endDate: endDate?.toISOString() || "",
    };

    if (
      !Object.entries(tickets)
        .filter((arr) => arr[0] !== "endDate")
        .every((arr) => !!arr[1])
    ) {
      setError("Enter required fields!");
      return;
    } else if (
      !STATIONS.find(
        (station) => station.code === tickets.arrivalStation?.code,
      ) ||
      !STATIONS.find(
        (station) => station.code === tickets.departureStation?.code,
      )
    ) {
      setError("Enter valid stations!");
      return;
    } else {
      setError("");
    }

    dispatch(setTickets(tickets));

    navigate("/booking");
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="main">
      <h1 className="main__title">Let's Find That Ticket</h1>
      <p className="main__text">before someone else does</p>

      <div className="main__form">
        <PassengersCounter
          passengers={passengers}
          setPassengers={setPassengers}
          trip={trip}
          setTrip={setTrip} //changeTrip(value)}
        />
        <div className="main__stations-block">
          <StationInput
            name="Departure"
            placeholder="Your City/Station"
            station={departureStation}
            setStation={setDepartureStation}
          />
          <StationInput
            name="Arrival"
            placeholder="Where to?"
            station={arrivalStation}
            setStation={setArrivalStation}
          />
        </div>
        <div className="main__dates-block">
          <DatesInputs
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            endDateIsActive={trip === TRIP.ROUND_TRIP}
          />
        </div>

        {error && (
          <MessageBox
            text={error}
            type={"error"}
            isVisible={true}
            setIsHidden={() => setError("")}
          />
        )}

        <button className="main__btn" onClick={getTickets}>
          Tickets, Please!
        </button>
      </div>
    </div>
  );
}

export default HomePage;
