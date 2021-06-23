import React from "react"



const DisplayFields = (props) => {

    return <>
        {
            (props.data || props.data === 0) &&
            <>
                <div className={props.className ? props.className : "col-12 col-md-6"}>
                    <div className="form-group mb-0">
                        <label className="col-form-label col-sm-6 text-sm-right">
                            <b>{props.title}</b>{" "}
                        </label>
                        <label className="col-form-label col-sm-6">
                            {
                                props.data
                            }
                        </label>
                    </div>
                </div>
            </>
        }
    </>

}

export default DisplayFields