export default function compound_interest(values) {
  if (values.rateOfInterestType == "option2") {
    values.rateOfInterest *= 12;
  }
  values.depositsType = Number(values.depositsType);
  if (values.additional == "None") {
    values.deposit = 0;
  } else if (values.additional == "Withdrawals") {
    values.deposit = -values.deposit;
  }

  let deposits = [];
  let yearDeposits = [];
  let totalDeposits = [];
  let yearTotalDeposits = [];
  let interest = [];
  let yearInterest = [];
  let accrusedInterest = [];
  let yearAccrusedInterest = [];
  let balance = [];
  let yearBalance = [];
  let amount = values.deposit;
  const months = values.year * 12 + values.month;

  deposits.push(values.initialInvestment);
  totalDeposits.push(values.initialInvestment);
  interest.push(0.0);
  accrusedInterest.push(0.0);
  balance.push(values.initialInvestment);

  for (let i = 1; i <= months; i++) {
    if (i % 12 == 1 && i != 1)
      values.deposit =
        (values.deposit * values.depositRate) / 100 + values.deposit;

    amount = values.deposit;

    if (values.depositsType != 1) {
      if (values.pointPeriod == "Beginning") {
        if (i % values.depositsType != 1) amount = 0;
      } else {
        if (i % values.depositsType != 0) amount = 0;
      }
    }

    deposits.push(Number(amount.toFixed(2)));
    totalDeposits.push(Number((totalDeposits[i - 1] + amount).toFixed(2)));

    if (values.pointPeriod == "Beginning") {
      interest.push(
        Number(
          (
            ((balance[i - 1] + amount) * values.rateOfInterest) /
            100 /
            12
          ).toFixed(2)
        )
      );
      accrusedInterest.push(
        Number((accrusedInterest[i - 1] + interest[i]).toFixed(2))
      );
    } else {
      interest.push(
        Number(((balance[i - 1] * values.rateOfInterest) / 100 / 12).toFixed(2))
      );
      accrusedInterest.push(
        Number((accrusedInterest[i - 1] + interest[i]).toFixed(2))
      );
    }
    balance.push(Number((totalDeposits[i] + accrusedInterest[i]).toFixed(2)));
  }
  for (let i = 0; i <= months; i += 12) {
    if (i == 0) {
      yearDeposits.push(Number(deposits[i].toFixed(2)));
      yearInterest.push(Number(interest[i].toFixed(2)));
    } else {
      yearDeposits.push(Number((deposits[i] * 12).toFixed(2)));
      yearInterest.push(
        Number((accrusedInterest[i] - accrusedInterest[i - 12]).toFixed(2))
      );
    }
    yearTotalDeposits.push(Number(totalDeposits[i].toFixed(2)));
    yearAccrusedInterest.push(Number(accrusedInterest[i].toFixed(2)));
    yearBalance.push(Number(balance[i].toFixed(2)));
  }
  if (months % 12 != 0 && months > 0) {
    const j = months % 12;
    yearDeposits.push(
      Number((totalDeposits[months] - totalDeposits[months - j]).toFixed(2))
    );
    yearInterest.push(
      Number(
        (accrusedInterest[months] - accrusedInterest[months - j]).toFixed(2)
      )
    );
    yearTotalDeposits.push(Number(totalDeposits[months].toFixed(2)));
    yearAccrusedInterest.push(Number(accrusedInterest[months].toFixed(2)));
    yearBalance.push(Number(balance[months].toFixed(2)));
  }
  return {
    deposits: deposits,
    interest: interest,
    totalDeposits: totalDeposits,
    accrusedInterest: accrusedInterest,
    balance: balance,
    yearDeposits: yearDeposits,
    yearInterest: yearInterest,
    yearTotalDeposits: yearTotalDeposits,
    yearAccrusedInterest: yearAccrusedInterest,
    yearBalance: yearBalance,
    initialInvestment: values.initialInvestment,
  };
}
