import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import { addToTickets } from "../../store/ticketsSlice";
import type { IFood, IFoodCard } from "../../types";
import "./FoodCard.css";

const getImageUrl = (src: string) => new URL(src, import.meta.url).href;

function FoodCard({ id, name, price, img }: IFoodCard) {
  const [counter, setCounter] = useState<number>(0);
  const { tickets } = useAppSelector((state) => state.tickets);
  const dispatch = useAppDispatch();

  const increaseCounter = () => {
    const value = counter + 1;
    setCounter(value);
    selectFood(value);
  }

  const decreaseCounter = () => {
    if (counter === 0) return;
    const value = counter - 1;
    setCounter(value);
    selectFood(value);
  }

  const selectFood = (value: number) => {
    let food: IFood[];

    if (!tickets?.food) food = [];
    else food = [...tickets.food];

    const index = food.findIndex(item => item.id == id);

    if (index !== -1) {
        if (value > 0) {
            food[index] = {
                ...food[index],
                counter: value
            };
        } else {
            food.splice(index, 1);
        }
    } else {
        food.push({
            id,
            name,
            price,
            counter: value
        })
    }

    dispatch(addToTickets({
        "key": "food",
        "value": food
        })
    );
  };

  return (
    <div className="food-card">
      <img className="food-card__img" src={getImageUrl(img)} alt={name}></img>
      <div className="food-card__block">
        <p>{name}</p>
        <p>₹{price ? price.toFixed(2) : ""}</p>
        <div className="food-card__block-btn">
          {counter > 0 && <span className="food-card__counter">{counter}</span>}
          <button className="food-card__btn" onClick={increaseCounter}>
            Add to Ticket
          </button>
        </div>
        <button className="food-card__btn" disabled={counter === 0 } onClick={decreaseCounter}>
            Del from Ticket
          </button>
      </div>
    </div>
  );
}

export default FoodCard;
