import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { AuthContextProvider } from "./hooks/Auth";
import "./styles/globals.scss";

function App() {
    return (
        <AuthContextProvider>
            <Routes />
            <ToastContainer toastStyle={{ fontSize: "1.6rem" }} />
        </AuthContextProvider>
    );
}

export default App;
