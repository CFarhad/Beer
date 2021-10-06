import Konva from 'konva';

export default class Config {
  constructor(main, url) {
    [this.main, this.url] = [main, url];

    this.mainStage = new Konva.Stage({
      container: this.main,
      width: 600,
      height: 400,
    });

    this.mainLayer = new Konva.Layer();
    this.transformer = new Konva.Transformer({
      padding: 14,
      borderStrokeWidth: 1,
      anchorSize: 13,
      rotateAnchorOffset: 25,
      anchorFill: "#0d6efd",
      anchorStroke: "#093473",
      anchorStrokeWidth: 2,
      anchorCornerRadius: 100
    })
    this.mainLayer.add(this.transformer)
    this.mainStage.add(this.mainLayer);
  }

  
  setTransformer(item){
    this.transformer.nodes([item])
    this.transformer.moveToTop();
    this.mainStage.on("click",(e)=>{
      if(e.target === this.mainStage){
        this.transformer.nodes([]);
      }
    })
  }

  addImage(src) {

    let newImage = new Image();
    newImage.src = src;

    let image = new Konva.Image({
      image: newImage,
      x: 80,
      y: 100,
      name: 'image',
      draggable: true,
    });
    this.mainLayer.add(image);

    image.on("click",(e)=>{
      this.setTransformer(image)
    })

    image.on("dragstart",function(){
      this.moveToTop();
    })

  }
}
