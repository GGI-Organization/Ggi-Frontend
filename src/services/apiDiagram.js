import apiDefault from "./apiDefault";

export default {
  async getAll({name= ''}) {
    const url = `diagrams-bpmn?name=${name.trim()}`;
    return await apiDefault.get({ url })
  },
};
