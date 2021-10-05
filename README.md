<h1 align="center">
  <img src="https://user-images.githubusercontent.com/44419462/136058513-1415f408-4032-4bbb-8d69-077330f60cb8.png" width="400" height="200" />

</h1>

<h3 align="center">
  Beer is a JavaScript library for editing documents and photos that has hot features
</h3>

<br>


# 🍨 features
- image [png,svg,jpg]
- sign
- zoom in & zoom out
- save document
- stamp

<br>

# 🍟 Usage
```
var editor = new Beer(option);
```
<br>

# 🍫 Events
To use these events, you must first create a beer object and then use it

Event | Description | Arguments
------|-------------|----------
exportSign | The signature is exported as DataURL | No argument
addImage | Add photos to workspace | `DataURL`

<br>

# ☕ Options
```javascript
const editor = new Beer({

  // workspace elment id
  main: "#main",
  
  //document or image address
  url: "https://picsum.photos/300/200",

  // signature board element
  signMain: ".container .box #board", 

  //Select element for brush and eraser
  tools: "#signTools select"
})
```