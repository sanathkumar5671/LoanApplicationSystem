# Problem Statement

This project was based on the given Problem Statement By Demyst. Please view the complete statement {https://github.com/DemystData/code-kata/blob/main/README.md}.

## Pre-requirements

To run this project:
1. Install Docker in your system.

## Command to Run the Project
After Cloning the repo and installing docker, run the below command:

### `docker-compose up --build`

## Intro

The Project uses React.js for client-side (frontend) and Express.js(Node.js) for server-side (backend).

The Code runs according the flow diagram mentioned in the problem Statement

sequenceDiagram
  Actor User as User
  participant FE as Frontend
  participant BE as Backend
  participant ASP as Accounting Software
  participant DE as Decision Engine

  User ->> FE: Start Application

  FE ->> BE: Initiate Application
  BE ->> FE: Initiate Complete

  User ->> FE: Fill Business Details & Loan amount
  User ->> FE: Select Accounting provider
  User ->> FE: Request Balance Sheet
  FE ->> BE: Fetch Balance Sheet
  BE ->> ASP: Request Balance Sheet
  ASP ->> BE: Return Balance Sheet
  BE ->> FE: Return Details for Review

  User --> FE: Review Complete
  User ->> FE: Submit Application

  FE ->> BE: Request outcome
  BE ->> BE: Apply Rules to summarise application
  BE ->> DE: Request Decision
  DE ->> BE: Returns outcome

  BE ->> FE: Application Result
  FE ->> User: Final Outcome


