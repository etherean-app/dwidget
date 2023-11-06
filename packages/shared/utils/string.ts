export const beautifyAmount = (amount: string) => {
  return amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
