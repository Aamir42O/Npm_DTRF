import { useRouter } from "next/router";
import Cookies from "js-cookie";
import React from "react"

const withAuth = Component => {
    const Auth = (props) => {
        const router = useRouter();

        // Login data added to props via redux-store (or use react context for example)
        const { isAuthenticated } = props;
        console.log(props, Component, "WITHAUTH PROPS")
        // If user is not logged in, return login component
        console.log("ROUTER", router.pathname)
        if (!isAuthenticated) {

        }
        // if (router.pathname.startsWith("/dtrf_front") && (Cookies.get("accessToken") != "admin")) {
        //     return (<Home props={props} />)
        // }
        // If user is logged in, return original component
        return (
            <Component {...props} />
        );
    };

    // Copy getInitial props so it will run as well
    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }

    return Auth;
};

export default withAuth;