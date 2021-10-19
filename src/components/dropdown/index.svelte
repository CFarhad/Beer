<script>
  import screenfull from 'screenfull'
  let open = false;
  export let text
  export let icon;
  export let download;

  function toggleFullScreen(){
    if(screenfull.isEnabled){
      screenfull.toggle();
    }
    toggleDropdown()
  }

  function toggleDropdown(){
    open = !open
    
  }
</script>

<div class="relative inline-block text-left">
  <div>
    <button type="button" class="flex justify-center items-center flex-row-reverse w-full h-10 overflow-hidden rounded-md text-white border shadow-sm text-sm font-mediumfocus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
      <button class="h-full px-4 bg-indigo-600 font-persian" on:click={download()}>
        {text}
      </button>
      <button class="h-full px-3 bg-indigo-700" on:click={toggleDropdown}>
        <i class="bi {icon}"></i>
      </button>
    </button>
  </div>

  <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  -->
  <div class="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none {open ? '' : 'hidden'}" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
    <div class="py-1" role="none">
      <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
      <div class="px-4 py-2 w-full flex items-center justify-between flex-row-reverse text-gray-900 hover:bg-gray-100 transition cursor-pointer">
        <span href="#" class="block  text-sm font-persian" role="menuitem" tabindex="-1" id="menu-item-0">تنظیمات فایل</span>
        <i class="bi bi-file-earmark-pdf-fill text-xl"></i>
      </div>
      <div class="px-4 py-2 w-full flex items-center justify-between flex-row-reverse text-gray-900 hover:bg-gray-100 transition cursor-pointer" on:click={toggleFullScreen}>
        <span href="#" class="block  text-sm font-persian" role="menuitem" tabindex="-1" id="menu-item-0">تمام صفحه</span>
        <i class="bi bi-fullscreen text-xl"></i>
      </div>
      <div class="px-4 py-2 w-full flex items-center justify-between flex-row-reverse text-gray-900 hover:bg-gray-100 transition cursor-pointer">
        <span href="#" class="block  text-sm font-persian" role="menuitem" tabindex="-1" id="menu-item-0">دانلود</span>
        <i class="bi bi-download text-xl"></i>
      </div>
      <div class="px-4 py-2 w-full flex items-center justify-between flex-row-reverse text-gray-900 hover:bg-gray-100 transition cursor-pointer">
        <span href="#" class="block  text-sm font-persian" role="menuitem" tabindex="-1" id="menu-item-0">پرینت</span>
        <i class="bi bi-printer-fill text-xl"></i>
      </div>
      <div class="px-4 py-2 w-full flex items-center justify-between flex-row-reverse text-gray-900 hover:bg-gray-100 transition cursor-pointer">
        <span href="#" class="block  text-sm font-persian" role="menuitem" tabindex="-1" id="menu-item-0">حالت : <span class="font-bold">روشن</span></span>
        <i class="bi bi-printer-fill text-xl"></i>
      </div>
    </div>
  </div>
</div>