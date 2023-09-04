const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const xeroBalanceSheetData = require("./AccountingProviderSoftwareOutput/XeroAccountingProviderBalanceSheet.json");
const myobBalanceSheetData = require("./AccountingProviderSoftwareOutput/MyobAccountingProviderBSheet.json");
const {
  loanApplicationDecision,
} = require("./DecisionEngine/decision-Engine.js");
const {
  assessLoanApplication,
  calculateProfitOrLossSummary,
} = require("./HelperFunctions/helperFunctions.js");

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// In-memory storage for loan applications
const applications = [];

// Endpoint to initiate a loan application
app.post("/initiate-application", (req, res) => {
  const newApplication = {
    id: applications.length + 1,
    status: "incomplete",
  };

  applications.push(newApplication);

  res.json({
    message: "Loan application initiated",
    application: newApplication,
  });
});

// Endpoint to send Balance Sheet
app.get("/balanceSheet", (req, res) => {
  if (req.query.provider === "Xero") {
    res.send(xeroBalanceSheetData);
  } else if (req.query.provider === "MYOB") {
    res.send(myobBalanceSheetData);
  } else {
    res.send({
      message:
        "Please Request your Accounting Provider to be Added by sending us an email.",
    });
  }
});

// Endpoint to complete a loan application
let formDataDuplicate = [];
let balanceSheetData = [];
app.post("/submit-application", (req, res) => {
  const applicationId = parseInt(req.body.id);
  const formData = req.body.form;
  const balanceSheet = req.body.balanceSheet;
  //Pushing data globally to make it available 
  formDataDuplicate.push(formData);
  balanceSheetData.push(balanceSheet);

  const application = applications.find((app) => app.id === applicationId);

  if (!application) {
    return res.status(404).json({ message: "Application not found" });
  }

  // Update application status and data
  application.status = "completed";
  
  res.json({ message: "Loan application completed", application });
});

// Endpoint for decision Engine
app.post("/decisionEngine", (req, res) => {
  const profitOrLossSummaryData = calculateProfitOrLossSummary(
    balanceSheetData[0]
  );
  const loanAmountData = formDataDuplicate[0]["loanAmount"];
  const businessData = {
    companyName: formDataDuplicate[0]["companyName"],
    yearEstablished: formDataDuplicate[0]["startYear"],
    profitOrLossSummary: profitOrLossSummaryData,
    loanAmount: loanAmountData,
  };
  const preAssessmentValue = assessLoanApplication(
    balanceSheetData[0],
    loanAmountData
  );
  const decision = loanApplicationDecision(businessData, preAssessmentValue);

  res.send(decision);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
