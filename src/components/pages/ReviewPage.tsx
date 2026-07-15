import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import { useEffect, useState } from "react";
import { addToTickets } from "../../store/ticketsSlice";
import "./ReviewPage.css";
import PassengerCard from "../ReviewPage/PassengerCard";
import { FOODS } from "../../constans";
import FoodCard from "../ReviewPage/FoodCard";
import MessageBox from "../MessageBox/MessageBox";

function ReviewPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { tickets, price } = useAppSelector((state) => state.tickets);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string>("");

  const applyCode = () =>
    dispatch(
      addToTickets({
        key: "promoCode",
        value: code,
      }),
    );

  const changeCode = (promo: string) => {
    setCode(promo);
    if (!!price.discount && !promo) applyCode();
  };

  const changeExtraBaggage = () =>
    dispatch(
      addToTickets({
        key: "extraBaggage",
        value: !tickets?.extraBaggage,
      }),
    );

  const toBookingPage = () => {
    navigate("/booking");
  };

  const toPaymentPage = () => {
    if (tickets?.passengersData?.length != tickets?.passengers) {
      setError("Enter info passengers");
    }
    console.log("tickets", tickets);
  };

  useEffect(() => {
    console.log("tick", tickets);
    if (!tickets || !tickets.train) navigate("/");
  }, []);

  if (!tickets || !tickets.train) return <div></div>;

  return (
    <div className="review">
      <div className="review__container">
        <p className="review-title">ReviewPage</p>
        <div className="review__train-card">
          <p className="review__train-card-title">Boarding Details</p>
          <div className="review__train-card-block">
            <p className="review__train-card-train">
              {tickets.train.id} - {tickets.train.name}
            </p>
            <p className="review__train-card-tariff">
              Class {tickets.train.car.name} & {tickets.train.car.tariff} Quota
            </p>
          </div>
          <div className="train-card__route">
            {[tickets.train.info.departure, tickets.train.info.arrival].map(
              (item, i) => (
                <div key={i} className="train-card__route-station">
                  <p>{item.day}</p>
                  <p>{item.time}</p>
                  <p>{item.station}</p>
                </div>
              ),
            )}
            <span className="train-card__route-duration">
              {tickets.train.info.duration}
            </span>
          </div>
        </div>
        <div className="review__passengers">
          {Array.from({ length: tickets.passengers }).map((_, i) => (
            <PassengerCard key={i} num={i + 1} />
          ))}
        </div>
        <div className="review__foods">
          {FOODS.map((food) => (
            <FoodCard key={food.id} {...food} />
          ))}
          <a className="review__foods-link" href="#">
            View more {">"}
          </a>
        </div>
        <div className="review__offers">
          <div className="review__card">
            <p className="review__card-title">Apply Code</p>
            <input
              type="text"
              className="review__card-input"
              placeholder="Enter Code"
              value={code}
              onChange={(e) => changeCode(e.target.value.toUpperCase())}
            />
            {code && (
              <span className="review__card-apply" onClick={applyCode}>
                {">"}
              </span>
            )}
          </div>
          <div className="review__card">
            <p className="review__card-title">Extra Baggage</p>
            <button className="review__card-btn" onClick={changeExtraBaggage}>
              {tickets.extraBaggage ? "Del From Ticket" : "Add To Ticket"}
            </button>
          </div>
          <div className="review__card">
            <p className="review__card-title">Bill details</p>
            <ul>
              <li className="review__card-category">
                <span>Base Tickets Fare</span>{" "}
                <span>₹{price.tickets.toFixed(2)}</span>
              </li>
              <li>
                <div className="review__card-category">
                  <span>Food</span> <span>₹{price.food.toFixed(2)}</span>
                </div>
                {!!tickets.food?.length &&
                  tickets.food.map((item) => (
                    <div className="review__card-details">
                      <span key={item.id}>
                        {item.name} x {item.counter}
                      </span>
                      <span>₹{(item.price * item.counter).toFixed(2)}</span>
                    </div>
                  ))}
              </li>
              <li className="review__card-category">
                <span>Extra Baggage</span>{" "}
                <span>₹{price.baggage.toFixed(2)}</span>
              </li>
              <li className="review__card-category discount">
                <span>Discount</span> <span>-₹{price.discount.toFixed(2)}</span>
              </li>
            </ul>
            <p className="review__card-summary">
              <span>Total Charge</span> <span>₹{price.total.toFixed(2)}</span>
            </p>
          </div>
        </div>
        <div className="review__book">
          <div className="review__book-disclaim">
            Discounts, offers and price concessions will be applied later during
            payment
          </div>
          {error && (
            <MessageBox
              text={error}
              type={"error"}
              isVisible={true}
              setIsHidden={() => setError("")}
            />
          )}
          <button className="review__book-btn" onClick={toPaymentPage}>
            Book now
          </button>
          <button
            className="review__book-btn cancel-btn"
            onClick={toBookingPage}
          >
            Cancel
          </button>
        </div>
        <div className="review__policy">
          <p>Cancellation Policy</p>
          <p>Terms & Conditions</p>
          <p>Travel Insurance</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewPage;
