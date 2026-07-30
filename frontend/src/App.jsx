import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/AuthContext";
import { SearchProvider } from "./contexts/SearchContext";
import AppRoutes from "./routes/AppRoutes";
import { FacilityProvider } from "./contexts/FacilityContext";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        richColors
        theme="dark"
        closeButton
        expand
        toastOptions={{
          duration: 3000,
          className: "rounded-xl shadow-lg",
        }}
      />

      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
            <FacilityProvider>
              <AppRoutes />
            </FacilityProvider>
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
