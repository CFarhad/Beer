<script>
  import {onMount} from 'svelte'
  import {modal} from '../../store/index'
  import {createSignatureStage,
    addToSignatureLayer,
    removeSignature,
    exportSignature,} from '../../reducers/signature';
  import {addImage} from '../../reducers/workspace'
  import {SIGN_STAGE} from '../../constant/editor'
  import store from '../../store/store'




  let stage;
  let isPaint = false;
  let mode = 'brush';
  let lastLine;
  let allowExportSign = false;

  let lineColor = '#000000';


  onMount(()=>{
    store.dispatch(createSignatureStage({stage: SIGN_STAGE}))
    stage = store.getState().signature.stage;

    stage.on('mousedown touchstart', function (e) {
        isPaint = true;
        var pos = stage.getPointerPosition();
        lastLine = new Konva.Line({
          stroke: lineColor,
          strokeWidth: 5,
          globalCompositeOperation:
            mode === 'brush' ? 'source-over' : 'destination-out',
          // round cap for smoother lines
          lineCap: 'round',
          // add point twice, so we have some drawings even on a simple click
          points: [pos.x, pos.y, pos.x, pos.y],
        });
        store.dispatch(addToSignatureLayer(lastLine))
        allowExportSign = true
      });

      
      stage.on('mouseup touchend', function () {
        isPaint = false;
      });
    

      stage.on('mousemove touchmove', function (e) {
        if (!isPaint) {
          return;
        }

        // prevent scrolling on touch devices
        e.evt.preventDefault();

        const pos = stage.getPointerPosition();
        var newPoints = lastLine.points().concat([pos.x, pos.y]);
        lastLine.points(newPoints);
      });
  })


  function toggleModal(){
    modal.update(item => item = !item)
  }

  function deleteSignature(){
    store.dispatch(removeSignature())
    allowExportSign = false;
  }

  function exportSign(){
    const getLayer = store.getState().signature.layer.getChildren();
    if(getLayer.length > 0){
      const aspectRatio = store.getState().editor.size.aspectRatio;
      store.dispatch(exportSignature({aspectRatio}))
      let dataURL = store.getState().signature.line;
      let {width , height} = store.getState().editor.size;
      store.dispatch(addImage({dataURL,width,height}))
      toggleModal()
    }
  }

  // check input value is hex color
  function isHex(str) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(str);
  }

  // handle input color
  function handleColor(e) {
    const color = e.target.value;
    if (isHex(color)) {
      lineColor = color;
      e.target.classList.remove('focus:ring-red-500');
      e.target.classList.remove('focus:border-red-500');

      e.target.classList.add('focus:ring-green-500');
      e.target.classList.add('focus:border-green-500');
    }
    else{
      lineColor = '#000000';
      e.target.classList.add('focus:ring-red-500');
      e.target.classList.add('focus:border-red-500');

      e.target.classList.remove('focus:ring-green-500');
      e.target.classList.remove('focus:border-green-500');
    }
  }

  // set brush color to input color
  function setDefaultColor(e){
    if(isHex(e.target.value)){
      lineColor = e.target.value;
    }
  }


</script>

<div class="fixed z-50 inset-0 overflow-y-auto {$modal ? '' : 'hidden'}" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!--
          Background overlay, show/hide based on modal state.
    
          Entering: "ease-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100"
            To: "opacity-0"
        -->
        <div class="fixed inset-0 bg-gray-500 dark:bg-gray-800 dark:bg-opacity-75 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    
        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    
        <!--
          Modal panel, show/hide based on modal state.
    
          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        -->
        <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="w-full flex justify-between flex-reverse p-4 text-gray-900 dark:text-white dark:bg-gray-800 bg-gray-50">
            <button class="text-2xl btn-close dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-900" on:click={toggleModal}>
              <i class="bi bi-x"></i>
            </button>
            <h3 class="font-persian">امضا</h3>
          </div>
          <div class="flex items-center justify-between p-4 dark:bg-gray-900">
            <button class="bg-[#F44336] w-6 h-6 rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F44336]" value="#F44336" on:click={(e)=>setDefaultColor(e)}></button>
            <button class="bg-[#E91E63] w-6 h-6 rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E91E63]" value="#E91E63" on:click={(e)=>setDefaultColor(e)}></button>
            <button class="bg-[#9C27B0] w-6 h-6 rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9C27B0]" value="#9C27B0" on:click={(e)=>setDefaultColor(e)}></button>
            <button class="bg-[#673AB7] w-6 h-6 rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#673AB7]" value="#673AB7" on:click={(e)=>setDefaultColor(e)}></button>
            <button class="bg-[#2196F3] w-6 h-6 rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2196F3]" value="#2196F3" on:click={(e)=>setDefaultColor(e)}></button>
            <button class="bg-[#00BCD4] w-6 h-6 rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00BCD4]" value="#00BCD4" on:click={(e)=>setDefaultColor(e)}></button>
            <button class="bg-[#009688] w-6 h-6 rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#009688]" value="#009688" on:click={(e)=>setDefaultColor(e)}></button>
            <button class="bg-[#FFEB3B] w-6 h-6 rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFEB3B]" value="#FFEB3B" on:click={(e)=>setDefaultColor(e)}></button>
            <button class="bg-[#000000] w-6 h-6 rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000000]" value="#000000" on:click={(e)=>setDefaultColor(e)}></button>
            <input type="text" class="h-6 w-20 rounded-md border-gray-300 p-2 text-sm dark:bg-gray-500" value="#000000" placeholder="#000000" on:input={(e)=>handleColor(e)}>
          </div>
          <div class="bg-white dark:bg-gray-900 p-4">
            <div class="flex justify-center items-center flex-col">
                <div id={SIGN_STAGE}></div>
            </div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" class="btn-green ml-3 font-persian {allowExportSign ? 'cursor-pointer opacity-100' : 'cursor-default opacity-30 bg-green-600'}" on:click={exportSign}>
              افزودن
            </button>
            <button type="button" class="btn-red font-persian" on:click={deleteSignature}>
              پاک کردن
            </button>
          </div>
        </div>
      </div>
    </div>