import '../src/styles/main.module.scss'
import { BrowserRouter, Routes, Route } from "react-router";
import routers from './routers/router'
import { BookingProvider } from '@/context/BookingProvider';
import { StoreProvider } from '@/context/StoreProvider'
import { ToastProvider } from "@/context/ToastProvider";
import { SideBarProvier } from '@/context/SideBarProvider';
import SideBar from '@components/Sidebar/SideBar';

function App() {

  return (
    <ToastProvider>
      <SideBarProvier>
        <StoreProvider>
          <BookingProvider>
            <BrowserRouter>
              <SideBar />
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
      </SideBarProvier>
    </ToastProvider>
  )
}

export default App
