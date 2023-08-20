import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import NewsHome from "./pages/NewsHome";
import Schedule from "./pages/Schedule";
import HomePlate from "./pages/HomePlate";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import UserStore from "./context/UserStore";
import SignUp from "./pages/SignUp";
import FindPw from "./pages/FindPassword";
import NewsView from "./pages/NewsView";
import MyPage from "./pages/MyPage";
import HomePlateView from "./pages/HomePlateView";
import Weekly from "./pages/Weekly";
import HomePlateWrite from "./pages/HomePlateWrite";

export default function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <UserStore>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<>
            <Navigation />
            <Home />
            {windowWidth > 768 && <Footer />}
          </>} />
          <Route path="/newshome" element={<>
            <Navigation />
            <NewsHome />
            {windowWidth > 768 && <Footer />}
          </>} />
          <Route path="/weekly" element={<>
            <Navigation />
            <Weekly />
            {windowWidth > 768 && <Footer />}
          </>} />
          <Route path="/newshome/:id" element={<>
            <Navigation />
            <NewsView />
            {windowWidth > 768 && <Footer />}
          </>} />
          <Route path="/homeplate" element={<>
            <Navigation />
            <HomePlate />
            {windowWidth > 768 && <Footer />}
          </>} />
          <Route path="/homeplate/:id" element={<>
            <Navigation />
            <HomePlateView />
            {windowWidth > 768 && <Footer />}
          </>} />
          <Route path="/homeplate/Write" element={<>
            <Navigation />
            <HomePlateWrite />
            {windowWidth > 768 && <Footer />}
          </>} />
          <Route path="/schedule" element={<>
            <Navigation />
            <Schedule />
            {windowWidth > 768 && <Footer />}
          </>} />
          <Route path="/signup" element={<>
            <Navigation />
            <SignUp />
            {windowWidth > 768 && <Footer />}
          </>} />
          <Route path="/findpw" element={windowWidth > 768 ? (
            <>
              <Navigation />
              <FindPw />
            </>
          ) : (
            <FindPw />
          )} />
          <Route path="/mypage" element={windowWidth > 768 ? (
            <>
              <Navigation />
              <MyPage />
            </>
          ) : (
            <MyPage />
          )} />
        </Routes>
      </BrowserRouter>
    </UserStore>
  );
}
