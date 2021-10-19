<script >
  import Konva from 'konva'
  import Header from '../../components/header/index.svelte'
  import {STAGE,PDF_WORKER_SRC,PDF_WORK_SPACE} from '../../constant/editor'
  import Loading from '../../components/loading/index.svelte'
  import NoLoad from '../error/noLoad.svelte'
  import {pdf,pdfTotal,pdfLoaded} from '../../store/'
  import {
    createStage,
    updateSize,
    setPdfTotalPage,
    pdfNextPage,
    pdfPrevPage,
    pdfSetPage} from '../../reducers/workspace'
  import {useDispatch,useStore} from 'svelte-reedux'
  import './style.css'

  pdf.GlobalWorkerOptions.workerSrc = PDF_WORKER_SRC
  export let file;
  let successfulLoad;
  let showLoading = true;
  let mainPdf;
  let viewport
  let scale = 0.73;
  let total;
  let now;

  const store = useStore();
  const dispatch = useDispatch();



  // Load Pdf
  let loadPdf = pdf.getDocument(file);
  loadPdf.onProgress = (data)=>{
      pdfTotal.update(n => n = data.total)
      pdfLoaded.update(n => n = data.loaded);
      if($pdfLoaded !== $pdfTotal){
        showLoading = true
      }
      else{
        showLoading = false
      }
  }

  loadPdf.promise.then(async (pdf)=>{
    mainPdf = pdf;
    dispatch(setPdfTotalPage(mainPdf._pdfInfo.numPages))
    let pdfNowPage = store.getState().editor.pdfPages.now;
    RenderPDF(pdfNowPage,scale);
    dispatch(createStage({stage: STAGE}))
    now = pdfNowPage;
    total = mainPdf._pdfInfo.numPages;
  })
  .catch((err)=>{
    successfulLoad = true;
  })



  // Renderpdf with number Page and scale
  const RenderPDF = (numPage,scale)=>{
      mainPdf.getPage(numPage).then(page=>{
      viewport = page.getViewport({scale: scale});
      let outputScale = window.devicePixelRatio || 1;
      let canvas = document.getElementById(PDF_WORK_SPACE);
      let context = canvas.getContext('2d');

      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = Math.floor(viewport.width) + "px";
      canvas.style.height =  Math.floor(viewport.height) + "px";

      let transform = outputScale !== 1
          ? [outputScale, 0, 0, outputScale, 0, 0]
          : null;

      let renderContext = {
          canvasContext: context,
          transform: transform,
          viewport: viewport,
      };
      page.render(renderContext)
      dispatch(updateSize({width:canvas.style.width.replace('px','') 
      , height: canvas.style.height.replace('px','') ,
       aspectRatio: `${canvas.width} / ${canvas.height}`,
        scale: scale
      }))

    })
  }

  const nextPage = ()=>{
    let pdfPageNow = store.getState().editor.pdfPages.now;
    let pdfPageTotal = store.getState().editor.pdfPages.total;

    if(pdfPageNow !== pdfPageTotal){
      dispatch(pdfNextPage())
      RenderPDF(++pdfPageNow,scale);
      now = pdfPageNow;
    }
  }

  const prevPage = ()=>{
    let pdfPageNow = store.getState().editor.pdfPages.now;

    if(pdfPageNow !== 1){
      dispatch(pdfPrevPage())
      RenderPDF(--pdfPageNow,scale);
      now = pdfPageNow;
    }
  }

  const setPage = (number)=>{
    let pdfPageNow = store.getState().editor.pdfPages.now;
    let pdfPageTotal = store.getState().editor.pdfPages.total;

    if(number !== pdfPageNow && number > 0 && number <= pdfPageTotal && number.match(/[0-9]/g)){
      dispatch(pdfSetPage(+number))
      RenderPDF(+number,scale);
      now = +number;
    }
  }

  const zoomIn = ()=>{
    let pdfPageNow = store.getState().editor.pdfPages.now;
    scale += 0.1;
    RenderPDF(pdfPageNow,scale)
  }

  const zoomOut = ()=>{
    let pdfPageNow = store.getState().editor.pdfPages.now;
    scale -= 0.1;
    RenderPDF(pdfPageNow,scale);
  }

</script>


<div>
  <Header mode="pdf" nextPage={nextPage} prevPage={prevPage} setPage={setPage} zoomIn={zoomIn} zoomOut={zoomOut} total={total} now={now} />
  <main class=" bg-gray-200 flex items-start justify-center relative h-[calc(100vh - (4rem + 3.5rem))] mt-[calc(4rem + 3.5rem)] p-[10px] overflow-auto" id="main">
    <canvas id={PDF_WORK_SPACE} class=" z-10"></canvas>
    <div id={STAGE} class="absolute z-20"></div>
    <Loading show={showLoading} type="line"  />
    <NoLoad onError={successfulLoad} />
  </main>
</div>