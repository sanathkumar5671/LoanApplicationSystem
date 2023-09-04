/**
 * This function calculates the last 12 months profits made from the company balance sheet. However, it only checks the last 12 years from recent date.
 * @param {object} data
 * @returns {boolean}
 */
function hasMadeProfitLast12Months(data) {
  const currentDate = new Date();
  const twelveMonthsAgo = new Date(currentDate);
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  let totalProfitOrLoss = 0;

  for (const entry of data) {
    const entryDate = new Date(entry.year, entry.month - 1); // Month is 0-based
    if (entryDate >= twelveMonthsAgo && entryDate <= currentDate) {
      totalProfitOrLoss += entry.profitOrLoss;
    }
  }

  return totalProfitOrLoss > 0;
}

/**
 * Gets the Average Asset Value for the Last 12 Months using the recent date value.
 * @param {object} data
 * @returns {Float}
 */
function getAverageAssetValueLast12Months(data) {
  const currentDate = new Date();
  const twelveMonthsAgo = new Date(currentDate);
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  let totalAssetValue = 0;
  let monthCount = 0;

  for (const entry of data) {
    const entryDate = new Date(entry.year, entry.month - 1); // Month is 0-based
    if (entryDate >= twelveMonthsAgo && entryDate <= currentDate) {
      totalAssetValue += entry.assetsValue;
      monthCount++;
    }
  }

  if (monthCount === 0) {
    return 0; // Avoid division by zero
  }

  const averageAssetValue = totalAssetValue / monthCount;
  return averageAssetValue;
}

/**
 * Calculates the Summary of profit or Loss for each year mentioned in the balance sheet.
 * @param {object} data
 * @returns {Array}
 */
function calculateProfitOrLossSummary(data) {
  const summary = {};

  for (const entry of data) {
    const year = entry.year;
    const profitOrLoss = entry.profitOrLoss;

    if (!summary[year]) {
      summary[year] = 0;
    }

    summary[year] += profitOrLoss;
  }

  return summary;
}

/**
 * This calculates the preAssessment value according the rules mentioned.
 * @param {object} data
 * @param {Int} loanAmount
 * @returns
 */

function assessLoanApplication(data, loanAmount) {
  let preAssessment = 20; // Default value is 20
  const profitLast12Months = hasMadeProfitLast12Months(data);
  const averageAssetValue = getAverageAssetValueLast12Months(data);

  if (profitLast12Months) {
    preAssessment = 60; // Business made a profit in the last 12 months

    if (averageAssetValue > loanAmount) {
      preAssessment = 100; // Average asset value is greater than the loan amount
    }
  }

  return preAssessment;
}

module.exports = {
  assessLoanApplication,
  calculateProfitOrLossSummary,
};
