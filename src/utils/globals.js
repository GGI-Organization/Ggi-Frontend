const qa =  ''

export default {
    token: localStorage.getItem(`token${qa}`) ?? '',
    user: null,
    logged: false,
}