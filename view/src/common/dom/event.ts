import React from "react";
import { pipe } from "../fp/pipe";

export const getValueFromEvent = (e: React.ChangeEvent<HTMLInputElement>) =>
  e.target.value;

export const getNumberFromEvent = pipe(getValueFromEvent, Number);
