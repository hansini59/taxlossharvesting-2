# KoinX - Tax Loss Harvesting Assignment

## Overview

This project is a **Tax Loss Harvesting** tool built with React.js. It allows users to visualize capital gains before and after harvesting and interactively select holdings to optimize tax savings.

---

## Features

- Displays **Pre-Harvesting** capital gains (Short-term and Long-term profits, losses, net gains)
- Updates **After-Harvesting** view dynamically based on user selections
- Interactive holdings table with checkboxes to select/deselect assets
- Real-time updates of capital gains and tax savings message
- Responsive design for desktop and mobile
- Mock API integration for capital gains and holdings data

---

## Tech Stack

- React.js
- CSS (Tailwind CSS / Styled Components / SCSS — specify your choice)
- Mock API using Promises within React app
- Optional: TypeScript, Component libraries (Material UI / Shadcn/UI)
- Hosting: (Add deployed link here, e.g. Vercel/Netlify)

---

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/hansini59/taxlossharvesting.git
   cd taxlossharvesting
Install dependencies

bash
Copy
Edit
npm install
# or
yarn install
Run the application

bash
Copy
Edit
npm start
# or
yarn start
Open your browser and navigate to http://localhost:3000

Folder Structure
bash
Copy
Edit
/src
  /components    # Reusable components (Cards, Table, Checkbox, etc.)
  /api           # Mock API data and functions
  /hooks         # Custom hooks (if any)
  /styles        # CSS or styling files
  App.js         # Main application component
  index.js       # React entry point
API Mock Details
Capital Gains API
Returns short-term and long-term profits and losses for holdings.

Holdings API
Returns asset details including holdings, average buy price, current price, short-term and long-term gains.

APIs are mocked using promises inside the React app for demo purposes.

Usage
View pre-harvesting capital gains summary on the left card (dark background).

Select/deselect holdings from the table below using checkboxes.

After-harvesting card (blue background) updates dynamically to show new profits, losses, and net capital gains.

If realized capital gains drop after harvesting, a tax savings message is displayed.

The “Amount to Sell” field in the holdings table reflects the total holdings for selected assets.

Screenshots
(Add screenshots here to showcase the UI)


Caption: Capital Gains cards showing before and after harvesting


Caption: Select holdings using checkboxes to update the summary

Assumptions
API data is static and mocked for demonstration.

The app assumes gains/losses are correctly computed and formatted as per assignment requirements.

Selection updates are instantaneous and cumulative.

UI responsiveness is tested for common device sizes.

Deployment
The app is deployed and accessible at:
https://your-deployment-link.vercel.app

Bonus Features (if implemented)
Mobile responsive UI

Clean, reusable React components

State management using React Context API or Redux

Loading and error states for API calls

“Select All” functionality in the holdings table

Visual feedback on selection/deselection

Contact
Created by Hansini as part of the KoinX Frontend Internship Assignment.
