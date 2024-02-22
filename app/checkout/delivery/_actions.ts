"use server";

import { State } from "../_components/multi-step-provider";

export const checkoutAction = async (data: State) => {
  console.log("checkoutAction", data);
};
