import ImageUploader from 'react-image-upload'
import 'react-image-upload/dist/index.css'

const UserImgContainer = () => {
  function getImageFileObject(imageFile) {
    console.log({ imageFile })
  }

  function runAfterImageDelete(file) {
    console.log({ file })
  }

  return (
    <ImageUploader style={{ height: 200, width: 200, background: 'rgb(0 182 255)' }}
      onFileAdded={(img) => getImageFileObject(img)}
      onFileRemoved={(img) => runAfterImageDelete(img)}
    />
  )
}

export default UserImgContainer