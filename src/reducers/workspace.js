import { createSlice } from "@reduxjs/toolkit"
import Konva from "konva"
import {createHash , handlePdfPage} from '../helpers'



const slice = createSlice({
  name: 'workspace',
  initialState: {
    stage: null,
    layer: new Konva.Layer(),
    allLayer: [],
    allImages: [],
    size:{
      width: 0,
      height:0,
      aspectRatio: '',
      scale: 0,
    },
    transformer: new Konva.Transformer({
      padding: 14,
      borderStrokeWidth: 1,
      anchorSize: 13,
      rotateAnchorOffset: 25,
      anchorFill: '#6366F1',
      anchorStroke: '#4338CA',
      anchorStrokeWidth: 2,
      anchorCornerRadius: 100,
    }),
    pdfPages:{
      total:1,
      now:1
    }
  },
  reducers: {
    // create initial stage 
    createStage: (state,action)=>{
      let myStage = new Konva.Stage({
        container: action.payload.stage,
        width: state.size.width,
        height: state.size.height,
        scale: {x: 0.73 , y:0.73}
      })
      state.stage = myStage;
      state.layer.draw();
      state.stage.add(state.layer);
      state.layer.add(state.transformer);
    },
    addToLayer: (state,action)=>{
      state.layer.add(action.payload)
    },

    // add any image to the layer 
    addImage: (state,action)=>{
      let dataURL = action.payload.dataURL;
      let newImage = new Image();
      newImage.src = dataURL;
      let image = new Konva.Image({
        image: newImage,
        x: 40,
        y: 40,
        name: 'image',
        draggable: true,
      });

      // set name for image
      image.name(`${state.pdfPages.now}${createHash()}`);

      // add image to allImages
      state.allImages.push({name: image.name(), src: dataURL});


      image.on('click',  (e) => {
        let transformer = e.target.parent.find('Transformer')[0];
        let stage = e.target.parent.parent;
        transformer.nodes([e.target]);
        transformer.moveToTop();
        stage.on('click', (e) => {
          if (e.target === stage) {
            transformer.nodes([]);
          }
        });
      });

      image.on('transform', (e) => {
        e.target.moveToTop();
      });


      state.layer.add(image);
    },
    // change the size of the stage when the pdf is resized
    updateSize: (state,action)=>{
      state.size = {width:action.payload.width,height:action.payload.height,aspectRatio: action.payload.aspectRatio,scale:action.payload.scale};

      state.stage.width(+action.payload.width);
      state.stage.height(+action.payload.height);
      state.stage.scale({x:+action.payload.scale , y:+action.payload.scale});
    },
    setPdfTotalPage: (state,action)=>{
      state.pdfPages.total = action.payload;
    },
    setPdfNowPage: (state,action)=>{
      state.pdfPages.now = action.payload;
    },

    /*
    * when the user click on next button then the current page will be incremented
    * and the next page will be loaded
    */ 
    pdfNextPage: (state)=>{      

      handlePdfPage(state,()=>{
        state.pdfPages.now++;
      })

    },

    /*
    * when the user click on prev previous then the current page will be decremented
    * and the previous page will be loaded
    */ 
    pdfPrevPage: (state)=>{

      handlePdfPage(state,()=>{ 
        state.pdfPages.now--;
      })

    },
    pdfSetPage: (state,action)=>{
      handlePdfPage(state,()=>{
        state.pdfPages.now = action.payload;
      })
    },
  }
})

export const {
  createStage,
  addToLayer,
  updateSize,
  setPdfTotalPage,
  setPdfNowPage,
  pdfNextPage,
  pdfPrevPage,
  addImage,
  pdfSetPage} = slice.actions;

export default slice.reducer;