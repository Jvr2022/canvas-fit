import size from 'element-size';

const fit = (canvas, parent, scale = 1) => {
  const isSVG = canvas.nodeName.toUpperCase() === 'SVG';

  canvas.style.position = canvas.style.position || 'absolute';
  canvas.style.top = 0;
  canvas.style.left = 0;

  const resize = () => {
    const p = parent || canvas.parentNode;
    const scratch = new Float32Array(2);

    let width, height;

    if (typeof p === 'function') {
      const [w, h] = p(scratch) || scratch;
      width = w;
      height = h;
    } else if (p && p !== document.body) {
      const [w, h] = size(p);
      width = w|0;
      height = h|0;
    } else {
      width = window.innerWidth;
      height = window.innerHeight;
    }

    if (isSVG) {
      canvas.setAttribute('width', `${width * scale}px`);
      canvas.setAttribute('height', `${height * scale}px`);
    } else {
      canvas.width = width * scale;
      canvas.height = height * scale;
    }

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    return resize;
  };

  return resize();
};

export default fit;
