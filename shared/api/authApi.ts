import usersData from "../mock/users.json";
import { enmRole } from "../types/enums";
import { typUser } from "../types/types";
import { delay } from "../types/utils";
import { readFromStorage, writeToStorage, STORAGE_KEYS } from "../types/utils";

let usersDB: typUser[] = [];

/* ---------- Init DB from localStorage or mock ---------- */
function initUsersDB() {
  const stored = readFromStorage<typUser[]>(STORAGE_KEYS.USERS);
  usersDB = stored
    ? stored
    : usersData.map((u: any) => ({
        ...u,
        role: u.role as enmRole,
      }));
}

initUsersDB();

function saveUsersDB() {
  writeToStorage(STORAGE_KEYS.USERS, usersDB);
}

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
    password: payload.password,
    role: enmRole.jobseeker,
  };

  usersDB.push(newUser);
  saveUsersDB();

  const sessionKey = `session-${newUser.id}`;
  writeToStorage(sessionKey, newUser);

  return { user: newUser, sessionKey };
}

export async function login(payload: { email: string; password: string }) {
  await delay(600);

  const user = usersDB.find(
    (u) => u.email === payload.email && u.password === payload.password,
  );

  if (!user) throw new Error("Invalid email or password");

  const sessionKey = `session-${user.id}`;
  writeToStorage(sessionKey, user);

  return { user, sessionKey };
}

export async function me(sessionKey: string) {
  await delay(400);

  const user = readFromStorage<typUser>(sessionKey);
  if (!user) throw new Error("Unauthorized");

  return { user };
}

export async function logout() {
  const sessionKey = localStorage.getItem("currentSessionKey");
  if (sessionKey) localStorage.removeItem(sessionKey);
  localStorage.removeItem("currentSessionKey");
}
