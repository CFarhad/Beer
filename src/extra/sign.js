

export class Sign{
  constructor(board){
    this.board = board;
    this.stage = null;
    this.layer = new Konva.Layer();
    console.log(this.board);
    this.render();
  }
  render(){
    this.#signBoard();
  }
  #signBoard(){
    this.stage = new Konva.Stage({
      container: this.board,
      width: 450,
      height: 200,
    });
  }
}