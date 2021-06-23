import React, { useRef, useState, useEffect } from "react";
import { Icon } from "@material-ui/core";

import "./Dropzone.css";

const Dropzone = (props) => {
  const fileInputRef = useRef();
  const modalImageRef = useRef();
  const modalRef = useRef();
  const progressRef = useRef();
  const uploadRef = useRef();
  const uploadModalRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [visibleButton, setSubmitButton] = useState(false);

  useEffect(() => {
    let filteredArr = selectedFiles.reduce((acc, current) => {
      const x = acc.find((item) => item.name === current.name);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    setValidFiles([...filteredArr]);
  }, [selectedFiles]);

  const preventDefault = (e) => {
    e.preventDefault();
    // e.stopPropagation();
  };

  const dragOver = (e) => {
    preventDefault(e);
  };

  const dragEnter = (e) => {
    preventDefault(e);
  };

  const dragLeave = (e) => {
    preventDefault(e);
  };

  const fileDrop = (e) => {
    preventDefault(e);
    const files = e.dataTransfer.files;
    if (files.length <= 1) {
      //setSubmitButton(true)
      handleFiles(files);
    }
  };

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        props.setBtnVisible(true, files[i]);
        setSelectedFiles((prevArray) => [files[i]]);
      } else {
        files[i]["invalid"] = true;
        setSelectedFiles((prevArray) => [files[i]]);
        setErrorMessage("File type not permitted");
        setUnsupportedFiles((prevArray) => [files[i]]);
      }
    }
  };

  const validateFile = (file) => {
    //const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
    const validTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", ".xls", ".csv"];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  const fileSize = (size) => {
    if (size === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const fileType = (fileName) => {
    return fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) || fileName;
  };

  const removeFile = (name) => {
    const index = validFiles.findIndex((e) => e.name === name);
    const index2 = selectedFiles.findIndex((e) => e.name === name);
    const index3 = unsupportedFiles.findIndex((e) => e.name === name);
    validFiles.splice(index, 1);
    selectedFiles.splice(index2, 1);
    setValidFiles([...validFiles]);
    setSelectedFiles([...selectedFiles]);
    if (index3 !== -1) {
      unsupportedFiles.splice(index3, 1);
      setUnsupportedFiles([...unsupportedFiles]);
    }
    if (validFiles.length == 0) {
      props.setBtnVisible(false);
    }
  };

  const openImageModal = (file) => {
    const reader = new FileReader();
    modalRef.current.style.display = "block";
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
    };
  };

  const closeModal = () => {
    modalRef.current.style.display = "none";
    modalImageRef.current.style.backgroundImage = "none";
  };

  const uploadFiles = async () => {
    // uploadModalRef.current.style.display = 'block';
    // uploadRef.current.innerHTML = 'File(s) Uploading...';
    // for (let i = 0; i < validFiles.length; i++) {
    //     const formData = new FormData();
    //     formData.append('image', validFiles[i]);
    //     formData.append('key', '');
    //     axios.post('https://api.imgbb.com/1/upload', formData, {
    //         onUploadProgress: (progressEvent) => {
    //             const uploadPercentage = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
    //             progressRef.current.innerHTML = `${uploadPercentage}%`;
    //             progressRef.current.style.width = `${uploadPercentage}%`;
    //             if (uploadPercentage === 100) {
    //                 uploadRef.current.innerHTML = 'File(s) Uploaded';
    //                 validFiles.length = 0;
    //                 setValidFiles([...validFiles]);
    //                 setSelectedFiles([...validFiles]);
    //                 setUnsupportedFiles([...validFiles]);
    //             }
    //         },
    //     })
    //     .catch(() => {
    //         uploadRef.current.innerHTML = `<span class="error">Error Uploading File(s)</span>`;
    //         progressRef.current.style.backgroundColor = 'red';
    //     })
    // }
  };

  const closeUploadModal = () => {
    uploadModalRef.current.style.display = "none";
  };

  return (
    <>
      <div className="container">
        {/* <div className="file-display-container">
                    {
                        validFiles.map((data, i) =>
                            <div className="file-status-bar" key={i}>
                                <div onClick={!data.invalid ? () => openImageModal(data) : () => removeFile(data.name)}>
                                    <div className="file-type-logo"></div>
                                    <div className="file-type">{fileType(data.name)}</div>
                                    <div className={`file-name ${data.invalid ? 'file-error' : ''}`}>{data.name}</div>
                                    <div className="file-size">({fileSize(data.size)})</div> {data.invalid && <div className='file-error-message'>({errorMessage})</div>}
                                </div>
                                <div className="file-remove" onClick={() => removeFile(data.name)}>X</div>
                            </div>
                        )
                    }
                </div> */}
        {/* {unsupportedFiles.length === 0 && validFiles.length ? <button className="file-upload-btn" onClick={() => uploadFiles()}>Upload Files</button> : ''}  */}
        <div
          className="drop-container"
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
          onClick={fileInputClicked}
        >
          <div className="drop-message">
            <div className="upload-icon">
              <Icon
                style={{
                  backgroundColor: "white",
                  color: "#222945",
                  borderRadius: "15%",
                  fontSize: "45px"
                }}
              >
                upload
              </Icon>
            </div>
            Drag and Drop Barcodes List in Excel Sheet Format (.xls/.xlsx) or Select a file from a folder.
          </div>
          <input ref={fileInputRef} className="file-input" type="file" onChange={filesSelected} accept=".xls,.xlsx" maxFiles="1" />
        </div>
        <div className="file-display-container">
          {validFiles.map((data, i) => (
            <div className="file-status-bar" key={i}>
              <div onClick={!data.invalid ? () => openImageModal(data) : () => removeFile(data.name)}>
                <div className="file-type-logo"></div>
                <div className="file-type">{fileType(data.name)}</div>
                <span className={`file-name ${data.invalid ? "file-error" : ""}`}>{data.name}</span>
                <div className="file-size">({fileSize(data.size)})</div>{" "}
                {data.invalid && <span className="file-error-message">({errorMessage})</span>}
              </div>
              <div className="file-remove" onClick={() => removeFile(data.name)}>
                X
              </div>
            </div>
          ))}
        </div>
        {/* {unsupportedFiles.length ? <p className="file-notsupported">unsupported files.</p> : ''} */}
      </div>

      <div className="modal" ref={modalRef}>
        <div className="overlay"></div>
        <span className="close" onClick={() => closeModal()}>
          X
        </span>
        <div className="modal-image" ref={modalImageRef}></div>
      </div>

      <div className="upload-modal" ref={uploadModalRef}>
        <div className="overlay"></div>
        <div className="close" onClick={() => closeUploadModal()}>
          X
        </div>
        <div className="progress-container">
          <span ref={uploadRef}></span>
          <div className="progress">
            <div className="progress-bar" ref={progressRef}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropzone;
