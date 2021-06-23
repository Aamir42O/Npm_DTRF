import React, { useState } from "react"
const DisplayFiles = (props) => {
    console.log("Display file", props)
    const [filesKey, setFilesKey] = useState(Object.keys(props.files))

    const getFileName = (file) => {
        let fileName
        props.filesUploaded.map((data) => {
            if (data.variable == file) {
                fileName = data.display
            } else if (data.variable == props.files[file].fieldname) {
                fileName = data.display
            }
        })

        if (fileName) {
            return fileName
        } else {
            if (file == "HDS") {
                return "Confirmatory Test file for History of Down Syndrome"
            } else if (file == "HES") {
                return "Confirmatory Test File for History of Edwards Syndrome"
            }
            else if (file == "HPS") {
                return "Confirmatory Test File for History of Patau Syndrome"
            } else if (file == "xmlLicenseFile") {
                return "XML License File"
            }

        }
    }
    console.log(filesKey)

    return (<>
        {filesKey.map((file) => {

            if (props.files[file] && props.files[file].length > 0) {

                return <>
                    <div className="col-10 col-md-8 form-group">
                        {

                            <div class="section-title mb-2 mt-0">{getFileName(file)} </div>
                        }
                        {props.files[file].map(
                            (test, id) => (
                                <>
                                    <div className="row mb-1"  >
                                        <div className="col-10">
                                            {
                                                props.for == "Dashbaord" ?
                                                    <a href={test.location}>
                                                        <div className="form-control mb-0" style={{ height: "auto" }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                                                            <label className="ml-2" style={{ fontSize: "12px" }}>{`Scan ${id + 1}`}</label>
                                                        </div>
                                                    </a>
                                                    :
                                                    <div className="col-10">
                                                        <div className="form-control mb-0" style={{ height: "auto" }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                                                            <label className="ml-2" style={{ fontSize: "12px" }}>{test.name ? test.name : test.originalname}</label>
                                                        </div>
                                                    </div>

                                            }
                                        </div>

                                    </div>
                                </>
                            )
                        )}
                    </div>
                </>
            }
        })
        }
    </>)
}

export default DisplayFiles