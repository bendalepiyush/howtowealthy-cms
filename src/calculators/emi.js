export default function emi(values) {
  let months = values.year * 12 + values.month;
  let yearlyPrincipal = [];
  let principal = [];
  let yearlyInterest = [];
  let interest = [];
  let yearlyTotalPayment = [];
  let totalPayment = [];
  let yearlyBalance = [];
  let balance = [];
  let yearlyLoanPaidPercentage = [];
  let loanPaidPercentage = [];
  let Interest = 0;

  let emi = Number(
    (values.loanValue *
      (values.rateOfInterest / 1200) *
      Math.pow(1 + values.rateOfInterest / 1200, months)) /
      (Math.pow(1 + values.rateOfInterest / 1200, months) - 1)
  );

  principal.push(0.0);
  yearlyPrincipal.push(0.0);
  interest.push(0.0);
  yearlyInterest.push(0.0);
  totalPayment.push(0.0);
  yearlyTotalPayment.push(0.0);
  balance.push(values.loanValue);
  yearlyBalance.push(values.loanValue);
  loanPaidPercentage.push(0.0);
  yearlyLoanPaidPercentage.push(0.0);

  let x = 0;
  for (let i = 1; i <= months; i++) {
    interest.push((balance[i - 1] * values.rateOfInterest) / 1200);
    Interest += interest[i];
    principal.push(emi - interest[i]);
    totalPayment.push(emi);
    balance.push(balance[i - 1] - principal[i]);
    loanPaidPercentage.push(((balance[0] - balance[i]) / balance[0]) * 100);
    if (i % 12 == 0) {
      yearlyInterest.push(Interest - x);
      yearlyTotalPayment.push(emi * 12);
      yearlyPrincipal.push(yearlyTotalPayment[i / 12] - yearlyInterest[i / 12]);
      yearlyBalance.push(yearlyBalance[i / 12 - 1] - yearlyPrincipal[i / 12]);
      yearlyLoanPaidPercentage.push(
        ((yearlyBalance[0] - yearlyBalance[i / 12]) / yearlyBalance[0]) * 100
      );
      x = Interest;
    }
  }

  if (months % 12 != 0) {
    yearlyInterest.push(Interest - x);
    yearlyTotalPayment.push(emi * (months % 12));
    console.log(yearlyTotalPayment[Math.floor(months / 12) + 1]);
    yearlyPrincipal.push(
      yearlyTotalPayment[Math.floor(months / 12) + 1] -
        yearlyInterest[Math.floor(months / 12) + 1]
    );
    yearlyBalance.push(
      yearlyBalance[Math.floor(months / 12)] -
        yearlyPrincipal[Math.floor(months / 12) + 1]
    );
    yearlyLoanPaidPercentage.push(
      ((yearlyBalance[0] - yearlyBalance[Math.floor(months / 12) + 1]) /
        yearlyBalance[0]) *
        100
    );
  }
  for (let i = 1; i <= months; i++) {
    interest[i] = Number(interest[i].toFixed(0));
    principal[i] = Number(principal[i].toFixed(0));
    totalPayment[i] = Number(totalPayment[i].toFixed(0));
    balance[i] = Number(balance[i].toFixed(0));
    loanPaidPercentage[i] = Number(loanPaidPercentage[i].toFixed(2));
  }
  for (let i = 1; i <= months / 12; i++) {
    yearlyInterest[i] = Number(yearlyInterest[i].toFixed(0));
    yearlyPrincipal[i] = Number(yearlyPrincipal[i].toFixed(0));
    yearlyTotalPayment[i] = Number(yearlyTotalPayment[i].toFixed(0));
    yearlyBalance[i] = Number(yearlyBalance[i].toFixed(0));
    yearlyLoanPaidPercentage[i] = Number(
      yearlyLoanPaidPercentage[i].toFixed(2)
    );
  }
  if (months % 12 != 0) {
    yearlyInterest[Math.floor(months / 12) + 1] = Number(
      yearlyInterest[Math.floor(months / 12) + 1].toFixed(0)
    );
    yearlyPrincipal[Math.floor(months / 12) + 1] = Number(
      yearlyPrincipal[Math.floor(months / 12) + 1].toFixed(0)
    );
    yearlyTotalPayment[Math.floor(months / 12) + 1] = Number(
      yearlyTotalPayment[Math.floor(months / 12) + 1].toFixed(0)
    );
    yearlyBalance[Math.floor(months / 12) + 1] = Number(
      yearlyBalance[Math.floor(months / 12) + 1].toFixed(0)
    );
    yearlyLoanPaidPercentage[Math.floor(months / 12) + 1] = Number(
      yearlyLoanPaidPercentage[Math.floor(months / 12) + 1].toFixed(2)
    );
  }
  emi = Number(emi.toFixed(0));
  Interest = Number(Interest.toFixed(0));
  return {
    emi: emi,
    totalInterest: Interest,
    principal: principal,
    interest: interest,
    totalPayment: totalPayment,
    balance: balance,
    loanPaidPercentage: loanPaidPercentage,
    yearlyPrincipal: yearlyPrincipal,
    yearlyInterest: yearlyInterest,
    yearlyTotalPayment: yearlyTotalPayment,
    yearlyBalance: yearlyBalance,
    yearlyLoanPaidPercentage: yearlyLoanPaidPercentage,
  };
}
