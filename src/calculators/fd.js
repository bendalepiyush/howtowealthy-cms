export default function fd(values) {
  let interest = [];
  let totalInterest = [];
  let totalInterestInPercentage = [];
  let investmentValue = [];
  interest.push(0.0);
  totalInterest.push(0.0);
  totalInterestInPercentage.push(0.0);
  investmentValue.push(values.initialInvestment);
  for (let i = 1; i <= values.duration * 12; i++) {
    interest.push((investmentValue[i - 1] * values.rateOfInterest) / 1200);
    totalInterest.push(totalInterest[i - 1] + interest[i]);
    totalInterestInPercentage.push(
      (totalInterest[i] * 100) / investmentValue[0]
    );
    investmentValue.push(investmentValue[i - 1] + interest[i]);
  }

  for (let i = 0; i <= values.duration * 12; i++) {
    interest[i] = Number(interest[i].toFixed(2));
    totalInterest[i] = Number(totalInterest[i].toFixed(2));
    totalInterestInPercentage[i] = Number(
      totalInterestInPercentage[i].toFixed(2)
    );
    investmentValue[i] = Number(investmentValue[i].toFixed(2));
  }
  return {
    interest: interest,
    totalInterest: totalInterest,
    totalInterestInPercentage: totalInterestInPercentage,
    investmentValue: investmentValue,
  };
}
