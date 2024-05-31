import { Button } from "antd";
import { useContext } from "react";
import { logoutAction } from "../../actions/authActions";
import AuthContext from "../../context/authContext";

export default function Dashboard() {
  const { dispatch } = useContext(AuthContext);
  return (
    <div>
      Dashboard
      <Button
        block
        className="login-btn"
        onClick={() => logoutAction(dispatch)}
      >
        Logout
      </Button>
    </div>
  );
}
