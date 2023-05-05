import { Routes, Route ,BrowserRouter } from "react-router-dom";
import OrganizationDetails from './Pages/OrganizationDetails';
import OrganizationList from './Pages/OrganizationList.js';
import Login from './Pages/Login.js';
// import AppBar from './Components/AppBar.js';

function App() {
  return (
    <div>
      <BrowserRouter>
      {/* <AppBar /> */}
        <Routes>
          <Route path="/organizationDetails/:_id/" element={ <OrganizationDetails/> } />
          <Route path="/organizationList/" element={ <OrganizationList/> } />
          <Route path="/" element={ <Login/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
