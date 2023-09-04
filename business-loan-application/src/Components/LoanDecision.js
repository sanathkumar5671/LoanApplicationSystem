import React, { useEffect, useState } from "react";
import { makeApiRequest } from "../HelperFunctions/ApiFetcher";
/**
 * This Component displays the decision made from the decision Engine in the BackEnd server.
 * @returns HTML Tags
 */
export default function LoanDecision() {
  const { REACT_APP_API_URL } = process.env; // Replace with your API endpoint'
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await makeApiRequest(
          REACT_APP_API_URL + "/decisionEngine",
          "POST",
        ); // Replace with your API URL
        setData(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setData("Please request your service provider using our email ID: loners@gmail.com");
        setLoading(false);
      }
    }

    fetchData();
  }, [REACT_APP_API_URL]);

  if (loading) {
    return <div>Loading decision ..... ..... .. ... . .. . .</div>;
  } else {
    return <div className="finalDecision">{data["message"]}</div>;
  }
}
