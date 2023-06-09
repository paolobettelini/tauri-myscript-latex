import iink from "iink-js";

const editorElement = document.getElementById('editor');
const resultRenderElement = document.getElementById('result');
const resultLatexElement = document.getElementById('result-latex');
const undoElement = document.getElementById('undo');
const redoElement = document.getElementById('redo');
const clearElement = document.getElementById('clear');
const convertElement = document.getElementById('convert');
const copyElement = document.getElementById('copy-latex');

var latex = '';

editorElement.addEventListener('changed', (event) => {
  undoElement.disabled = !event.detail.canUndo;
  redoElement.disabled = !event.detail.canRedo;
  clearElement.disabled = event.detail.isEmpty;
});

function cleanLatex(latexExport) {
  if (latexExport.includes('\\\\')) {
    const steps = '\\begin{align*}' + latexExport + '\\end{align*}';
    return steps.replace("\\begin{aligned}", "")
      .replace("\\end{aligned}", "")
      .replace(new RegExp("(align.{1})", "g"), "aligned");
  }
  return latexExport
    .replace(new RegExp("(align.{1})", "g"), "aligned");
}

editorElement.addEventListener('exported', (evt) => {
  const exports = evt.detail.exports;
  if (exports && exports['application/x-latex']) {
      latex = cleanLatex(exports['application/x-latex']);
      resultLatexElement.innerHTML = latex;
      katex.render(latex, resultRenderElement);
      convertElement.disabled = false;
      copyElement.disabled = false;
  }
  else {
    convertElement.disabled = true;
    copyElement.disabled = true;
    resultRenderElement.innerHTML = '';
    resultLatexElement.innerHTML = '';
    latex = '';
  }
});
undoElement.addEventListener('click', () => {
  editorElement.editor.undo();
});
redoElement.addEventListener('click', () => {
  editorElement.editor.redo();
});
clearElement.addEventListener('click', () => {
  editorElement.editor.clear();
});
copyElement.addEventListener('click', () => {
  if (latex != '') {
      navigator.clipboard.writeText(latex);
  }
});
convertElement.addEventListener('click', () => {
  editorElement.editor.convert();
});

document.onkeydown = event => {
  if (event.ctrlKey && event.key === 'z') {
      // Handle Ctrl+Z event
      editorElement.editor.undo();
      event.preventDefault();
    }

    if (event.ctrlKey && event.key === 'y') {
      // Handle Ctrl+y event
      editorElement.editor.redo();
      event.preventDefault();
    }
  }

/**
 * Attach an editor to the document
 * @param {Element} The DOM element to attach the ink paper
 * @param {Object} The recognition parameters
 */
iink.register(editorElement, {
  recognitionParams: {
    type: 'MATH',
    protocol: 'WEBSOCKET',
    server: {
      scheme: 'https',
      host: 'webdemoapi.myscript.com',
      applicationKey: 'cc9afbaa-7736-40b1-9b04-4499caed1754',
      hmacKey: '1771af82-7504-43fe-b057-606efc46d98d'
    },
    iink: {
      math: {
        mimeTypes: ['application/x-latex', 'application/vnd.myscript.jiix', 'application/mathml+xml']
      },
      export: {
        jiix: {
          strokes: true
        }
      }
    }
  }
});

window.addEventListener('resize', () => {
  editorElement.editor.resize();
});