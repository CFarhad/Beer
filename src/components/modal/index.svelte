<script>
  import {onMount} from 'svelte'
  import {modal} from '../../store/index'
  import {createSignatureStage,
    addToSignatureLayer,
    removeSignature,
    exportSignature,} from '../../reducers/signature';
  import {addImage} from '../../reducers/workspace'
  import {SIGN_STAGE} from '../../constant/editor'
  import {useDispatch,useStore} from 'svelte-reedux'


  const dispatch = useDispatch();
  const store = useStore();

  let stage;
  let isPaint = false;
  let mode = 'brush';
  let lastLine;
  let allowExportSign = false;


  onMount(()=>{
    dispatch(createSignatureStage({stage: SIGN_STAGE}))
    stage = store.getState().signature.stage;

    stage.on('mousedown touchstart', function (e) {
        isPaint = true;
        var pos = stage.getPointerPosition();
        lastLine = new Konva.Line({
          stroke: '#000000',
          strokeWidth: 5,
          globalCompositeOperation:
            mode === 'brush' ? 'source-over' : 'destination-out',
          // round cap for smoother lines
          lineCap: 'round',
          // add point twice, so we have some drawings even on a simple click
          points: [pos.x, pos.y, pos.x, pos.y],
        });
        dispatch(addToSignatureLayer(lastLine))
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
    dispatch(removeSignature())
    allowExportSign = false;
  }

  function exportSign(){
    const getLayer = store.getState().signature.layer.getChildren();
    if(getLayer.length > 0){
      const aspectRatio = store.getState().editor.size.aspectRatio;
      dispatch(exportSignature({aspectRatio}))
      let dataURL = store.getState().signature.line;
      let {width , height} = store.getState().editor.size;
      dispatch(addImage({dataURL,width,height}))
      toggleModal()
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
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    
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
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="w-full flex justify-between flex-row-reverse p-4 pb-0">
            <button class="text-2xl btn-close" on:click={toggleModal}>
              <i class="bi bi-x"></i>
            </button>
            <h3>Draw</h3>
          </div>
          <div class="flex items-center justify-between"></div>
          <div class="bg-white p-4">
            <div class="flex justify-center items-center flex-col">
                <div id={SIGN_STAGE}></div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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