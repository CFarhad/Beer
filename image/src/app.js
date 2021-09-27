class Editor {
  constructor({filename, board ,zoomInElm,zoomOutElm ,imageElm , signElm , stampElm , saveElm}){
    [this.filename, this.board, this.zoomIn , this.zoomOut , this.image,this.sign , this.stamp , this.save] = [filename , board,zoomInElm,zoomOutElm ,imageElm , signElm , stampElm , saveElm]
    this.render(this.board)
  }
  render(e){
    console.log(e);
  }
}

