import API from "../api/axios";

export const getAllGroups = () => API.get("/groups");

export const createGroup = (data) => API.post("/groups", data);

export const updateGroup = (id, data) =>
  API.put(`/groups/${id}`, data);

export const deleteGroup = (id) =>
  API.delete(`/groups/${id}`);

export const getContactsByGroup = (id) =>
  API.get(`/groups/${id}/contacts`);

export const moveContactToGroup = (contactId, groupId) =>
  API.patch(`/groups/contacts/${contactId}/move-group`, {
    groupId,
  });