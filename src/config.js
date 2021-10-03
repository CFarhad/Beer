import Konva from "konva";
import {Sign} from './extra/sign'

export class config {
  constructor(option = {}) {
    [this.main,this.signBoard , this.url] = [
      option.main,
      option.signBoard,
      option.url
    ];
    this.stage = null;
    this.layer = new Konva.Layer();

    this.render()
  }

  render(){
    this.#MainCanvas()
    new Sign(this.signBoard).render()
  }
  
  #MainCanvas(){
    return new Promise(resolve=>{
      this.stage = new Konva.Stage({
        container: this.main,
        width: 600,
        height: 400,
      })
      if(this.stage !== null){
        resolve()
      }
    })
  }
}
