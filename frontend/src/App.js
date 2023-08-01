import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigBar from './components/NavigBar';
import FrontPage from './pages/FrontPage';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';
import AddCar from './pages/AddCar';
import CarPage from './pages/CarPage';
import CategoryPage from './pages/CategoryPage';
import { useDispatch, useSelector } from 'react-redux';
import CartPage from './pages/CartPage';
import ShowRequests from './pages/ShowRequests';
import AddRequest from './pages/AddRequest';


function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <BrowserRouter>
        <NavigBar/>
          <Routes>
            <Route index element={<FrontPage/>}/>
            {!user && (
              <>
                <Route path="/SignIn" element={<SignIn/>}/>
                <Route path="/CreateAccount" element={<CreateAccount/>}/>
              </>
            )}
            {user && (
              <>
                <Route path="/AddCar" element={<AddCar/>}/>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/requests" element={<ShowRequests/>} />
                <Route path="/add-request" element={<AddRequest/>} />
              </>
            )}
            <Route path="*" element={<FrontPage/>}/>
            <Route path="/car/:id" element={<CarPage/>}/>
            <Route path="/category/:category" element={<CategoryPage />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
