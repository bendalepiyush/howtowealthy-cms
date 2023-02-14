import { compoundInterest } from "./sip";

export default function loanPayOfforInvest(values) {
  const loanAmountFloat = parseFloat(values.loanAmount);
  const rateOfInterestFloat = parseFloat(values.rateOfInterest) / 100;
  const durationFloat = parseFloat(values.duration);
  const extraPaymentMonth = values.extraPaymentMonth;
  const lumpsumAmount = values.lumpsumAmount;
  const yearlyReturnsRateFloat = parseFloat(values.yearlyReturnsRate);
  let countOfPayments = 0;

  let emi = monthlyEMI(rateOfInterestFloat, loanAmountFloat, durationFloat);
  let remainingAmount = [loanAmountFloat];
  let principal = [0];
  let interest = [0];

  for (let i = 1; i < durationFloat * 12 + 1; i++) {
    let lastBalance = remainingAmount[remainingAmount.length - 1];
    let tempInterest = (lastBalance * rateOfInterestFloat) / 12;

    interest.push(tempInterest < 0 ? 0 : tempInterest);
    principal.push(tempInterest < 0 ? 0 : emi - tempInterest);

    if (tempInterest > 0) {
      countOfPayments += 1;
    }

    remainingAmount.push(
      lastBalance -
        emi +
        tempInterest -
        (i == extraPaymentMonth ? lumpsumAmount : 0)
    );
  }

  const totalEmi = durationFloat * 12 * emi;
  let totalInterestPaid = 0;
  for (let i = 0; i < interest.length; i++) {
    totalInterestPaid += interest[i];
  }

  const compound =
    compoundInterest(
      lumpsumAmount,
      yearlyReturnsRateFloat,
      (countOfPayments - extraPaymentMonth) / 12
    ) - lumpsumAmount;

  const savedInterest = totalEmi - loanAmountFloat - totalInterestPaid;

  const result =
    compound > savedInterest ? "Invest the Money" : "Payoff the Loan";

  return {
    result,
    emi,
    savedInterest,
    compound,
    countOfPayments,
  };
}

export function monthlyEMI(rateOfInterest, loanAmount, duration) {
  return (
    (rateOfInterest * loanAmount) /
    (12 * (1 - Math.pow(1 + rateOfInterest / 12, -12 * duration)))
  );
}
