<script>
  import {modal} from '../../store/index'

  function toggleModal(){
    modal.update(item => item = !item)
  }
</script>

<div class="fixed z-10 inset-0 overflow-y-auto {$modal ? '' : 'hidden'}" aria-labelledby="modal-title" role="dialog" aria-modal="true">
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
            <div class="flex justify-center items-center">
                <div id="signBoard"></div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" class="btn-green ml-3" >
              Add
            </button>
            <button type="button" class="btn-default" on:click={toggleModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>