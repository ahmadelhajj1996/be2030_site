import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { ToastContainer, Flip } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./config/router";
import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Header />
            <div dir="rtl" className=" pt-20">
              {/* <div className=""> */}
              <AppRoutes />
              {/* </div> */}
            </div>
            <Footer />
          </PersistGate>
          <ToastContainer stacked transition={Flip} />
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;

// in users&sellers page , save the tab when reload the page ... update the useSearch Function
