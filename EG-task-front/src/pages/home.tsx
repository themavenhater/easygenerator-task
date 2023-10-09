import Button from "../components/button";
import { useAccount } from "../lib/context/account-context";

function HomePage() {
  const { user, handleLogout } = useAccount();
  return (
    <div className=" flex flex-col items-center">
      <p>Welcome to the application.</p>
      <p>Email :{user?.email}</p>
      <p>Name :{user?.fullName}</p>
      <p>Creation date {user?.createdAt}</p>
      <Button label="Sign out" onClick={handleLogout} />
    </div>
  );
}

export default HomePage;
