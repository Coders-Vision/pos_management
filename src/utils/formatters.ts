export const currrencyFormatter = (amount: number) => {
  const amt = new Intl.NumberFormat("en-KW", {
    style: "currency",
    currency: "KWD",
  }).format(amount);
  return amt;
};

export const numberFormat = (amount: number) => {
  const amt = parseFloat(
    amount.toLocaleString("en-KW", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    })
  );
  return amt;
};
