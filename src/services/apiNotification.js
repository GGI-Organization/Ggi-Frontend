import apiDefault from "./apiDefault";

export default {
  async getAll() {
    const url = `notifications`;
    return apiDefault.get({ url })
  },
};
