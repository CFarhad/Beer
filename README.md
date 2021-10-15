<h1 align="center">
  <img src="https://user-images.githubusercontent.com/44419462/136058513-1415f408-4032-4bbb-8d69-077330f60cb8.png" width="400" height="200" />

</h1>

<h3 align="center">
  Beer is a website from svelte js for editing documents and photos with hot features.
</h3>

<br>


# 🍨 features
- image [png,svg,jpg,webp]
- sign
- zoom in & zoom out
- save document
- stamp

<br>

# 🍟 Usage
## Install the dependencies...
```bash
cd Beer
npm install
```


## then start Rullup
```bash
npm run dev
```
<br>

Navigate to [localhost:9000](http://localhost:9000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.


<br>

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

## Run project on server
You must delete the `/` character in the `index.html` file from behind the path

from
```html
<link rel='icon' type='image/png' href='/favicon.png'>
<link rel='stylesheet' href='global.css'>
<link rel='stylesheet' href='/build/bundle.css'>

<script defer src='/build/bundle.js'></script>
```
to
```html
<link rel='icon' type='image/png' href='/favicon.png'>
<link rel='stylesheet' href='global.css'>
<link rel='stylesheet' href='build/bundle.css'>

<script defer src='build/bundle.js'></script>
```
