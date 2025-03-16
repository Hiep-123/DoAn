import '../src/styles/main.module.scss'
import { BrowserRouter, Routes, Route } from "react-router";
import routers from './routers/router'
import { BookingProvider } from '@/context/BookingProvider';
import { StoreProvider } from '@/context/StoreProvider'
import { ToastProvider } from "@/context/ToastProvider";
import { SideBarProvider } from '@/context/SideBarProvider';
import SideBar from '@components/Sidebar/SideBar';
import ScrollToTop from '@components/ScrollToTop/ScrollToTop'

function App() {

  return (
    <ToastProvider>
      <SideBarProvider>
        <StoreProvider>
          <BookingProvider>
            <BrowserRouter>
              <SideBar />
              <ScrollToTop />
              <Routes>
                {routers.map((item, index) => {
                  return (
                    <Route
                      path={item.path}
                      element={<item.component />}
                      key={index}
                    />
                  );
                })}
              </Routes>
            </BrowserRouter>
          </BookingProvider>
        </StoreProvider>
      </SideBarProvider>
    </ToastProvider>
  )
}

export default App
