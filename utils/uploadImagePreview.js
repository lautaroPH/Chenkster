export const uploadImagePreview = async (
  files,
  name,
  setImagePreview,
  setData,
) => {
  setData(files, name);

  const reader = new FileReader();
  if (files[0]) {
    reader.readAsDataURL(files[0]);
  }
  reader.onload = (readerEvent) => {
    setImagePreview(readerEvent.target.result);
  };
};
