import axios from "~/config/axios";

export const getAPI = function(url){
    let token = JSON.parse(localStorage.getItem('Token'))
    return axios.get(url, {headers: {Authorization: token} })
}
export const postAPI = function(url, data){
    return axios.post(url,data)
}

export const postAPIAuth = function(url, data){
    let token = JSON.parse(localStorage.getItem('Token'))
    return axios.post(url,data, {headers: {Authorization: token}})
}

export const patchAPI = function(url, data){
    let token = JSON.parse(localStorage.getItem('Token'))
    return axios.patch(url,data, {headers: {Authorization: token}})
}
export const putAPI = function(url, data){
    let token = JSON.parse(localStorage.getItem('Token'))
    return axios.put(url,data, {headers: {Authorization: token}})
}
export const deleteAPI = function(url){
    let token = JSON.parse(localStorage.getItem('Token'))
    return axios.delete(url, {headers: {Authorization: token}})
}