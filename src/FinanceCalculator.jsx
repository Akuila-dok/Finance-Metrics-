import React, { useState } from 'react';

const FinanceCalculator = () => {
  const [numProjects, setNumProjects] = useState(1);
  const [numYears, setNumYears] = useState(4);
  const [cashFlows, setCashFlows] = useState([Array(numYears).fill('')]);
  const [results, setResults] = useState([{}]);
  const [bestProjectIndex, setBestProjectIndex] = useState(null);

  const handleNumProjectsChange = (e) => {
    const value = Number(e.target.value);
    setNumProjects(value);
    setCashFlows(Array.from({ length: value }, () => Array(numYears).fill('')));
    setResults(Array(value).fill({}));
  };

  const handleNumYearsChange = (e) => {
    const value = Number(e.target.value);
    setNumYears(value);
    setCashFlows(cashFlows.map(cf => Array(value).fill('')));
    setResults(results.map(() => ({})));
  };

  const handleInputChange = (projectIndex, yearIndex, value) => {
    const newCashFlows = cashFlows.map((project, pIndex) =>
      pIndex === projectIndex ? project.map((year, yIndex) => (yIndex === yearIndex ? value : year)) : project
    );
    setCashFlows(newCashFlows);
  };

  const calculateResults = () => {
    const newResults = cashFlows.map(cashFlowArray => {
      const cashFlowNumbers = cashFlowArray.map(Number);
      return {
        payback: calculatePayback(cashFlowNumbers),
        roi: calculateROI(cashFlowNumbers),
        npv: calculateNPV(cashFlowNumbers, 0.10), // assuming 10% discount rate
        irr: calculateIRR(cashFlowNumbers)
      };
    });
    setResults(newResults);

    const highestROIIndex = newResults.reduce((bestIndex, current, index, array) => {
      return parseFloat(current.roi) > parseFloat(array[bestIndex].roi) ? index : bestIndex;
    }, 0);
    setBestProjectIndex(highestROIIndex);
  };

  return (
    <div>
      <h1>Financial Calculator</h1>
      <form>
        <label>
          Number of Projects:
          <input type="number" value={numProjects} onChange={handleNumProjectsChange} min="1" />
        </label>
        <label>
          Number of Years:
          <input type="number" value={numYears} onChange={handleNumYearsChange} min="1" />
        </label>
        {cashFlows.map((project, projectIndex) => (
          <div key={projectIndex}>
            <h2>Project {projectIndex + 1}</h2>
            {project.map((yearValue, yearIndex) => (
              <label key={yearIndex}>
                Year {yearIndex}:
                <input
                  type="number"
                  value={yearValue}
                  onChange={(e) => handleInputChange(projectIndex, yearIndex, e.target.value)}
                />
              </label>
            ))}
          </div>
        ))}
        <button type="button" onClick={calculateResults}>Calculate</button>
      </form>
      {results.map((result, index) => (
        <div key={index}>
          <h2>Results for Project {index + 1}</h2>
          <p>Payback Period: {result.payback}</p>
          <p>ROI: {result.roi}</p>
          <p>NPV: {result.npv}</p>
          <p>IRR: {result.irr}</p>
        </div>
      ))}
      {bestProjectIndex !== null && (
        <div>
          <h2>Best Project</h2>
          <p>Project {bestProjectIndex + 1} has the highest ROI, therefore, it is the best.</p>
        </div>
      )}
    </div>
  );
};

export default FinanceCalculator;

const calculatePayback = (cashFlows) => {
  let cumulativeCashFlow = 0;
  for (let i = 0; i < cashFlows.length; i++) {
    cumulativeCashFlow += cashFlows[i];
    if (cumulativeCashFlow >= 0) {
      return i; // Year when cumulative cash flow turns positive
    }
  }
  return 'Not achieved'; // Payback period not achieved within the given years
};

const calculateROI = (cashFlows) => {
  const netProfit = cashFlows.reduce((acc, val) => acc + val, 0); // Total cash flow including initial investment
  const totalExpenses = cashFlows.reduce((acc, val) => val < 0 ? acc + Math.abs(val) : acc, 0); // Sum of all expenses (negative cash flows)
  const nonZeroYears = cashFlows.filter(val => val !== 0).length; // Number of years with non-zero cash flows

  if (nonZeroYears > 0) {
    const roi = (netProfit / totalExpenses) * 100 / nonZeroYears; // Correct ROI formula using total expenses and non-zero years
    return roi.toFixed(2) + '%';
  } else {
    return 'Cannot calculate ROI with less than 1 year of cash flows';
  }
};

const calculateNPV = (cashFlows, discountRate) => {
  const npv = cashFlows.reduce((acc, val, i) => acc + val / Math.pow(1 + discountRate, i), 0);
  return npv.toFixed(2);
};

const calculateIRR = (cashFlows) => {
  const irr = IRR(cashFlows); // Use IRR implementation
  return (irr * 100).toFixed(2) + '%';
};

// Implement IRR using a numerical method (e.g., Newton-Raphson)
const IRR = (cashFlows) => {
  const accuracy = 0.0001; // Desired accuracy
  let guess = 0.1; // Initial guess
  let iteration = 0;
  const maxIterations = 1000;

  while (iteration < maxIterations) {
    let npv = 0;
    let derivative = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      npv += cashFlows[t] / Math.pow(1 + guess, t);
      derivative += -t * cashFlows[t] / Math.pow(1 + guess, t + 1);
    }
    const newGuess = guess - npv / derivative;
    if (Math.abs(newGuess - guess) < accuracy) {
      return newGuess;
    }
    guess = newGuess;
    iteration++;
  }
  return NaN; // IRR did not converge
};
