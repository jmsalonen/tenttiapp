import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import axios from 'axios'

const Dropzone = () => {
  const onDrop = useCallback(files => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let fd = new FormData();
    let manyFiles = false
    files.map((file, index) => {
      fd.append('file', file)
      if (index > 0)
        manyFiles = true
    });
    manyFiles ? axios.post(`http://localhost:3001/upload-many`, fd, config)
              : axios.post(`http://localhost:3001/upload-one`, fd, config)
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default Dropzone
