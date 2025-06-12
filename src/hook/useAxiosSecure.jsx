import axios from "axios";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAxiosSecure = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  useEffect(() => {
    axiosSecure.interceptors.request.use(
      async (config) => {
        const user = auth.currentUser;
        if (user) {
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    axiosSecure.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate("/login");
        }
        return Promise.reject(err);
      }
    );
  }, [axiosSecure, auth, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
