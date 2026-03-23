import API from "../api/axios";

// 1. GET /users
export const getAllUsers = async () => {
  try {
    const res = await API.get("/users");
    return res.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch users";
  }
};

// 2. DELETE /users/{id}
export const deleteUser = async (id) => {
  try {
    const res = await API.delete(`/users/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || "Failed to delete user";
  }
};

// 3. GET /stats
export const getAdminStats = async () => {
  try {
    const res = await API.get("/stats");
    return res.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch stats";
  }
};