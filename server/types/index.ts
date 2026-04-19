export enum dataTypes {
  ERROR = "error",
  SUCCESS = "success",
}

type beanDetailsType = {
  process: string;
  region: string;
  variety: string[];
  scaScore: number;
};

type flavorType = {
  notes: string[];
  acidity: number;
  sweetness: number;
  bitterness: number;
};

type recipeType = {
  id: string;
  method: string;
  grindSize: string;
  waterTemp: number;
  doseIn: number;
  doseOut: number;
  timeTotal: string;
  steps: string[];
};

export type beanType = {
  id: string;
  title: string;
  country: string;
  description: string;
  roasterComment: string;
  imageUrl: string;
  details: beanDetailsType;
  flavorProfile: flavorType;
  recipes: recipeType[];
};

export type shortBeanType = Pick<
  beanType,
  "id" | "title" | "description" | "imageUrl"
>;
