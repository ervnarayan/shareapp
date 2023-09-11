import axios from 'axios';
import { notifyError, notifySuccess } from '../utils/toast';

const uploadFile = async (data, setProgress, setDownload) =>{
    const URL = process.env.REACT_APP_API_URL;
    try{
        const response = await axios.post(`${URL}/upload`, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: data => {
              setProgress(Math.round((100 * data.loaded) / data.total))
            },
          })
        setDownload(response.data.path);
        notifySuccess('File uploaded sucessfully');
    }catch(err){
        notifyError(`Error in upload: ${err.message}`)
    }
}
export default uploadFile;