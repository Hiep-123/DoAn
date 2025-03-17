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
      <BookingProvider>
        <BrowserRouter>
          <SideBarProvider>
            <StoreProvider>
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
            </StoreProvider>
          </SideBarProvider>
        </BrowserRouter>
      </BookingProvider>
    </ToastProvider>
  )
}

export default App
