// import React from "react";
// import ShipmentFeatures from "./components/ShipmentFeatures";
// import Ledger from "./components/Ledger ";
// import MoneyRequests from "./components/Money";
// import BankMaster from "./components/Scanner";
// import TaxRateMaster from "./components/Tax";
// import OtherStationaryMaster from "./components/OtherStationaryMaster";

// function App() {
//   return (
//     <>
//   <MoneyRequests/>
  
//   <Ledger/>
//   <BankMaster/>
// <TaxRateMaster/>
//   <ShipmentFeatures />
//   <OtherStationaryMaster/>
//     </>
//   )
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import MoneyRequests from "./components/Money";
import ShipmentFeatures from "./components/ShipmentFeatures";
import Ledger from "./components/Ledger ";

import BankMaster from "./components/Scanner";
import TaxRateMaster from "./components/Tax";
import OtherStationaryMaster from "./components/OtherStationaryMaster";
import LogisticsForm from "./components/LogisticsForm/LogisticsForm";
import ReportsForm from "./components/ReportsForm/ReportsForm";
import ApiUsersPage from "./components/ApiUser/ApiUsersPage";

function App() {
  return (
    <Router>
      <Navbar /><br>
      </br>
      <br></br>
      <Routes>             
        
           <Route path="/" element={<LogisticsForm />} />
           <Route path="/ApiUsersPage" element={<ApiUsersPage />} />

        <Route path="/MoneyRequests" element={<MoneyRequests />} />
        <Route path="/Ledger" element={<Ledger />} />
        <Route path="/BankMaster" element={<BankMaster />} />
        <Route path="/TaxRateMaster" element={<TaxRateMaster />} />
        <Route path="/OtherStationaryMaster" element={<OtherStationaryMaster />} />
                <Route path="/ShipmentFeatures" element={<ShipmentFeatures />} />
              <Route path="/ReportsForm" element={<ReportsForm />} />
      </Routes>
    </Router>
  );
}

export default App;
