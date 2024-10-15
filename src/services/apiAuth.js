import { appLocalStorage } from "../utils/localstorage";
import axios from "./axiosCustomize";
import { WS, Close } from "./webSocket";
import supabase, { supabaseUrl } from "./supabase";

export async function signup({
  firstName,
  lastName,
  email,
  password,
  passwordConfirm,
}) {
  try {
    var res = await axios({
      method: "POST",
      url: "/api/User/signup",
      data: {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password,
        ConfirmPassword: passwordConfirm,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.message);
  }
}

export async function login({ email, password }) {
  try {
    var res = await axios({
      method: "POST",
      url: "/api/User/signin",
      data: {
        Email: email,
        Password: password,
      },
    });
    appLocalStorage.set("UserInfo", JSON.stringify(res.data));
    WS();
    return res.data;
  } catch (err) {
    console.error(err.message);
  }
}

export async function oauthLogin({ accessToken, provider }) {
  try {
    var res = await axios({
      method: "POST",
      url: "/api/User/oauthLogin",
      data: {
        AccessToken: accessToken,
        Provider: provider,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err.message);
  }
}

export async function getCurrentUser() {
  const data = JSON.parse(appLocalStorage.get("UserInfo"));

  if (!data) return null;

  return data;
}

export async function logout() {
  try {
    var res = await axios({
      method: "POST",
      url: "/api/User/signout",
    });
    Close();
    return res.data;
  } catch (err) {
    console.error(err.message);
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update the password OR the fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // 2. Upload the avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);
  // 3. Update the avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
}

export async function getNotifications() {
  try {
    var res = await axios({
      method: "GET",
      url: "api/TaskNotification",
    });

    return res.data;
  } catch (error) {
    console.log(error.message);
  }
}
