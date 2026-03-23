import API from "../api/axios";

export const getAllGroups = () => API.get("/groups");

export const createGroup = (data) => API.post("/groups", data);

export const updateGroup = (id, data) =>
  API.put(`/groups/${id}`, data);

export const deleteGroup = (id) =>
  API.delete(`/groups/${id}`);

export const getGroupContacts = async (groupId) => {
    // Standard REST convention for fetching a specific group's contacts
    const res = await API.get(`/groups/${groupId}/contacts`);
    return res.data;
};

export const addContactToGroupAPI = async (groupId, contactId) => {
    const res = await API.post(`/groups/groups/${groupId}/contacts/${contactId}`);
    return res.data;
};

export const moveContactToGroup = (contactId, groupId) =>
  API.patch(`/groups/contacts/${contactId}/move-group`, {
    groupId,
  });