<script>
  import {modal} from '../../store/index'
  import Modal from '../modal/index.svelte'
  import {PDFDocument} from 'pdf-lib';
  import {addImage} from '../../reducers/workspace'
  import Dropdown from '../dropdown/index.svelte'
  import store from '../../store/store'

  export let mode;
  export let nextPage;
  export let prevPage;
  export let setPage;
  export let zoomIn;
  export let zoomOut;



  function toggleModal(){
    modal.update(item => item = !item)
  }

  function setPdfPage(e){
    setPage(e)
  }

  async function saveFile(){
    const searchParams = new URLSearchParams(window.location.search);
    const file = searchParams.get('url');

    const existingPdfBytes = await fetch(file).then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    console.log(width, height );
    const image = store.getState().editor.stage;


    const pngUrl = image.toDataURL({mimeType:"image/png",pixelRatio:3});

    const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer());

    const pngImage = await pdfDoc.embedPng(pngImageBytes);


    firstPage.drawImage(pngImage,{
      x:0,
      y:0,
      width: width,
      height: height
    })

    const pdfBytes = await pdfDoc.save();
    require("downloadjs")(pdfBytes, "pdf-lib_image_embedding_example.pdf", "application/pdf");
  }

  function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

  function insertImage(e){
    let file = e.target.files[0]

    getBase64(file).then(
      data =>{
        console.log(data);
        let {width , height} = store.getState().editor.size;

        store.dispatch(addImage({dataURL: data,width,height}))
      }
    );
  }

</script>

<div>
  <nav class=" fixed top-0 w-full z-30">
    <div class="bg-white dark:bg-gray-800 container mx-auto flex items-center justify-between h-16 px-7 border-b-2 dark:border-gray-900">
        <div class="flex items-center">
          <h1 class="font-brand text-4xl text-indigo-600 mt-1">Editor</h1>
        </div>
        <div class="flex items-center justify-between space-x-5">
        {#if mode === 'pdf'}
        <div class="flex items-center">
          <div class="flex items-center">
            <button class="btn-indigo rounded-r-none" title="قبلی" on:click={prevPage()}>
              <i class="bi bi-caret-left-fill"></i>
            </button>
            <input type="text" class="form-input control text-center border border-indigo-600 w-24 dark:bg-gray-800 dark:text-white"
             placeholder="1" 
             value={`${$store.editor.pdfPages.now} / ${$store.editor.pdfPages.total}`}
             on:change={(e)=>setPdfPage(e.target.value)}
            />
            <button class="btn-indigo rounded-l-none" title="بعدی" on:click={nextPage()}>
              <i class="bi bi-caret-right-fill"></i>
            </button>
          </div>
        </div>
        {/if}
          <div class="flex items-center space-x-2.5">
            <button class="btn-indigo" on:click={zoomIn()}>
              <i class="bi bi-zoom-in"></i>
            </button>
            <button class="btn-indigo" on:click={zoomOut()}>
              <i class="bi bi-zoom-out"></i>
            </button>
          </div>
          <div class="flex items-center ">
            <button class="btn-indigo" on:click={toggleModal}>
              <i class="bi bi-pen"></i>
            </button>
          </div>
          <div class="flex items-center ">
            <button class="btn-indigo" >
              <i class="bi bi-type"></i>
            </button>
          </div>
          <div class="flex items-center ">
            <label class="btn-indigo cursor-pointer" id="insertImage" for="inputFile">
              <input class="hidden" type="file" id="inputFile" accept=".png,.svg,.jpg" on:change={e=>insertImage(e)} />
            <i class="bi bi-image"></i>
            </label>
          </div>
          <div class="flex items-center ">
            <button class="btn-indigo">
              <i class="bi bi-lamp"></i>
            </button>
          </div>
        </div>
        <div class="flex items-center">
          <Dropdown text="ذخیره" icon="bi-gear" download={saveFile} />
        </div>
    </div>
  
    <!-- subnavbar -->

    <div class="bg-white dark:bg-gray-800 container mx-auto flex items-center justify-between h-14 px-7 shadow-md">
      <div class=""></div>
      <div class="flex items-center">
        <button class="btn-red hidden">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  
  </nav>

  <!-- Modal -->
  <Modal />
</div>