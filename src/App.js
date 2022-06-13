import { useEffect, useState } from "react";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Store, UpdateStore } from "StoreContext";
import axios from "./axios";

// Component
function App() {
  const store = Store();
  const updateStore = UpdateStore();
  axios.defaults.withCredentials = true;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLogin();
    //eslint-disable-next-line
  }, []);

  const checkLogin = async () => {
    const result = await axios.patch(`/user/admin/loggedin`);

    if (!result.data.error) {
      updateStore({ loggedIn: true, user: result.data.user });
    }
    setLoading(false);
  };

  return (
    <div className="App">
      {!loading && (
        <BrowserRouter basename="/dashboard/">
          <Switch>
            {store.loggedIn !== true ? (
              <>
                <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
                <Redirect from="/" to="/auth/login" />
              </>
            ) : (
              <>
                <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
                <Redirect from="/" to="/admin/index" />
              </>
            )}
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

// Export
export default App;
