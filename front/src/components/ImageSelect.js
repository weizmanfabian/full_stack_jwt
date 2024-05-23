import React, { useState } from 'react';

let styleImage = {
  height: '10em',
  width: 'auto '
}

const ImageSelect = () => {
  const [image, setImage] = useState('');

  const removeImage = () => {
    setImage('')
    document.getElementById('imagen').value = null;
  }

  return (
    <div className="form-group col-md-5">
      <div className='row text-center justify-content-center'>
        <label>Imagen</label>
        {image &&
          <div className='col-12 text-center'>
            <img alt='imagen de prueba' style={styleImage} src={URL.createObjectURL(image)} />
          </div>
        }
        <div className='col-9 mt-2'>
          <input
            type="file"
            className='form-control col-8 img-fluid'
            id='imagen'
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        {image &&
          <div className="col-3 mt-2">
            <button className="btn btn-danger" onClick={removeImage}>Remove</button>
          </div>
        }
      </div>
    </div>
  );
}

export default ImageSelect;
