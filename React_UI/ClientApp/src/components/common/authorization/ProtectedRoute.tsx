import { useAuth } from "../../../context/authContext";
import { AuthenticatedUser } from "../../../models/dto/authenicatedUser";
import { Landing } from "../../layoutMenus/landing/Landing";

export interface ProtectedRouteProps {
  children: JSX.Element ;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) : JSX.Element => {
  let user : AuthenticatedUser | null = useAuth();

  if (!user || !user.token || user.token === "") {
    return (
      <Landing />
    );
  }

  // let user through if they're logged in
  return (children );
};