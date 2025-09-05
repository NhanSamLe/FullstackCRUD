import Header from './components/layouts/header.jsx'
import axios from './util/base.ts'
import { useContext, useEffect  } from 'react'
import { AuthContext  } from './components/context/auth.context.jsx'
import {Spin} from 'antd'
import './App.css'
import { Outlet } from "react-router-dom";


function App() {
  const { setAuth, appLoading, setAppLoading } = useContext(AuthContext);


  useEffect(() => {
    const fetchAccount = async () => {
      try {
        setAppLoading(true);
        const res = await axios.get("/v1/api/user");
        if (res && res.data) {
          setAuth({
            isAuthenticated: true,
            user: {
              email: res.data.email,
              name: res.data.name,
            },
          });
        }
      } catch (err) {
        console.error("Fetch account error:", err);
        setAuth({
          isAuthenticated: false,
          user: { email: "", name: "" },
        });
      } finally {
        setAppLoading(false);
      }
    };

    fetchAccount();
  }, [setAppLoading, setAuth]);

  return (
    <div>
      {appLoading ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spin />
        </div>
      ) : (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </div>
  );
}

export default App;