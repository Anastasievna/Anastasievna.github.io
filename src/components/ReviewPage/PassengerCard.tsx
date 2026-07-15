import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import { addToTickets } from "../../store/ticketsSlice";
import "./PassengerCard.css";
import type { IPassenger } from "../../types";

interface IPassengerCardProps {
  num: number;
}

function PassengerCard({ num }: IPassengerCardProps) {
  const [passenger, setPassenger] = useState<IPassenger>({
    id: num,
    name: "",
    email: "",
    phone: "",
    dateBirth: "",
  });
  const { tickets } = useAppSelector((state) => state.tickets);
  const dispatch = useAppDispatch();

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.currentTarget.id;
    const value =
      key === "dateBirth"
        ? e.currentTarget.value.replace(/[^0-9.]/g, "")
        : e.currentTarget.value;

    setPassenger({
      ...passenger,
      [key]: value,
    });

    const passengers: IPassenger[] = tickets?.passengersData
      ? [...tickets.passengersData]
      : [];

    const isFullFilled = Object.values(passenger).every((val) => !!val);
    const index = passengers.findIndex((passenger) => passenger.id === num);

    if (isFullFilled) {
      if (index !== -1) {
        passengers[index] = {
          ...passenger,
          [key]: value,
        };
      } else {
        passengers.push({
          ...passenger,
          [key]: value,
        });
      }
    } else {
      if (index !== -1) passengers.splice(index, 1);
      else return;
    }

    dispatch(
      addToTickets({
        key: "passengersData",
        value: passengers,
      }),
    );
  };

  return (
    <div className="passenger-card">
      <p className="passenger-card__title">Passenger {num}</p>
      <p className="passenger-card__help">Please enter your contact info</p>
      <div className="passenger-card__block">
        <div className="passenger-card__item">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={passenger.name}
            placeholder="Your name"
            className="passenger-card__item-input"
            onChange={(e) => changeInput(e)}
          />
        </div>
        <div className="passenger-card__item">
          <label htmlFor="phone">Phone number</label>
          <input
            type="tel"
            id="phone"
            value={passenger.phone}
            placeholder="+91"
            className="passenger-card__item-input"
            onChange={(e) => changeInput(e)}
          />
        </div>
        <div className="passenger-card__item">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={passenger.email}
            placeholder="john.doe@company.com"
            className="passenger-card__item-input"
            onChange={(e) => changeInput(e)}
          />
        </div>
        <div className="passenger-card__item">
          <label htmlFor="date">Date of birth</label>
          <input
            type="text"
            id="dateBirth"
            value={passenger.dateBirth}
            placeholder="12.12.1975"
            className="passenger-card__item-input"
            onChange={(e) => changeInput(e)}
          />
        </div>
      </div>
    </div>
  );
}

export default PassengerCard;
