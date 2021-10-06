let editor = new Beer({
  main: 'mainBoard',
  signMain: 'signBoard',
  tools: '#signTools select',
});

let signModal = new bootstrap.Modal(document.getElementById('signModal'));

let exportSignature = document.getElementById('exportSignature');
exportSignature.addEventListener('click', () => {
  let sign = editor.exportSign();
  editor.addImage(sign);
  signModal.hide();
});

let insertImage = document.getElementById('inputFile');
insertImage.addEventListener('change', async (e) => {
  const file = await e.target.files[0];
  if (
    file.type &&
    file.type === 'image/png' ||
    file.type === 'image/jpeg' ||
    file.type === 'image/jpg' ||
    file.type === 'image/svg'
  ) editor.addImage(await toBase64(file))
  
});

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
