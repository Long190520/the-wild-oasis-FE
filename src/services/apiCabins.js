import axios from "./axiosCustomize";

export async function getCabins() {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/Cabin",
    });

    return res.data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function createEditCabin(newCabin, id) {
  try {
    if (id) {
      const editCabin = { ...newCabin, id: id };
      console.log(editCabin);
      const res = await axios({
        method: "PUT",
        url: "/api/Cabin",
        data: editCabin,
      });

      return res.data;
    } else {
      console.log(newCabin);

      const formData = new FormData();

      formData.append("imageFile", newCabin.image);

      const imgPath = await axios({
        method: "POST",
        url: "/api/Cabin/SaveImage",
        data: formData,
      });

      const res = await axios({
        method: "POST",
        url: "/api/Cabin",
        data: { ...newCabin, image: imgPath.data },
      });

      return res.data;
    }
  } catch (err) {
    console.error(err.message);
  }
}

export async function deleteCabin(id) {
  try {
    var res = await axios({
      method: "DELETE",
      url: "/api/Cabin",
    });

    return res.statusText;
  } catch (err) {
    console.error(err.message);
  }
}
