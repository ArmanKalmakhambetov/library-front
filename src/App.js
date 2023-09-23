import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import AllBooks from "./components/AllBooks";
import AddBookForm from "./components/AddBookForm";
import ThisBook from "./components/ThisBook";
import Statistic from "./components/Statistic";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/thisBook/:id" element={<ThisBook />} />
            <Route path="/allbooks" element={<AllBooks />} />
            <Route path="/addbooks" element={<AddBookForm />} />
            <Route path="/statistic" element={<Statistic />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}