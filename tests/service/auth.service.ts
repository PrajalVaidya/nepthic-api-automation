import { authenticateUser } from "../helpers/auth.helpers";

export async function signInUser(indetifier: string, password: string) {
  return await authenticateUser;
}
