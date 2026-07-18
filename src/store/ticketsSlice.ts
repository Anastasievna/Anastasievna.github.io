import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IPrice, ITicket } from "../types";
import { PROMOCODES } from "../constans";

interface ITicketState {
  tickets: ITicket | null;
  price: IPrice;
}

interface IPayload {
  value: ITicket[keyof ITicket];
  key: string;
}

const initialState: ITicketState = {
  tickets: null,
  price: {
    tickets: 0,
    food: 0,
    baggage: 0,
    discount: 0,
    total: 0
  },
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setTickets: (state, action: PayloadAction<ITicket>) => {
      state.tickets = action.payload;
    },
    addToTickets: (state, action: PayloadAction<IPayload>) => {
      const newTickets ={
        ...state.tickets,
        [action.payload.key]: action.payload.value,
      } as ITicket

      const tickets = newTickets.passengers * (newTickets.train?.car?.price || 0);
      const food = newTickets.food?.reduce((sum, current) => sum + current.price * current.counter, 0) || 0;

      let newPrice = {
        tickets, food, 
        baggage: newTickets.extraBaggage ? 500 : 0
      }

      const total = Object.values(newPrice).reduce((sum, value) => sum + value, 0);
      const discount = newTickets.promoCode ? PROMOCODES[newTickets.promoCode as (keyof typeof PROMOCODES)] ?? 0 : 0;

      (newPrice as IPrice) = {
        ...newPrice, 
        discount: total * discount/100,
        total: total - total * discount/100
      }

      console.log("tickets", newTickets);

      state.price = newPrice as IPrice;
      state.tickets = newTickets;
    },
  },
});

export const { setTickets, addToTickets } = ticketsSlice.actions;
export default ticketsSlice.reducer;
