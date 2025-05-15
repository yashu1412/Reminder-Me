import { Route , Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateEmployeePage from "./pages/CreateReminderPage";


function App(){
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="addreminder" element={<CreateEmployeePage/>}/>
      </Routes>
    </div>
  );
}

export default App;