import supabase from "./supabase";

export async function fetchMe() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error.message);
    return null;
  }
  return {
    id: data.user.id,
    email: data.user.email,
    fullName: data.user.user_metadata.display_name,
    role: data.user.user_metadata.role,
  };
}

export const loginApi = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error.message);
    return null;
  }
  return data;
};

export const signupApi = async (
  email: string,
  password: string,
  fullName: string,
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: fullName,
        role: "jobseeker",
      },
    },
  });

  if (error) {
    console.error(error.message);
    return null;
  }
  return data;
};

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error.message);
    return null;
  }
}
