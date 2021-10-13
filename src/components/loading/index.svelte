<script>
  import {pdfTotal,pdfLoaded} from '../../store/'
  export let type;
  export let show;

  let number
  pdfTotal.subscribe(value=>{
    number = (100 / value);
  })

</script>


<div class="fixed z-50 inset-0 overflow-y-auto {show ? '' : 'hidden'}" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 bg-white bg-opacity-70 transition-opacity flex items-center justify-center" aria-hidden="true">
      {#if type === 'line'}
      <div class="w-80 h-3 rounded-full bg-indigo-200 overflow-hidden">
        <div class="h-3 bg-indigo-700" style="width: {number * $pdfLoaded}%;"></div>
      </div>
    {/if}
    </div>
  </div>
</div>