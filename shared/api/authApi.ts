import usersData from "../mock/users.json";
import { enmRole } from "../types/enum";
import { typUser } from "../types/types";
import { delay } from "../types/utils";

let usersDB: typUser[] = usersData.map((u: any) => ({
  ...u,
  role: u.role as enmRole,
}));

let sessions: Record<string, typUser> = {};

/* ---------- Auth ---------- */
export async function register(payload: {
  fullName: string;
  email: string;
  password: string;
}) {
  await delay(600);

  const exists = usersDB.find((u) => u.email === payload.email);
  if (exists) throw new Error("Email already registered");

  const newUser: typUser = {
    id: String(usersDB.length + 1),
    fullName: payload.fullName,
    email: payload.email,
    role: enmRole.jobseeker,
  };

  usersDB.push(newUser);

  const token = `mock-jwt-${newUser.id}`;
  sessions[token] = newUser;

  return { user: newUser, token };
}

export async function login(payload: { email: string; password: string }) {
  await delay(600);

  const user = usersDB.find((u) => u.email === payload.email);
  if (!user) throw new Error("Invalid credentials");

  const token = `mock-jwt-${user.id}`;
  sessions[token] = user;

  return { user, token };
}

export async function me(token: string) {
  await delay(400);

  const user = sessions[token];
  if (!user) throw new Error("Unauthorized");

  return { user };
}
