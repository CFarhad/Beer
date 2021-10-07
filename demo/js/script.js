let editor = new Beer({
  main: 'mainBoard',
  signMain: 'signBoard',
  // tools: '#signTools select',
});

document.addEventListener('alpine:init', () => {
  Alpine.data('app', () => ({
    modal: true,
    addSignature() {
      let sign = editor.exportSign();
      editor.addImage(sign);
      this.toggleModal();
    },
    async addImage(e) {
      try {
        const file = await e.target.files[0];
        if (
          (file.type && file.type === 'image/png') ||
          file.type === 'image/jpeg' ||
          file.type === 'image/jpg' ||
          file.type === 'image/svg'
        )
          editor.addImage(await toBase64(file));
      } catch (error) {
        throw new Error(error)
      }
    },
    toggleModal() {
      this.modal = !this.modal;
    },
  }));
});

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
