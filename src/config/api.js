import axios from "~/axios";
let token = window.localStorage.getItem('Token')

export const getAPI = function(url){
    return axios.get(url, {headers: {Authorization: token} })
}
export const postAPI = function(url, data){
    return axios.post(url,data, {headers: {Authorization: token}})
}
export const patchAPI = function(url, data){
    return axios.patch(url,data, {headers: {Authorization: token}})
}
export const putAPI = function(url, data){
    return axios.put(url,data, {headers: {Authorization: token}})
}
export const deleteAPI = function(url){
    return axios.delete(url, {headers: {Authorization: token}})
}