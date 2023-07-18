import "./App.css";
import uploadImg from "./asset/upload.png";
import { useRef, useState, useCallback } from "react";
import { ImageConfig } from "./config/ImageConfig";

function App() {
  const wrapRef = useRef(null);
  const [fileList, setFileList] = useState([]);

  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onDragEnter = (e) => {
    e.preventDefault();
    wrapRef.current.classList.add("on-drag");
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    wrapRef.current.classList.remove("on-drag");
  };
  const onDrop = (e) => {
    e.preventDefault();
    const newFile = e.dataTransfer.files[0];
    if (e.dataTransfer.files[0]) {
      setFileList([...fileList, newFile]);
    }
  };

  const onFileDrop = (e) => {
    e.preventDefault();
    const newFile = e.target.files[0];
    if (newFile) {
      setFileList([...fileList, newFile]);
    }
  };

  const removeFile = (item) => {
    setFileList(fileList.filter((remove) => remove !== item));
  };
  return (
    <div className="container">
      <div className="drag-container">
        <h2>drag and drop</h2>
        {console.log(fileList)}
        <input
          style={{ display: "none" }}
          type="file"
          name="file"
          id="file"
          onChange={onFileDrop}
        />
        <label htmlFor="file">
          <div
            className="label-container"
            ref={wrapRef}
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <img src={uploadImg} alt="upload" />
          </div>
        </label>
        {fileList.length > 0 ? (
          <div>
            <p>Ready to upload</p>
            {fileList.map((item, index) => {
              return (
                <div key={index} className="fileList-container">
                  <img
                    src={
                      ImageConfig[item.type.split("/")[1]]
                        ? ImageConfig[item.type.split("/")[1]]
                        : ImageConfig["default"]
                    }
                  />
                  <span className="fileList-string">
                    <p>{item.name}</p>
                    <p>{item.size}</p>
                  </span>

                  <button
                    className="remove-file"
                    onClick={() => removeFile(item)}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
