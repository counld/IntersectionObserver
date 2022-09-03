import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import React from 'react';
const props = {
  action: 'upload',
  listType: 'picture',

  beforeUpload(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const img = document.createElement('img');
        img.src = reader.result;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          ctx.fillStyle = 'red';
          ctx.textBaseline = 'middle';
          ctx.font = '33px Arial';
          ctx.fillText('雪舞的house', 20, 20);
          canvas.toBlob((result) =>  { console.log(result,'jjj'); return resolve(result)});
        };
      };
    });
  },
};

const OnlyUpload = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Upload</Button>
  </Upload>
);

export default OnlyUpload;