import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Creatpost from "./component/Creatpost";
import Editpost from "./component/Editpost";

const App = () => {
return (
<Router>
    <Routes>
        <Route path='/' element={<Home />} />
    </Routes>
     <Creatpost /> 
     <Editpost/>
</Router>
)
}
export default App; 
