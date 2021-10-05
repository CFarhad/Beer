

let myEditor = new Beer({
  main: "mainBoard",
  signMain:"signBoard",
  tools: "#signTools select"
});

let exportSignature = document.getElementById("exportSignature");
exportSignature.addEventListener("click",()=>{
  let sign = myEditor.exportSign();
  myEditor.addImage(sign)
})
