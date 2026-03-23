import API from "../api/axios";

export const createContact = async (contactData) => {
    const res = await API.post("/api/contacts", contactData);
    return res.data;
}

export const getAllContacts = async () => {
    const res = await API.get("/api/contacts");
    return res.data;
}

export const updateContact = async (id, updatedData) => {
    const res = await API.put(`/api/contacts/${id}/edit`, updatedData); 
    return res.data;
}

export const deleteContact = async (contactId) => {
    const res = await API.delete(`/api/contacts/${contactId}`);
    return res.data;
}

export const searchContactsAPI = async (query) => {
    const res = await API.get(`/api/search?q=${query}`);
    return res.data;
};

export const favoriteContact = async () => {
    const res = await API.get("/api/contacts/favourites");
    return res.data;
}

export const toggleFavorite = async (contactId) => {
    const res = await API.patch(`/api/contacts/${contactId}/favourite`);
    return res.data;
}