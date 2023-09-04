import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

export default function ApplicationStart() {
  return (
    <section className="hero">
      <header>Loners</header>
      <h1>Welcome to Loners</h1>
      <pre>
        We Help business create a better tomorrow for generations to come{" "}
      </pre>
      <div className="appSection">
        <p>Create a better business by applying for a loan with us.</p>
        <Button>
          <Link to="/LoanApplicationForm">Start Your Application</Link>
        </Button>
      </div>
    </section>
  );
}
