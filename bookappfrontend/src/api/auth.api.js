import axios from "axios"

export async function Userlogin(phone, password, acc_type="user"){

    const loginBody = {
        phone,
        password,
        acc_type
    }

    let request = new Request(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        credentials : "include",
        body : JSON.stringify(loginBody)
    })

    let response = await fetch(request)
    response = await response.json()
    return response

}

export async function logoutUser(){
    const res = await axios({
        method : "get",
        url : `/auth/logout`
    })
    return res.data
}