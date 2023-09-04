import React, { useEffect, useState } from "react";
import { makeApiRequest } from "../HelperFunctions/ApiFetcher";
import DataDisplay from "./DataDisplay";
import { useNavigate } from "react-router-dom";

export default function LoanApplicationForm() {
  const { REACT_APP_API_URL } = process.env; // API Endpoint which assigns Application ID and starts application.
  console.log(
    "ENV URL ----> ",
    REACT_APP_API_URL,
    "and type of the cost --> ",
    typeof REACT_APP_API_URL
  );
  const [applicationId, setApplicationId] = useState(null);

  /*
   * About: UseEffect hook is used to call initiate-application API endpoint during mounting LoanApplicationForm Component
   */
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await makeApiRequest(
          REACT_APP_API_URL + "/initiate-application",
          "POST"
        ); //
        setApplicationId(response["application"]["id"]);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    fetchData();
  }, [REACT_APP_API_URL]);

  //setFormData helps to store all the form data using useState react Hook.
  const [formData, setFormData] = useState({
    companyName: "",
    startYear: "",
    contactPerson: "",
    email: "",
    loanAmount: "",
    accountProvider: "",
  });

  /**
   * handleChange function sets form data to the setFormData state and also stores according to the changes made.
   * @param {object} e
   */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [bData, setBData] = useState([]);
  const [bLoading, setBLoading] = useState(true);
  const [requestedData, setRequestedData] = useState(false);
  const apiRequestBalanceSheetUrl =
    REACT_APP_API_URL + "/balanceSheet?provider=" + formData.accountProvider;
  /**
   * fetches Data from the accounting Provider which is selected by the user.
   */
  async function fetchData() {
    //Setting Loading True for Fetching this API Call Data.
    try {
      setRequestedData(true);
      const response = await makeApiRequest(apiRequestBalanceSheetUrl); // Replace with your API URL
      setBData(response);
      setBLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setBLoading(false);
    }
  }

  /**
   * display data function helps to display the above retrieved balance Sheet Data from the Accounting Provider in the form of a Table.
   * @param {boolean} requestedData
   * @param {Object} bData
   * @returns HTML Tag or returns DataDisplay Component
   */
  const displayData = (requestedData, bData) => {
    if (requestedData) {
      if (bLoading) {
        return <div>Loading ......</div>;
      } else {
        return <DataDisplay data={bData} />;
      }
    }
  };

  const [agreement, setAgreement] = useState(false);
  /**
   * ValidReview is a function which checks of the checkbox is checked and stores the state in setAgreement.
   * @param {object} event
   */
  const validateReview = (event) => {
    setAgreement(event.target.checked);
  };

  const submitURL = REACT_APP_API_URL + "/submit-application";
  const navigate = useNavigate(); //using Navigate to traverse between single page react application.
  /**
   * HandleSubmit function sends the form data to the backend and also submits the application by changing the application status to completed at the backend.
   * The Function redirects the single page application to the decision page.
   * @param {object} e
   */
  async function handleSubmit(e) {
    e.preventDefault();
    // Handle form submission (e.g., send data to server)
    try {
      const data = { id: applicationId, form: formData, balanceSheet: bData };
      const response = await makeApiRequest(submitURL, "POST", data); // Replace with your API URL
      if (response["message"] === "Loan application completed") {
        setTimeout(() => {
          // 👇 Redirects to about page, note the `replace: true`
          navigate("/LoanDecision", { replace: true });
        }, 3000);
      } else {
        console.log("Error when redirecting to Decision Page");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  return (
    <div className="form">
      <h1 className="formTitle">Loan Application Form</h1>
      <h4>Application ID: {applicationId}</h4>
      <form onSubmit={handleSubmit}>
        <label for="companyName">Company Name: </label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Company Name"
          required
        />
        <label for="startYear">Year Established:</label>
        <input
          type="number"
          id="startYear"
          name="startYear"
          min="1"
          onChange={handleChange}
          required
        />
        <label for="contactPerson">Name of the Applicant:</label>
        <input
          type="text"
          id="contactPerson"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
          placeholder="Eg. Jhon Snow"
        />
        <label for="email">Email ID: </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Eg. sanathkumar@gmail.com"
        />
        <label for="loanAmount">Loan Amount:</label>
        <input
          type="number"
          id="loanAmount"
          name="loanAmount"
          min="1"
          onChange={handleChange}
          required
        />
        <label for="accountProvider">Select your accounting Provider:</label>
        <select
          name="accountProvider"
          id="accountProvider"
          onChange={handleChange}
          required
        >
          <option value="none" selected disabled hidden>
            Select an Option
          </option>
          <option id="accountProvider" value="Xero">
            Xero
          </option>
          <option id="accountProvider" value="MYOB ">
            MYOB
          </option>
          <option id="accountProvider" value="other">
            Other
          </option>
        </select>
        <input
          type="button"
          name="sheet"
          id="sheet"
          value="Request Balance Sheet "
          onClick={fetchData}
        />
        {displayData(requestedData, bData)}
        <div className="reviewSubmit">
          <input
            type="checkbox"
            id="balanceSheet"
            name="balanceSheet"
            onChange={validateReview}
          />
          <label for="balanceSheet">
            Please review your application before submitting it!
          </label>
          <button type="submit" disabled={!agreement}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
