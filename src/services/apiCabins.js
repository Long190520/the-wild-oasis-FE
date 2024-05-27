import serverUrl from "./Server";
import supabase, { supabaseUrl } from "./supabase";
import axios from "axios";

export async function getCabins() {
  try {
    const res = await axios({
      method: "GET",
      url: `${serverUrl}/api/Cabin`,
    });

    return res.data;
  } catch (err) {
    console.error(err.message);
  }
}

// export async function getCabins() {
//   const { data, error } = await supabase.from("cabins").select("*");
//   if (error) {
//     console.error(error);
//     throw new Error("Cabins could not be loaded");
//   }

//   return data;
// }

export async function createEditCabin(newCabin, id) {
  try {
    // console.log(newCabin);

    // var newCabinData = { ...newCabin, ImageFile: newCabin.image, image: ""}

    // console.log(newCabinData);

    const res = await axios({
      method: "POST",
      url: `${serverUrl}/api/Cabin/SaveImage`,
      data: newCabin
    });

    return res.data;
  } catch (err) {
    console.error(err.message);
  }
}

// export async function createEditCabin(newCabin, id) {
//   const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     "/",
//     ""
//   );
//   const imagePath = hasImagePath
//     ? newCabin.image
//     : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

//   // https://kynvyscmqrykadhhvmzw.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

//   // 1. Create cabin
//   let query = supabase.from("cabins");

//   console.log(id);

//   // A) CREATE
//   if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

//   if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

//   const { data, error } = await query.select().single();

//   if (error) {
//     console.error(error);
//     throw new Error("Cabin could not be created");
//   }

//   // 2. Upload image
//   if (hasImagePath) return data;

//   const { error: storageError } = await supabase.storage
//     .from("cabin-images")
//     .upload(imageName, newCabin.image);

//   // 3. Delete the cabin IF there was an error uploading the image
//   if (storageError) {
//     await supabase.from("cabins").delete().eq("id", data.id);
//     console.error(storageError);
//     throw new Error(
//       "Cabin image could not be created and cabin could not be created"
//     );
//   }

//   return data;
// }

export async function deleteCabin(id) {
  try {
    var res = await axios({
      method: "DELETE",
      url: `${serverUrl}/api/Cabin`,
    });

    return res.statusText;
  } catch (err) {
    console.error(err.message);
  }
}
