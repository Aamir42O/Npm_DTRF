import React from 'react'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';


const FileUploadDisplay = React.forwardRef((props, ref) => {

    console.log(props)
    return <>
        <div className="col-12 col-md-12 form-group">
            <div className="row mt-1">
                <div className="text-left mt-4">
                    <button
                        name={props.name}
                        htmlFor="files"
                        type="button"
                        className="btn btn-primary"
                        onClick={e => ref.current.click()}
                    >
                        {props.fileButtonName} {props.mandatory && "*"}
                    </button>
                </div>


            </div>
            <label className="formErr" style={{ color: "red" }}>{props.fileError}</label>
        </div>
        {props.files.length > 0 &&

            <div className="col-10 col-md-8 form-group">
                {props.files.map(
                    (test, id) => (
                        <>
                            {
                                test.location ? <a href={test.location}>
                                    <div className="row mb-1">
                                        <div className="col-10">
                                            <div className="form-control mb-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                                                <label className="ml-2" style={{ fontSize: "12px" }}>{test.originalname}</label>
                                            </div>
                                        </div>
                                        <CancelOutlinedIcon size="medium" name={props.name} onClick={e => props.removeFile(id, props.name)} />

                                    </div>

                                </a> :
                                    <div className="row mb-1">
                                        <div className="col-10">
                                            <div className="form-control mb-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                                                <label className="ml-2" style={{ fontSize: "12px" }}>{test.name}</label>
                                            </div>
                                        </div>
                                        <CancelOutlinedIcon size="medium" name={props.name} onClick={e => props.removeFile(id, props.name)} />

                                    </div>

                            }

                        </>
                    )
                )}
            </div>
        }

    </>
})

export default FileUploadDisplay