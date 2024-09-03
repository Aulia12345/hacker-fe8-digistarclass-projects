import { Link, Outlet, redirect } from "react-router-dom";

export async function loader() {
  const currentUser = localStorage.getItem("token");
  if (!currentUser) {
    return redirect("/login");
  }
  return null;
}

const Root = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <>
      <aside
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          background: "light-gray",
          height: "100vh",
          width: "250px",
        }}
      >
        <h3>Menu</h3>
        <div>
          <ul>
            <li>
              <Link to={"/dashboard"}>Dashboard</Link>
            </li>
            <li>
              <Link to={"/dashboard/users"}>Users</Link>
            </li>
            <li>
              <Link to={"/dashboard/settings"}>Settings</Link>
            </li>
            <li>
              <a
                role="button"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => handleLogout()}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <main
        style={{
          width: "100%",
          paddingLeft: "250px",
        }}
      >
        <div
          style={{
            padding: 3,
          }}
        >
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Root;
