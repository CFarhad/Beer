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

    this.mainStage.add(this.mainLayer);
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

    const tr = new Konva.Transformer({
      nodes: [image],
      boundBoxFunc: (oldBox, newBox) => {
        if (newBox.width < 10 || newBox.height < 10) {
          return oldBox;
        }
        return newBox;
      },
    });

    this.mainLayer.add(tr);

  }
}
