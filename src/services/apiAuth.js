import apiDefault from "./apiDefault";

export default {
  async login({ email, password }) {
    const url = `auth/signin`;
    return await apiDefault.post({ url, request: { email, password }, withToken: false })
  },
  async register({ fullname, email, password }) {
    const url = `auth/signup`;
    return await apiDefault.post({ url, request: { fullname, email, password, role: ['user'] }, withToken: false })
  },
};
