if (!WebAssembly.instantiateStreaming) {
  // polyfill
  WebAssembly.instantiateStreaming = async (resp, importObject) => {
    const source = await (await resp).arrayBuffer();
    return await WebAssembly.instantiate(source, importObject);
  };
}

let editor = document.getElementById('editor');
let htmlOut = document.getElementById('htmlout');

editor.value = '# Hello Phoenix Gophers';

const go = new Go();
let mod, inst;

WebAssembly.instantiateStreaming(fetch('./wasm/lib.wasm'), go.importObject)
  .then(result => {
    return WebAssembly.instantiate(result.module, go.importObject);
  })
  .then(instance => {
    go.run(instance);
    editor.addEventListener(
      'input',
      () => {
        console.log(editor.value);
        updateMD(editor.value, 'htmlout');
      },
      false,
    );
    updateMD(editor.value, 'htmlout');
  });
