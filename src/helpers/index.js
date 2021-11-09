// generate hash 
export let createHash = ()=>{
  let lenght = 8;
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < lenght; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  } 
  return result;
}

// handle pdf page and state
export let handlePdfPage = (state,callBack)=>{
  let nowLayerJson = state.layer.toJSON();
  // find now pdf page number in state all layer 
  let nowPage = state.pdfPages.now;
  let nowPageIndex = state.allLayer.findIndex(item=>item.page === nowPage);
  if(nowPageIndex !== -1){
    state.allLayer[nowPageIndex].layerJson = nowLayerJson;
  }
  else{
    state.allLayer.push({page:nowPage,layerJson:nowLayerJson});
  } 

  // pdf page number will be incremented
  callBack();
  
  // if now page in all layer then get layerJson and destroy it on stage and create new layer
  let nowPageIndexInAllLayer = state.allLayer.findIndex(item=>item.page === state.pdfPages.now);
  if(nowPageIndexInAllLayer !== -1){
    let nowLayerJson = state.allLayer[nowPageIndexInAllLayer].layerJson;
    state.layer.destroy();
    state.layer = Konva.Node.create(nowLayerJson);
    state.layer.draw();
    state.stage.add(state.layer);
    

    /**
     * select images by name in layer and and find it in allImages by name
     * if any image was clicked then add it to transformer
     */
    let image = state.layer.find('Image');
    image.forEach(item=>{
      let index = state.allImages.findIndex(image=>image.name === item.name());
      if(index !== -1){
        item.image(new Image());
        item.image().src = state.allImages[index].src;
        // when image was clicked then add it to transformer
        item.on('click',  (e) => {
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
  
        // when image transform moving to Top
        item.on('transform', (e) => {
          e.target.moveToTop();
        });
  
      }
    })

  }
  else{
    state.layer.destroy();
    state.layer = new Konva.Layer();
    state.layer.draw();
    state.stage.add(state.layer);
    state.transformer = new Konva.Transformer({
      padding: 14,
      borderStrokeWidth: 1,
      anchorSize: 13,
      rotateAnchorOffset: 25,
      anchorFill: '#6366F1',
      anchorStroke: '#4338CA',
      anchorStrokeWidth: 2,
      anchorCornerRadius: 100,
    }),
    state.layer.add(state.transformer);

  }

}

// dataURL to blob
export function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});
  return blob;

}