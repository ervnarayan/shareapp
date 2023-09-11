import {useRef, useState, useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import { notifyError, notifySuccess } from './utils/toast';
import uploadFile from './services/api';
import logo from './assets/logo.svg';
import file from './assets/file.svg';
import copy from './assets/copy-icon.svg';
import './App.css';

function App() {
  const [dragged, setDragged] = useState(false);
  const [progress, setProgress] = useState();
  const [download, setDownload] = useState('');
  const [files, setFiles] = useState('');
  const inputRef = useRef();
  const linkRef = useRef();
 
  useEffect(()=>{
    const maxAllowedSize = 100 * 1024 * 1024;
    const shareHandle = () =>{
      if(files){
        if(files.size < maxAllowedSize){
          let data = new FormData();
          data.append('name', files.name);
          data.append('file', files);
          uploadFile(data, setProgress, setDownload);
        }else{
          notifyError('Max file size is 100MB');
        }
      }
    }
    shareHandle();
  },[files]);

  const fileHandle = (e) =>{
    setDragged(false);
    setFiles(e.target.files[0])
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(linkRef.current.value);
    notifySuccess('Link copied to share!');
    setDownload('');
  }
  return (
      <>
        <div className='wrapper'>
          <img src={logo} alt="Shareapp logo" className="logo" />
          <section className="upload-container" >
            <form action="">
            <div className={`drop-zone ${dragged && 'dragged'}`}>
                <div className="icon-container">
                  <img
                    src={file}
                    draggable="false"
                    className="center"
                    alt="File Icon"
                  />
                  <img
                    src={file}
                    draggable="false"
                    className="left"
                    alt="File Icon"
                  />
                  <img
                    src={file}
                    draggable="false"
                    className="right"
                    alt="File Icon"
                  />
                </div>
                <input type="file" id="fileInput" 
                  ref={inputRef} 
                  onDragEnter={()=>{setDragged(true)}} 
                  onDragLeave={()=>{setDragged(false)}} 
                  onChange={(e)=>{fileHandle(e)}} 
                />
                <div className="title">
                  Drop your Files here or, <span id="browseBtn" >browse</span>
                </div>
              </div>
            </form>
            {progress && ( progress < 100) && (
              <div className="progress-container" >
                <div className="bg-progress" />
                <div className="inner-container">
                  <div className="status">Uploading...</div>
                  <div className="percent-container">
                    <span className="percentage" id="progressPercent">
                      {progress}
                    </span>
                    %
                  </div>
                  <div className="progress-bar" style={{'transform': `scaleX(${progress/100})`}}/>
                </div>
              </div>
            )}
            {download && (
              <div className="sharing-container">
                <p className="expire">Link expires in 24 hrs</p>
                <div className="input-container">
                  <input type="text" id="fileURL" readOnly="" value={download} ref={linkRef}/>
                  <img
                    src={copy}
                    onClick={()=>{handleCopy()}}
                    id="copyURLBtn"
                    alt="copy to clipboard icon"
                  />
                </div>
                <p className="email-info">Or Send via Email</p>
                <div className="email-container">
                  <form id="emailForm">
                    <div className="filed">
                      <label htmlFor="fromEmail">Your email</label>
                      <input
                        type="email"
                        autoComplete="email"
                        required=""
                        name="from-email"
                        id="fromEmail"
                      />
                    </div>
                    <div className="filed">
                      <label htmlFor="toEmail">Receiver's email</label>
                      <input
                        type="email"
                        required=""
                        autoComplete="receiver"
                        name="to-email"
                        id="toEmail"
                      />
                    </div>
                    <div className="send-btn-container">
                      <button type="submit">Send</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </section>
          <div className="image-vector" />
          <a href="https://github.com/ervnarayan/shareapp" className="github-corner" aria-label="View source on GitHub" >
            <svg
              width={80}
              height={80}
              viewBox="0 0 250 250"
              style={{
                fill: "#4ac4b4",
                color: "#0a3e39",
                position: "absolute",
                top: 0,
                border: 0,
                right: 0
              }}
              aria-hidden="true"
            >
              <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
              <path
                d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                fill="currentColor"
                style={{ transformOrigin: "130px 106px" }}
                className="octo-arm"
              ></path>
              <path
                d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                fill="currentColor"
                className="octo-body"
              ></path>
            </svg>
          </a>  
        </div>      
        <ToastContainer />  
      </>
  );
}
export default App;
