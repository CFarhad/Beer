import Konva from 'konva';


export class Sign {
  constructor(signMain, tools) {
    this.signMain = signMain;
    this.tools = tools;

    this.signStage = new Konva.Stage({
      container: this.signMain,
      width: 450,
      height: 250,
    });
    this.signStage.container().style.border = "1px dashed #9CA3AF"
    this.signLayer = new Konva.Layer();
    this.crop = {
      xStart:0,
      yStart:0,
      xEnd:0,
      yEnd:0,
    }

    this.signStage.add(this.signLayer);

    this.#draw();
  }

  #draw() {
    var canvas = document.createElement('canvas');
    canvas.width = this.signStage.width();
    canvas.height = this.signStage.height();

    // created canvas we can add to layer as "Konva.Image" element
    var image = new Konva.Image({
      image: canvas,
      x: 0,
      y: 0,
    });
    this.signLayer.add(image);

    // Good. Now we need to get access to context element
    var context = canvas.getContext('2d');
    context.strokeStyle = '#df4b26';
    context.lineJoin = 'round';
    context.lineWidth = 5;

    var isPaint = false;
    var lastPointerPosition;
    var mode = 'brush';

    // now we need to bind some events
    // we need to start drawing on mousedown
    // and stop drawing on mouseup
    image.on('mousedown touchstart', () => {
      isPaint = true;
      lastPointerPosition = this.signStage.getPointerPosition();
    });

    // will it be better to listen move/end events on the window?

    this.signStage.on('mouseup touchend', () => {
      isPaint = false;
    });

    // and core function - drawing
    this.signStage.on('mousemove touchmove', () => {
      if (!isPaint) {
        return;
      }

      if (mode === 'brush') {
        context.globalCompositeOperation = 'source-over';
      }
      if (mode === 'eraser') {
        context.globalCompositeOperation = 'destination-out';
      }
      context.beginPath();

      var localPos = {
        x: lastPointerPosition.x - image.x(),
        y: lastPointerPosition.y - image.y(),
      };
      context.moveTo(localPos.x, localPos.y);
      var pos = this.signStage.getPointerPosition();
      localPos = {
        x: pos.x - image.x(),
        y: pos.y - image.y(),
      };
      context.lineTo(localPos.x, localPos.y);
      context.closePath();
      context.stroke();

      lastPointerPosition = pos;
      // redraw manually
      this.signStage.batchDraw();
    });

    var select = document.querySelector(this.tools);
    if(select){
      select.addEventListener('change', () => {
        mode = select.value;
      });
    }
  }
  exportSign() {
    return this.signLayer.toDataURL({
      mimeType: 'image/png',
      quality: 1,
    });
  }
}
