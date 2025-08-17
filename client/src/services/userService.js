import axiosInstance from "./axiosInstance";

export const fetchUsersAPI = async (page = 1, limit = 6) => {
  try {
    const response = await axiosInstance.get("/users", {
      params: { page, per_page: limit },
    });
    return {
      data: response.data.data,
      total_pages: response.data.total_pages,
      total: response.data.total,
    };
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

export const createUserAPI = async (user) => {
  try {
    const response = await axiosInstance.post("/users", user);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create user");
  }
};

export const editUserAPI = async ({ id, ...data }) => {
  try {
    const response = await axiosInstance.put(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user");
  }
};

export const deleteUserAPI = async (id) => {
  try {
    await axiosInstance.delete(`/users/${id}`);
    return { id };
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};
