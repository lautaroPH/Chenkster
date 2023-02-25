export const uploadImagePreview = async (e, setImagePreview, setData) => {
  const name = e.target.name;
  const files = e.target.files;
  setData((prev) => ({ ...prev, [name]: files }));

  const reader = new FileReader();
  if (files[0]) {
    reader.readAsDataURL(files[0]);
  }
  reader.onload = (readerEvent) => {
    setImagePreview(readerEvent.target.result);
  };
};
