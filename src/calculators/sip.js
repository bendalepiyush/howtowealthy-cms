export default function sipReturnAmountPerMonth(values) {
  let chartOfTotalDeposits = [];
  let chartPerMonth = [];
  let chartPerMonthWithInflation = [];
  let chartOfInvestmnet = [];
  let initialValue = 0;
  let initialValueWithInflation = 0;
  let increment = values.monthlyInvestment;
  let tableLabels = [];
  let chartOfIncrement = [];
  let totalDeposit = 0;
  const loop = values.retirementAge - values.currentAge;

  for (let i = 0; i < loop; i++) {
    if (i !== 0) {
      increment = (increment * (100 + values.increaseMonthlyInvestment)) / 100;
    }

    for (let j = 0; j < 12; j++) {
      initialValue = initialValue + increment;
      initialValueWithInflation = initialValueWithInflation + increment;

      let tempWoInflation = compoundInterest(
        initialValue,
        values.yearlyReturnsRate,
        1 / 12
      );

      let tempWithInflation = compoundInterest(
        initialValueWithInflation,
        values.yearlyReturnsRate - values.inflationRate,
        1 / 12
      );

      if (j == 11) {
        chartPerMonth.push(Math.round(tempWoInflation));
        chartPerMonthWithInflation.push(Math.round(tempWithInflation));
        chartOfInvestmnet.push(Math.round(initialValue));
        chartOfIncrement.push(Math.round(increment));
        tableLabels.push(i + 1);
        chartOfTotalDeposits.push(Math.round(totalDeposit + increment));
      }

      initialValue = tempWoInflation;
      initialValueWithInflation = tempWithInflation;
      totalDeposit += increment;
    }
  }

  let inflationAdjusted = Math.round(
    chartPerMonthWithInflation[chartPerMonthWithInflation.length - 1]
  );

  return {
    chartPerMonth,
    inflationAdjusted,
    chartOfInvestmnet,
    tableLabels,
    chartOfIncrement,
    chartOfTotalDeposits,
  };
}

export function compoundInterest(initialValue, cagrPercent, duration) {
  const initialValueFloat = parseFloat(initialValue);
  const cagrPercentFloat = parseFloat(cagrPercent);
  const durationFloat = parseFloat(duration);

  return (
    initialValueFloat * Math.pow((100 + cagrPercentFloat) / 100, durationFloat)
  );
}
