import React from "react"



const MessageField = (props) => {


    return (<>
        <div className="col-6">

            <label>
                {props.message}
            </label>
        </div>

    </>)
}


export default MessageField