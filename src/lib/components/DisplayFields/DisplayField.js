import React from "react"
import moment from "moment";



const DisplayFields = (props) => {

    return <>
        {
            (props.data || props.data === 0) &&
            <>
                {
                    props.clinical_info ?
                        <div className={props.className ? props.className : "col-12 col-md-6"}>
                            <div className="form-group mb-0">
                                <label style={{ letterSpacing: "0.3px" }} className="col-form-label col-sm-12">
                                    <b>{props.title}</b>{" "}
                                </label>
                                <label className="col-form-label col-sm-12">
                                    {props.isDate ?
                                        moment(props.data).format("DD-MM-YYYY") :
                                        props.data
                                    }
                                </label>
                            </div>
                        </div>
                        :

                        <div className={props.className ? props.className : "col-12 col-md-6"}>
                            <div className="form-group mb-0">
                                <label className="col-form-label col-sm-6 text-sm-right">
                                    <b>{props.title}</b>{" "}
                                </label>
                                <label className="col-form-label col-sm-6">
                                    {props.isDate ?
                                        moment(props.data).format("DD-MM-YYYY") :
                                        props.data
                                    }
                                </label>
                            </div>
                        </div>
                }
            </>
        }
    </>

}

export default DisplayFields