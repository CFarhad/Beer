<script >
  import Konva from 'konva'
  import Header from '../../components/header/index.svelte'
  import {STAGE,PDF_WORKER_SRC,PDF_WORK_SPACE} from '../../constant/editor'
  import Loading from '../../components/loading/index.svelte'
  import NoLoad from '../error/noLoad.svelte'
  import {pdf,pdfTotal,pdfLoaded,pdfPages} from '../../store/'
  import configStore from '../../store/store'
  import {createStage,addToLayer,updateSize} from '../../reducers/workspace'
  import './style.css'

  pdf.GlobalWorkerOptions.workerSrc = PDF_WORKER_SRC
  export let file;
  let successfulLoad;
  let showLoading = false;
  let mainPdf;
  let viewport
  let scale = 0.73;
  let numberPage = 1;
  const store = configStore();



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
    pdfPages.subscribe(n=>{
      n.total = mainPdf._pdfInfo.numPages;
    })
    RenderPDF($pdfPages.now,scale);
    store.dispatch(createStage({stage: STAGE}))
  })
  .catch((err)=>{
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
      store.dispatch(updateSize({width:canvas.style.width.replace('px','') 
      , height: canvas.style.height.replace('px','') ,
       aspectRatio: `${canvas.width} / ${canvas.height}`,
        scale: scale
      }))

    })
  }

  const nextPage = ()=>{
    if($pdfPages.now !== mainPdf._pdfInfo.numPages){
      pdfPages.subscribe(n =>{
        n.now++;
        numberPage = n.now;
      })
      RenderPDF($pdfPages.now,scale);
    }
  }

  const prevPage = ()=>{
    if($pdfPages.now !== 1){
      pdfPages.subscribe(n =>{
        n.now--;
        numberPage = n.now;
      })
      RenderPDF($pdfPages.now,scale)
    }
  }

  const setPage = (number)=>{
    if(number !== $pdfPages.now && number > 0 && number <= $pdfPages.total && number.match(/[0-9]/g)){
      RenderPDF(+number,scale);
    }
  }

  const zoomIn = ()=>{
    scale += 0.1;
    RenderPDF($pdfPages.now,scale)
  }

  const zoomOut = ()=>{
    scale -= 0.1;
    RenderPDF($pdfPages.now,scale)
  }

</script>


<div>
  <Header mode="pdf" nextPage={nextPage} prevPage={prevPage} setPage={setPage} numberPage={numberPage} zoomIn={zoomIn} zoomOut={zoomOut} />
  <main class="h-screen bg-gray-200 flex items-start justify-center relative pt-1" id="main">
    <canvas id={PDF_WORK_SPACE} class=" z-10"></canvas>
    <div id={STAGE} class="absolute z-20"></div>
    <Loading show={showLoading} type="line"  />
    <NoLoad onError={successfulLoad} />
  </main>
</div>