
import Config from './config'
import {Sign} from './extra'


const Beer =  function ({main,url,signMain,tools}){
  Object.assign(
    this,
    new Config(main,url),
    new Sign(signMain,tools)
  )
}

Beer.prototype = {
  exportSign: Sign.prototype.exportSign,
  addImage: Config.prototype.addImage
}

export default Beer