import { redirect } from "react-router-dom";

export async function loader() {
  const currentUser = localStorage.getItem("token");
  if (currentUser) {
    return redirect("/dashboard");
  }
  return null;
}

const Login = () => {
  const handleLogin = () => {
    localStorage.setItem("token", "abc");
    window.location.reload();
  };

  return (
    <div>
      <h1>Login</h1>
      <button type="button" onClick={() => handleLogin()}>
        Login here
      </button>
    </div>
  );
};

export default Login;
