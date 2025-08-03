import axios from "../api/axios";

const useRefreshToken = () => {
  const refresh = async () => {
    console.log("Refreshing Token");
    const response = await axios.get("/login/refresh");
    console.log(response.data);

    return response.data.token;
  };
  return refresh;
};

export default useRefreshToken;
