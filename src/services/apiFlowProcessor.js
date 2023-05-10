import apiDefault from "./apiDefault";

export default {
    async bpmnTasks({ files = [] }) {
        const url = 'flow-processor/bpmn-tasks'
        return await apiDefault.postFile({ url, files, typeFile: 'image' })
    },
    async mockupsComponents({ files = [], tasks = '' }) {
        const url = `flow-processor/mockup-tasks`;
        return apiDefault.postFile({ url, files, typeFile: 'mockups', text: tasks })
    },
    async saveProject({ name = '', pathDiagramBPMN = '', pathMockupGroup = '' }) {
        const url = `flow-processor`;
        return apiDefault.put({ url, request: { name, pathDiagramBPMN, pathMockupGroup } })
    },
};
