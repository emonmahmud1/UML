
import axiosClient from "../config/axiosConfig";
import toast from "react-hot-toast";

export const handleDelete = async (mutate, api) => {
  try {
    axiosClient(false)
      .delete(api)
      .then((res) => {
        // setData((data) => data.filter((item) => item.id !== row));
        console.log(res.data);
        if (res.data.status === 400) {
          toast.error(`${res?.data.data.name}`);
        } else if (res.data.status === 404) {
          toast.error(`${res?.data.data.name}`);
        } else {
          toast.success("Successfully deleted!");
          mutate();
        }
      });
  } catch (err) {
    toast.error("Can't delete this file!");
  }

};
