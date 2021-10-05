import Konva from 'konva';

let lastLine;
let image = [];

export class Sign {
  constructor(signMain, tools) {
    this.signMain = signMain;
    this.tools = tools;

    this.signStage = new Konva.Stage({
      container: this.signMain,
      width: 450,
      height: 250,
    });
    this.signLayer = new Konva.Layer();

    this.signStage.add(this.signLayer);

    this.#draw();
  }
  s;

  #draw() {
    var isPaint = false;
    var mode = 'brush';

    this.signStage.on('mousedown touchstart',  (e)=> {
      isPaint = true;
      var pos = this.signStage.getPointerPosition();
      lastLine = new Konva.Line({
        stroke: '#df4b26',
        strokeWidth: mode === 'brush' ? 5 : 30,
        globalCompositeOperation:
          mode === 'brush' ? 'source-over' : 'destination-out',
        // round cap for smoother lines
        lineCap: 'round',
        // add point twice, so we have some drawings even on a simple click
        points: [pos.x, pos.y, pos.x, pos.y],
      });
      this.signLayer.add(lastLine);
    });

    this.signStage.on('mouseup touchend',  ()=> {
      isPaint = false;
    });

    // and core  - drawing
    this.signStage.on('mousemove touchmove',  (e)=> {
      if (!isPaint) {
        return;
      }

      // prevent scrolling on touch devices
      e.evt.preventDefault();

      const pos = this.signStage.getPointerPosition();
      var newPoints = lastLine.points().concat([pos.x, pos.y]);
      lastLine.points(newPoints);
    });

    var select = document.querySelector(this.tools)
    select.addEventListener('change',  ()=> {
      mode = select.value;
    });
  }
  exportSign() {
    return lastLine.toDataURL({
      mimeType: 'image/png',
      quality: 1,
    });
  }
}
