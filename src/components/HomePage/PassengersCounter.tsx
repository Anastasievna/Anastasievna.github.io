import { TRIP } from "../../constans";
import "./PassengersCounter.css";
import minus from "../../assets/images/minus.png";
import plus from "../../assets/images/plus.png";
import person from "../../assets/images/person.png";

const MAX_PASSENGERS = 99;

interface IPassengersProps {
  passengers: number;
  setPassengers?: React.Dispatch<React.SetStateAction<number>>;
  trip: number;
  setTrip?: React.Dispatch<React.SetStateAction<number>>;
}

function PassengersCounter({
  passengers,
  trip,
  setPassengers,
  setTrip
}: IPassengersProps) {
  const isActive = !!setPassengers && !!setTrip;

  const decreasePassenger = () => {
    if (!isActive || passengers === 1) return;
    setPassengers((prevPassenger) => prevPassenger - 1);
  };

  const increasePassenger = () => {
    if (!isActive || passengers === MAX_PASSENGERS) return;
    setPassengers((prevPassenger) => prevPassenger + 1);
  };

  return (
    <div className="passengers">
      <div className="passengers__radio-btn">
        <input
          type="radio"
          name="trip"
          id="round-trip"
          value={TRIP.ROUND_TRIP}
          disabled={!isActive}
          onChange={() => isActive && setTrip(TRIP.ROUND_TRIP)}
          checked={trip === TRIP.ROUND_TRIP}
        />
        <label htmlFor="round-trip">Round trip</label>
      </div>
      <div className="passengers__radio-btn">
        <input
          type="radio"
          name="trip"
          id="one-way"
          value={TRIP.ONE_WAY}
          disabled={!isActive}
          onChange={() => isActive && setTrip(TRIP.ONE_WAY)}
          checked={trip === TRIP.ONE_WAY}
        />
        <label htmlFor="one-way">One way</label>
      </div>
      <div className="passengers__counter">
        <img src={person} alt="person" className="passengers__user-icon" />
        <button className="passengers__counter-btn" onClick={decreasePassenger} disabled={!isActive}>
          <img src={minus} alt="minus" className="passengers__btn-icon" />
        </button>
        <p className="passengers__count">{passengers}</p>
        <button className="passengers__counter-btn" onClick={increasePassenger} disabled={!isActive}>
          <img src={plus} alt="plus" className="passengers__btn-icon" />
        </button>
      </div>
    </div>
  );
}

export default PassengersCounter;
