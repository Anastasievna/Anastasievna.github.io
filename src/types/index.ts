export interface IStation {
  name: string;
  code: string;
}

export interface ITrain {
  id: number;
  name: string;
  info: ITrainInfo;
  cars: ICar[];
}

export interface ITrainInfo {
  departure: {
    day: string;
    time: string;
    station: string;
  };
  arrival: {
    day: string;
    time: string;
    station: string;
  };
  duration: string;
}

export interface ICar {
  name: string;
  price: number;
  available: number;
  reserved: boolean;
  tariff: string;
}

export interface IFoodCard {
  id: number;
  name: string;
  price: number;
  img: string;
}

export interface IFood {
  id: number;
  name: string;
  price: number;
  counter: number;
}

export interface IPassenger {
  id: number;
  name: string;
  email: string;
  phone: string;
  dateBirth: string;
}

export interface ITicketTrain {
  id: number;
  name: string;
  info: ITrainInfo;
  car: ICar;
}

export interface ITicket {
  passengers: number;
  arrivalStation: IStation | null;
  departureStation: IStation | null;
  startDate: string;
  endDate: string | null;
  train?: ITicketTrain;
  passengersData?: IPassenger[];
  food?: IFood[];
  extraBaggage?: boolean;
  promoCode?: string;
}

export interface IPrice {
  tickets: number;
  food: number;
  baggage: number;
  discount: number;
  total: number;
}
