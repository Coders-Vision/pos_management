export const currrencyFormatter = (amount: number) => {
const amt = new Intl.NumberFormat('en-KW', { style: 'currency', currency: 'KWD' }).format(amount)
return amt
}