import { Navigate } from 'react-router-dom'

export  const PrivateRouter = (props) => {
  const token = JSON.parse(localStorage.getItem('Token'))
  if(token){
    return props.children
  }
  else{
    <Navigate to={'/login'}></Navigate>
  }
}
