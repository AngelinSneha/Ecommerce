import React from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {Avatar, Badge} from "antd"
import { UploadOutlined } from '@ant-design/icons';

function Fileupload({setLoading, values, setValues}) {
    const {user} = useSelector(state => ({...state}))
    const FileuploadAndResize = (e) => {
        let files = e.target.files;
        let allUploadedFiles = values.images
        if(files) {
            setLoading(true)
            for(let i=0;i<files.length;i++) {
                Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, 
                    (uri) => {
                        axios.post(`${process.env.REACT_APP_API}/uploadimages`, {image:uri}, {
                            headers: {
                                authtoken: user? user.token: ''
                            }
                        })
                        .then(res => {
                            console.log('Image upload res data', res);
                            setLoading(false);
                            allUploadedFiles.push(res.data);
                            setValues({...values, image:allUploadedFiles})
                        })
                        .catch(err => {
                            setLoading(false);
                            console.log('CLOUDINARY UPLOAD ERR', err);
                        })
                    },
                'base64'
                )
            }
        }
    }

    const handleImageRemove = (public_id) => {
        setLoading(true)
        // console.log("remove image", public_id);
        axios.post(`${process.env.REACT_APP_API}/removeimage`, {public_id},
        {
            headers: {
                authtoken:user ? user.token:''
            }
        })
        .then(res => {
            setLoading(false)
            const {images} = values
            let filterImages = images.filter((item) => {
                return item.public_id !== public_id
            })
            setValues({...values, images: filterImages})
        })
        .catch(err => {
            setLoading(false)
            console.log(err);
        })
    }

    return (
        <>
        <div className="row">
        <label><b>Select images for the Product</b></label>
            {values.images && values.images.map((image) => (
                <Badge count="X" key={image.public_id} onClick={() => handleImageRemove(image.public_id)} style={{cursor:"pointer"}} >
                    <Avatar src={image.url} size={100} shape="square" className="ml-3" />
                </Badge>
            ))}
        </div>
        <br/>
        <div className="row">
            <label className="btn btn-raised btn-info"><UploadOutlined />  Choose File
                <input hidden type="file" multiple accept="images/*" onChange={FileuploadAndResize} />
            </label>
        </div>
        </>
    )
}

export default Fileupload;