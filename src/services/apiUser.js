import apiDefault from "./apiDefault";

export default {
  async getById({ id = '' }) {
    const url = `users/${id}`;
    return apiDefault.get({ url })
  },
  async update({ id = '', fullname = '', email = '', password = '' }) {
    const url = `users/${id}`;
    return apiDefault.put({ url, request: { fullname, email, password } })
  },
};
