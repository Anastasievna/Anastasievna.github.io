import type { ITrain, IFoodCard } from "../types";

export const TRIP = {
  ONE_WAY: 0,
  ROUND_TRIP: 1,
};

export const PROMOCODES = {
  BOOKNOW: 50,
  FIRSTTIME: 20,
};

export const TRAINS: ITrain[] = [
  {
    id: 22426,
    name: "VANDE BHARAT",
    info: {
      departure: {
        day: "Nov 16",
        time: "11:25 pm",
        station: "New Delhi - NDLS",
      },
      arrival: {
        day: "Nov 17",
        time: "7:25 am",
        station: "Lucknow - LJN",
      },
      duration: "8 hours",
    },
    cars: [
      {
        name: "3A",
        price: 800,
        available: 46,
        reserved: false,
        tariff: "Tatkal",
      },
      {
        name: "2A",
        price: 1000,
        available: 6,
        reserved: false,
        tariff: "Tatkal",
      },
      {
        name: "1A",
        price: 1200,
        available: 36,
        reserved: true,
        tariff: "Tatkal",
      },
    ],
  },
  {
    id: 22412,
    name: "ARUNACHAL EXP",
    info: {
      departure: {
        day: "Nov 16",
        time: "11:45 pm",
        station: "New Delhi - NDLS",
      },
      arrival: {
        day: "Nov 17",
        time: "7:45 am",
        station: "Lucknow - LJN",
      },
      duration: "8 hours",
    },
    cars: [
      {
        name: "3A",
        price: 800,
        available: 446,
        reserved: false,
        tariff: "Tatkal",
      },
      {
        name: "2A",
        price: 1000,
        available: 166,
        reserved: false,
        tariff: "Tatkal",
      },
      {
        name: "1A",
        price: 1400,
        available: 6,
        reserved: true,
        tariff: "Tatkal",
      },
    ],
  },
  {
    id: 12572,
    name: "SHATABDI EXPRESS",
    info: {
      departure: {
        day: "Nov 16",
        time: "11:50 pm",
        station: "New Delhi - NDLS",
      },
      arrival: {
        day: "Nov 17",
        time: "9:50 m",
        station: "New Delhi - NDLS",
      },
      duration: "10 hours",
    },
    cars: [
      {
        name: "3A",
        price: 800,
        available: 446,
        reserved: false,
        tariff: "Tatkal",
      },
      {
        name: "2A",
        price: 1000,
        available: 166,
        reserved: false,
        tariff: "Tatkal",
      },
    ],
  },
];

export const FOODS: IFoodCard[] = [
  {
    id: 1,
    name: "Paneer Tikka Rice Bowl-Mini",
    price: 200,
    img: "../../assets/images/bowl.png",
  },
  {
    id: 2,
    name: "Grilled Tandoori Chicken with dry fruits",
    price: 500,
    img: "../../assets/images/tandoori.png",
  },
  {
    id: 3,
    name: "Aloo Paratha Curd Meal (2 pcs)",
    price: 120,
    img: "../../assets/images/curd.png",
  },
];
