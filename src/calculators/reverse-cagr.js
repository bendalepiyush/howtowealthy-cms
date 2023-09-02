export default function reverse_cagr(values) {
  let interest = [];
  let totalInterest = [];
  let totalInterestInPercentage = [];
  let investmentValue = [];
  interest.push(0.0);
  totalInterest.push(0.0);
  totalInterestInPercentage.push(0.0);
  investmentValue.push(values.initialValue);

  for (let i = 1; i <= values.duration; i++) {
    interest.push((investmentValue[i - 1] * values.cagr) / 100);
    totalInterest.push(totalInterest[i - 1] + interest[i]);
    totalInterestInPercentage.push(
      (totalInterest[i] * 100) / investmentValue[0]
    );
    investmentValue.push(investmentValue[i - 1] + interest[i]);
  }

  for (let i = 0; i <= values.duration; i++) {
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
