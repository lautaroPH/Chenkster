/* eslint-disable @next/next/no-img-element */

const ImagePreview = ({ imagePreview, alt, styles }) => {
  return (
    <>
      {imagePreview && <img src={imagePreview} alt={alt} className={styles} />}
    </>
  );
};

export default ImagePreview;
