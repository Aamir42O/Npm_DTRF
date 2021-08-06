import Cookies from "js-cookie"
import Router from 'next/router'
import React from "react"
const axios = require("axios");
const reqWithToken = async (url, method, data, from) => {
    console.log("URL", url)
    console.log("reqWithAut From", from)
    let token
    if (from.dtrfFront) {
        token = Cookies.get("accessToken")
    } else {
        token = Cookies.get("accessTokenAL")
    }
    console.log("Token", token)
    const config = {
        headers: {
            "accessToken": token
        }
    }
    console.log("accessToken", config)
    const options = {
        method: method,
        url: url,
        data,
        headers: {
            "accessToken": token
        }

    }

    let response
    try {

        response = await axios(options)
            .catch((err) => {

                console.log(err.response)
                if (err.response.data.message == "Invalid Token" || err.response.data.message == "Token Expired" || err.response.data.message == "Access Token Missing") {
                    Router.push("/login")
                }
            })
    } catch (error) {
        console.log(error.message)



    }
    console.log(response, "AUTH RESPONSE")
    return response

}

export default reqWithToken