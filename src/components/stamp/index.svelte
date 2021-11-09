<script>
  import {stampModal} from '../../store/'
  import {dataURItoBlob} from '../../helpers'
  import store from '../../store/store';
  import {addImage} from '../../reducers/workspace';

  import stamp1 from '../../assets/images/stamp/1.svg';
  import stamp2 from '../../assets/images/stamp/2.svg';
  import stamp3 from '../../assets/images/stamp/3.svg';
  import stamp4 from '../../assets/images/stamp/4.svg';
  import stamp5 from '../../assets/images/stamp/5.svg';
  import stamp6 from '../../assets/images/stamp/6.svg';
  import stamp7 from '../../assets/images/stamp/7.svg';
  import stamp8 from '../../assets/images/stamp/8.svg';
  import stamp9 from '../../assets/images/stamp/9.svg';
  import stamp10 from '../../assets/images/stamp/10.svg';
  import stamp11 from '../../assets/images/stamp/11.svg';
  import stamp12 from '../../assets/images/stamp/12.svg';
  import stamp13 from '../../assets/images/stamp/13.svg';
  import stamp14 from '../../assets/images/stamp/14.svg';
  import stamp15 from '../../assets/images/stamp/15.svg';
  import stamp16 from '../../assets/images/stamp/16.svg';
  import stamp17 from '../../assets/images/stamp/17.svg';
  import stamp18 from '../../assets/images/stamp/18.svg';
  import stamp19 from '../../assets/images/stamp/19.svg';
  import stamp20 from '../../assets/images/stamp/20.svg';
  import stamp21 from '../../assets/images/stamp/21.svg';
  import stamp22 from '../../assets/images/stamp/22.svg';
  import stamp23 from '../../assets/images/stamp/23.svg';
  import stamp24 from '../../assets/images/stamp/24.svg';

  let allStamp = [
    stamp1,
    stamp2,
    stamp3,
    stamp4,
    stamp5,
    stamp6,
    stamp7,
    stamp8,
    stamp9,
    stamp10,
    stamp11,
    stamp12,
    stamp13,
    stamp14,
    stamp15,
    stamp16,
    stamp17,
    stamp18,
    stamp19,
    stamp20,
    stamp21,
    stamp22,
    stamp23,
    stamp24
  ];

  
  /**
   * toggle Stamp Modal
   * @param {boolean} show
   */
  function toggleStamp(){
    stampModal.update(item => item = !item);
  }

  /**
   * get Stamp Image
   * @param {string} <image url>
  */
  function exportImages(image){

    
    /**
      * get image data
      * push image data to store
     */
    let img = new Image();
    img.src = image.src;

    let canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    let dataURL = canvas.toDataURL('image/png');

    let {width , height} = store.getState().editor.size;
    store.dispatch(addImage({dataURL,width,height}))

    toggleStamp();

  }

  

</script>

<div class="fixed z-50 inset-0 overflow-y-auto {$stampModal ? '' : 'hidden'}" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

    <div class="fixed inset-0 bg-gray-500 dark:bg-gray-800 dark:bg-opacity-75 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

    <!-- This element is to trick the browser into centering the modal contents. -->
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

    <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div class="w-full flex justify-between flex-reverse p-4 text-gray-900 dark:text-white dark:bg-gray-800 bg-gray-50">
        <button class="text-2xl btn-close dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-900" on:click={toggleStamp}>
          <i class="bi bi-x"></i>
        </button>
        <h3 class="font-persian">مهر</h3>
      </div>
      <div class="bg-white dark:bg-gray-900 p-4 max-h-96 overflow-auto">
        <div class="grid grid-cols-3 gap-3">

          {#each allStamp as stamp}
            <img src={stamp} class="w-full hover:bg-gray-100 p-2 rounded-md cursor-pointer h-[64px]" alt="" on:click={(e) => exportImages(e.target)} />
          {/each}

              
        </div>
      </div>
    </div>
  </div>
</div>