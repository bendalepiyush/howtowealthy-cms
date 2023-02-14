export default function loanPayOff(values) {
  const loanAmountFloat = parseFloat(values.loanAmount);
  const rateOfInterestFloat = parseFloat(values.rateOfInterest) / 100;
  const durationFloat = parseFloat(values.duration);

  let emi = monthlyEMI(rateOfInterestFloat, loanAmountFloat, durationFloat);
  let remainingAmount = [loanAmountFloat];
  let principal = [0];
  let interest = [0];
  console.log(values.extraPayment);
  console.log(values.loanAmount);
  console.log(values.rateOfInterest);
  console.log(values.duration);

  for (let i = 1; i < durationFloat * 12 + 1; i++) {
    let lastBalance = remainingAmount[remainingAmount.length - 1];
    let tempInterest = (lastBalance * rateOfInterestFloat) / 12;

    interest.push(tempInterest);
    principal.push(emi - tempInterest);
    remainingAmount.push(
      lastBalance - emi + tempInterest - Number(values.extraPayment[i] ?? 0)
    );
  }

  return {
    emi,
    remainingAmount,
    principal,
    interest,
  };
}

export function monthlyEMI(rateOfInterest, loanAmount, duration) {
  return (
    (rateOfInterest * loanAmount) /
    (12 * (1 - Math.pow(1 + rateOfInterest / 12, -12 * duration)))
  );
}
