<script>
  import {modal,pdfPages} from '../../store/index'
  import Modal from '../modal/index.svelte'

  export let mode;
  export let nextPage;
  export let prevPage;
  export let setPage;
  export let numberPage;
  export let zoomIn;
  export let zoomOut;

  function toggleModal(){
    modal.update(item => item = !item)
  }

  function setPdfPage(e){
    setPage(e)
  }
</script>

<div>
  <nav class=" fixed top-0 w-full z-30">
    <div class="bg-white container mx-auto flex items-center justify-between h-16 px-7 border-b-2">
        <div class="flex items-center">
          <h1 class="font-brand text-5xl text-indigo-600 mt-1">Beer</h1>
        </div>
        <div class="flex items-center justify-between space-x-5">
        {#if mode === 'pdf'}
        <div class="flex items-center">
          <div class="flex items-center">
            <button class="btn-indigo rounded-r-none" title="قبلی" on:click={prevPage()}>
              <i class="bi bi-caret-left-fill"></i>
            </button>
            <input type="text" class="control text-center border border-indigo-600"
             placeholder="1" 
             value={numberPage}
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
              <input class="hidden" type="file" id="inputFile" accept=".png,.svg,.jpg" x-on:change="e=>addImage(e)" />
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
          <button class="btn-green">
            <i class="bi bi-download mr-2"></i>
            ذخیره
          </button>
        </div>
    </div>
  
    <!-- subnavbar -->

    <div class="bg-white container mx-auto flex items-center justify-between h-14 px-7 shadow-md">
      <div class=""></div>
      <div class="flex items-center">
        <button class="btn-red">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  
  </nav>

  <!-- Modal -->
  <Modal />
</div>