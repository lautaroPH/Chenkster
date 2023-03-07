import { uploadImagePreview } from '@/utils/uploadImagePreview';
import { useState } from 'react';
import UploadSvg from './Svg/UploadSvg';

const FileInput = ({ name, inputRef, title, handlePreview, handleData }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    uploadImagePreview(e.dataTransfer.files, name, handlePreview, handleData);
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
      className={`${
        isDragOver ? 'border-chenkster-blue' : 'border-gray-400 '
      } flex w-full gap-3 px-4 py-3 mb-3 text-base text-gray-500 border rounded-lg focus:shadow-outline font-lato`}
    >
      <input
        type="file"
        name={name}
        hidden
        ref={inputRef}
        onChange={(e) =>
          uploadImagePreview(e.target.files, name, handlePreview, handleData)
        }
        accept="image/png, image/jpeg, image/jpg, image/webp"
      />
      {isDragOver ? (
        <div>Drop file here</div>
      ) : (
        <div className="flex items-center gap-3">
          {title} <UploadSvg />
        </div>
      )}
    </div>
  );
};

export default FileInput;
