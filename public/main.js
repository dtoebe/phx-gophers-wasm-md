if (!WebAssembly.instantiateStreaming) {
  // polyfill
  WebAssembly.instantiateStreaming = async (resp, importObject) => {
    const source = await (await resp).arrayBuffer();
    return await WebAssembly.instantiate(source, importObject);
  };
}

let editor = document.getElementById('editor');
let htmlOut = document.getElementById('htmlout');

const go = new Go();
let mod, inst;

WebAssembly.instantiateStreaming(
  fetch('./wasm/lib.wasm'),
  go.importObject,
).then(async result => {
  mod = result.module;
  inst = result.instance;
  await go.run(inst);
});

editor.addEventListener(
  'input',
  () => {
    console.log(editor.value);
    updateMD(editor.value, "htmlout");
  },
  false,
);


