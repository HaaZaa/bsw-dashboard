import React, { useEffect } from "react";
import axios from "../../axios";
import { UpdateStore } from "StoreContext";
import { useHistory } from "react-router";

const Logout = () => {
  const updateStore = UpdateStore();
  const history = useHistory();
  useEffect(() => {
    onLogout();
    //eslint-disable-next-line
  }, []);

  const onLogout = () => {
    axios.delete(`/user/logout`).then(() => {
      updateStore({ loggedIn: false, user: {} });
      history.push("/auth/login");
    });
  };

  return <div></div>;
};

export default Logout;
