import apiDefault from "./apiDefault";

export default {
  async getAll({name = ''}) {
    const url = `mockups?name=${name.trim()}`;
    return await apiDefault.get({ url })
  },
};
