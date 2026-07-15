import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./components/pages/HomePage";
import BookingPage from "./components/pages/BookingPage";
import ReviewPage from "./components/pages/ReviewPage";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import ErrorPage from "./components/pages/ErrorPage";

function App() {
  return (
    <main id="center">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
