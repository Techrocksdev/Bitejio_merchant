import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import { getMyProfile } from "../apiServices/home/homeHttpService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token-bit-merchant");
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const { data: profile, refetch } = useQuery({
    queryKey: ["getProfile"],
    queryFn: getMyProfile,
    enabled: !!token,
    onError: (error) => {
      console.log(error);
    },
    select: (data) => data.results.user,
  });

  const toggleSidebar = () => {
    setIsSidebarHidden((prev) => !prev);
  };

  return (
    <AuthContext.Provider
      value={{
        profile,
        refetch,
        toggleSidebar,
        isSidebarHidden,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(AuthContext);
