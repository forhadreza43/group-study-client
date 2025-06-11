import { use } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";


const useAuth = () => {
    return use(AuthContext);
};

export default useAuth;