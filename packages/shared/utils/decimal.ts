import Decimal from "decimal.js";
import { Decimal as ProtoDecimal } from "./../proto/decimal";

// Wire up toformat, which adds the toformat function to Decimal
import toFormat from "toformat";
toFormat(Decimal);

export const fiatDecimalToString = (
  decimal?: ProtoDecimal,
  options?: { dp?: number } // = { dp: 2 }
) => {
  if (!decimal) {
    return "0";
  }

  let value = new Decimal(decimal.value);

  if (options?.dp) {
    return value.toFormat(options.dp);
  }

  return `${value}`;
};

export const decimalToString = (
  decimal?: ProtoDecimal
  // options: { dp: number } = { dp: 8 }
) => {
  if (!decimal) {
    return "0";
  }

  let value = new Decimal(decimal.value);
  // if (options.dp) {
  //   value = value.toDP(options.dp);
  // }

  return `${value}`;
};
