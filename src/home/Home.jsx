import { useSelector } from "react-redux";

export { Home };

function Home() {
  const { user: authUser } = useSelector((x) => x.auth);

  return (
    <div>
      <h1>Hi {authUser?.user.name}!</h1>
      <p>You're logged in with React 18 + Redux & JWT!!</p>
      <h3>Users from secure api end point:</h3>
      <ul>
        <li>{authUser.user.name}</li>
      </ul>
    </div>
  );
}
