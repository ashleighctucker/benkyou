export const setImage = (
  e,
  old_url,
  oldImgPreview,
  setPhotoUrl,
  setOldUrl,
  setImgPreview,
  setOldImgPreview
) => {
  let set = (e) => {
    let file = e.target.files[0];
    setPhotoUrl(e.target.files[0]);
    if (file) {
      setOldUrl(file);
      file = URL.createObjectURL(file);
      setImgPreview(file);
      setOldImgPreview(file);
    } else {
      setPhotoUrl(old_url);
      setImgPreview(oldImgPreview);
    }
  };
  set(e);
};
