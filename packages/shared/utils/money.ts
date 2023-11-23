import { Money } from "./../proto/money";
import { Money as AmountMoney } from "./../proto/amount";
import { fiatDecimalToString } from "./decimal";
import { beautifyAmount } from "./string";

export const fiatMoneyToString = (money?: Money | AmountMoney) => {
  if (!money) {
    return "0";
  }

  if ("currencyCode" in money) {
    const units = beautifyAmount(money.units.toString());
    const nanos = money.nanos.toString(); //.substring(0, 2);
    return `${units}.${nanos}`;
  }

  if ("currency" in money) {
    return fiatDecimalToString(money.value);
  }

  throw new Error("unknown type of money");
};

export const moneyToString = (money?: Money) => {
  if (!money) {
    return "0";
  }

  return `${money.units}.${parseFloat(money.nanos.toFixed(2))}`;
};
