# React + Vite
Finance Calculator App
Overview
The Finance Calculator App is a React-based application designed to evaluate and compare the financial metrics of various projects. The app allows users to input cash flows for multiple projects over a specified number of years and calculates key financial metrics such as Payback Period, Return on Investment (ROI), Net Present Value (NPV), and Internal Rate of Return (IRR). The app also identifies the project with the highest ROI, making it the best investment option among those evaluated.

Features
Multi-Project Evaluation: Input and evaluate the financial metrics of multiple projects.
Dynamic Input Handling: Adjusts input fields based on the number of projects and years selected.
Comprehensive Financial Metrics:
Payback Period: The time it takes for cumulative cash flows to turn positive.
Return on Investment (ROI): The average annual return on the total investment.
Net Present Value (NPV): The present value of future cash flows discounted at a specified rate.
Internal Rate of Return (IRR): The discount rate that makes the NPV of cash flows zero.
Best Project Selection: Automatically identifies and highlights the project with the highest ROI.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/akuila-dok/finance-calculator-app.git
cd finance-calculator-app
Install dependencies:

bash
Copy code
npm install
Run the app:

bash
Copy code
npm start
The app will be available at http://localhost:3000.

Usage
Specify the number of projects you want to evaluate.
Specify the number of years for which you want to evaluate the projects.
Input the cash flows for each project for each year.
Click the Calculate button to see the financial metrics.
Review the results for each project, including Payback Period, ROI, NPV, and IRR.
The app will highlight the project with the highest ROI.
Code Structure
src/components/FinanceCalculator.js: Main component handling the financial calculations and user interactions.
Utility Functions:
calculatePayback: Calculates the Payback Period.
calculateROI: Calculates the Return on Investment.
calculateNPV: Calculates the Net Present Value.
calculateIRR: Calculates the Internal Rate of Return.
Contributing
Contributions are welcome! If you'd like to contribute, please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Commit your changes.
Push the branch to your fork.
Open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
