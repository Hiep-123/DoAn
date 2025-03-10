import '../src/styles/main.module.scss'
import { BrowserRouter, Routes, Route } from "react-router";
import routers from './routers/router'
import { BookingProvider } from '@/context/BookingProvider';
import { StoreProvider } from '@/context/StoreProvider'
import { ToastProvider } from "@/context/ToastProvider";

function App() {

  return (
    <ToastProvider>
      <StoreProvider>
        <BookingProvider>
          <BrowserRouter>
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
    </ToastProvider>
  )
}

export default App
