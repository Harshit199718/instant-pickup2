import React, {useState} from 'react'
import './image-upload.styles.scss'

function ImageUpload() {
    const [imageText, setImageText] = useState(true)
    const [imageUrl, setImageUrl] = useState("")
    const [buttonText, setButtonText] = useState("UPLOAD IMAGE")

    const handleImageUpload = (e) => {
        setImageUrl(URL.createObjectURL(e.target.files[0]))
        setImageText(false)
        setButtonText("ChangeImage")
      };
    return (
        <div className="image-upload_container">
            <div className="image_container">
              {imageText ? (
                <span className="m-4">Upload image</span>
              ) : (
                <img src={imageUrl} alt="" />
              )}
            </div>
            <div className="button_container mt-2">
              <button className="py-2">{buttonText}</button>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e)}
              />
            </div>
          </div>
    )
}

export default ImageUpload
