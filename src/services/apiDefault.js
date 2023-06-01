import globals from "../utils/globals";

// const ROOT = "http://localhost:8080/api/"
const ROOT = "https://ggi-backend-production.up.railway.app/api/"

export default {
    async get({ url, withToken = true } = {}) {
        console.log('GET => ', url)
        let headers = {}
        if (withToken) {
            console.log('TOKEN => ', globals.token)
            headers = { Authorization: `Bearer ${globals.token}` }
        }
        headers["Access-Control-Allow-Origin"] = "*"

        try {

            const result = await fetch(`${ROOT}${url}`, {
                headers: headers,
                method: 'GET'
            });
            const data = await result.json()
            console.log('RES => ', url, data)

            return { ...data, unauthorized: false };

        } catch (error) {
            console.error(error);
            return { unauthorized: true, error: true, message: 'ERROR SERVICE' }
        }
    },
    async post({ url, request = {}, withToken = true } = {}) {
        console.log('POST => ', url)
        console.log('REQ => ', request)
        let headers = {}
        if (withToken) {
            console.log('TOKEN => ', globals.token)
            headers = { Authorization: `Bearer ${globals.token}` }
        }
        headers["Content-type"] = "application/json"
        headers["Access-Control-Allow-Origin"] = "*"
        try {

            const result = await fetch(`${ROOT}${url}`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify(request)
            })

            const data = await result.json()
            console.log('RES => ', url, result, data)
            if (result.status === 201)
                return { ...data, unauthorized: false };
            else
                return { unauthorized: true, ...data };

        } catch (error) {
            console.error(error);
            return { unauthorized: true, error: true, message: 'ERROR SERVICE' }
        }
    },
    async postFile({ url, text = '', files = [], typeFile, withToken = true } = {}) {
        console.log('POST => ', url)
        let headers = {}
        if (withToken) {
            console.log('TOKEN => ', globals.token)
            headers = { Authorization: `Bearer ${globals.token}` }
        }
        // headers["Content-type"] = "multipart/form-data"
        headers["Access-Control-Allow-Origin"] = "*"
        let formData = new FormData()
        if (text != '') {
            formData.append('tasks', text)
        }
        if (files.length > 0) {
            for (const fileImg of files) {
                formData.append(typeFile, fileImg)
            }
        }
        try {
            const result = await fetch(`${ROOT}${url}`, {
                headers: headers,
                method: 'POST',
                body: formData
            })

            const data = await result.json()
            console.log('RES => ', url, result, data)
            if (result.status === 200)
                return { ...data, unauthorized: false, error: false };
            else
                return { unauthorized: true, ...data, error: true };

        } catch (error) {
            console.error(error);
            return { unauthorized: true, error: true, message: 'ERROR SERVICE' }
        }
    },
    async put({ url, request = {}, withToken = true } = {}) {
        console.log('PUT => ', url)
        let headers = {}
        if (withToken) {
            console.log('TOKEN => ', globals.token)
            headers = { Authorization: `Bearer ${globals.token}` }
        }
        headers["Content-type"] = "application/json"
        headers["Access-Control-Allow-Origin"] = "*"
        try {

            const result = await fetch(`${ROOT}${url}`, {
                headers: headers,
                method: 'PUT',
                body: JSON.stringify(request)
            })

            console.log('RES => ', url, result)
            const data = await result.json()
            console.log('data => ', data)
            if (result.status === 201)
                return { ...data, unauthorized: false };
            else
                return { unauthorized: true, ...data };

        } catch (error) {
            console.error(error);
            return { unauthorized: true, error: true, message: 'ERROR SERVICE' }
        }
    },
    async delete({ url, withToken = true } = {}) {
        console.log('PUT => ', url)
        let headers = {}
        if (withToken) {
            console.log('TOKEN => ', globals.token)
            headers = { Authorization: `Bearer ${globals.token}` }
        }
        headers["Content-type"] = "application/json"
        headers["Access-Control-Allow-Origin"] = "*"
        try {

            const result = await fetch(`${ROOT}${url}`, {
                headers: headers,
                method: 'DELETE',
            })

            console.log('RES => ', url, result)
            const data = await result.json()
            if (result.status === 201)
                return { ...data, unauthorized: false };
            else
                return { unauthorized: true, ...data };

        } catch (error) {
            console.error(error);
            return { unauthorized: true, error: true, message: 'ERROR SERVICE' }
        }
    },
};
