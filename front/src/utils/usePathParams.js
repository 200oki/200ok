import { useLocation } from "react-router-dom";

const usePathParams = () => {
  const { pathname } = useLocation();
  return pathname;
};

export default usePathParams;
