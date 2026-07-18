import { useDispatch } from "react-redux";
import { addToTickets } from "../../store/ticketsSlice";
import type { ICar, ITrain } from "../../types";
import { useAppSelector } from "../../store/storeHooks";
import "./TrainCard.css";
import MessageBox from "../MessageBox/MessageBox";
import { useState } from "react";

function TrainCard({ id, name, info, cars }: ITrain) {
  const [error, setError] = useState("");
  const { tickets } = useAppSelector((store) => store.tickets);
  const dispatch = useDispatch();
  const getBackgroundCar = (name: string) => {
    let color = "lightgrey";

    switch (name) {
      case "1A":
        color = "#F79256";
        break;
      case "2A":
        color = "#FBD1A2";
        break;
      case "3A":
        color = "#7DCFB6";
        break;
    }

    return color;
  };

  const addTrainToTicket = (element: Element, car: ICar) => {
    if (car.reserved || car.available < (tickets?.passengers || 0)) {
      setError("There are no available seats");
      return;
    }

    const payload = {
      key: "train",
      value: {
        id,
        name,
        info,
        car,
      },
    };

    document
      .querySelectorAll(".train-card__car")
      .forEach((element) => element.classList.remove("active"));
    element.classList.add("active");

    dispatch(addToTickets(payload));
  };

  return (
    <div className="train-card">
      <p className="train-card__title">
        {id} - {name}
      </p>
      <div className="train-card__group">
        <p>Runs on</p>
        <div className="train-card__group-btn">Everyday</div>
      </div>
      <div className="train-card__route">
        {[info.departure, info.arrival].map((item, i) => (
          <div key={i} className="train-card__route-station">
            <p>{item.day}</p>
            <p>{item.time}</p>
            <p>{item.station}</p>
          </div>
        ))}
        <span className="train-card__route-duration">{info.duration}</span>
      </div>
      <div className="train-card__block">
        {cars.map((car) => (
          <div
            key={id + car.name}
            className={`train-card__car ${tickets?.train?.id == id && tickets?.train?.car?.name == car.name ? "active" : ""}`}
            onClick={(e) => addTrainToTicket(e.currentTarget, car)}
            style={{ background: getBackgroundCar(car.name) }}
          >
            <p>{car.name}</p>
            <p>
              {car.reserved ? "WL" : "Avl"} - {car.available}
            </p>
            <p>{car.tariff}</p>
            <p>₹{car.price}</p>
          </div>
        ))}
      </div>
      {error && (
        <MessageBox
          text={error}
          type={"error"}
          isVisible={true}
          setIsHidden={() => setError("")}
        />
      )}
    </div>
  );
}

export default TrainCard;
