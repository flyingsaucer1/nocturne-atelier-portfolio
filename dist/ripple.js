// Refract the painted landscape itself when a cursor or finger touches it.
(() => {
  const hero = document.querySelector('.hero');
  const stage = document.querySelector('.hero-scene');
  if (!hero || !stage) return;

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const canvas = document.createElement('canvas');
  canvas.className = 'painting-ripple';
  canvas.setAttribute('aria-hidden', 'true');
  const gl = canvas.getContext('webgl', {alpha: false, antialias: false, powerPreference: 'high-performance'});
  if (!gl) return;

  const vertexSource = `
    attribute vec2 aPosition;
    varying vec2 vUv;
    void main() {
      vUv = (aPosition + 1.0) * 0.5;
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `;
  const fragmentSource = `
    precision mediump float;
    varying vec2 vUv;
    uniform sampler2D uPainting;
    uniform vec2 uStage;
    uniform vec4 uCover;
    uniform vec4 uRipples[5];
    uniform int uRippleCount;
    uniform float uTime;

    void main() {
      vec2 pixel = vec2(vUv.x * uStage.x, (1.0 - vUv.y) * uStage.y);
      vec2 paintingUv = vec2(
        (pixel.x + uCover.x) / uCover.z,
        1.0 - (pixel.y + uCover.y) / uCover.w
      );
      float aspect = uStage.x / uStage.y;
      vec2 refraction = vec2(0.0);
      float light = 0.0;

      for (int i = 0; i < 5; i++) {
        if (i >= uRippleCount) break;
        float age = uTime - uRipples[i].z;
        if (age < 0.0 || age > 2.5) continue;
        vec2 delta = (vUv - uRipples[i].xy) * vec2(aspect, 1.0);
        float distanceFromDrop = length(delta);
        float front = distanceFromDrop - age * 0.30;
        float width = 0.048 + age * 0.006;
        float fade = exp(-age * 0.7) * (1.0 - smoothstep(1.6, 2.5, age));
        float envelope = exp(-pow(front / width, 2.0)) * fade * uRipples[i].w;
        float wave = sin(front * 185.0) * envelope;
        vec2 direction = delta / max(distanceFromDrop, 0.0001);
        refraction += direction * wave * 0.006 * uStage.y / uCover.zw;
        light += cos(front * 185.0) * envelope * 0.06;
      }

      vec3 color = texture2D(uPainting, paintingUv + refraction).rgb;
      color += light * vec3(0.55, 0.73, 1.0);
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  function shader(type, source) {
    const item = gl.createShader(type);
    gl.shaderSource(item, source);
    gl.compileShader(item);
    if (!gl.getShaderParameter(item, gl.COMPILE_STATUS)) return null;
    return item;
  }
  const vertex = shader(gl.VERTEX_SHADER, vertexSource);
  const fragment = shader(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertex || !fragment) return;
  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1
  ]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'aPosition');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const uniforms = {
    stage: gl.getUniformLocation(program, 'uStage'),
    cover: gl.getUniformLocation(program, 'uCover'),
    ripples: gl.getUniformLocation(program, 'uRipples[0]'),
    count: gl.getUniformLocation(program, 'uRippleCount'),
    time: gl.getUniformLocation(program, 'uTime')
  };
  gl.uniform1i(gl.getUniformLocation(program, 'uPainting'), 0);

  let ready = false;
  let width = 0;
  let height = 0;
  let frameId = 0;
  let lastDrop = 0;
  let lastX = -100;
  let lastY = -100;
  let visible = true;
  const ripples = [];
  const image = new Image();
  image.src = 'assets/nocturne-road.jpg';

  function active() {
    return ready && visible && !document.hidden && !reducedMotion.matches &&
      !document.body.classList.contains('motion-paused');
  }

  function draw(now) {
    if (!ready || !width || !height) return;
    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
    const drawnWidth = image.naturalWidth * scale;
    const drawnHeight = image.naturalHeight * scale;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uniforms.stage, width, height);
    gl.uniform4f(uniforms.cover, (drawnWidth - width) * 0.56, (drawnHeight - height) * 0.5, drawnWidth, drawnHeight);
    const values = new Float32Array(20);
    const shown = active() ? ripples : [];
    shown.forEach((ripple, index) => values.set([ripple.x, ripple.y, ripple.born / 1000, ripple.strength], index * 4));
    gl.uniform4fv(uniforms.ripples, values);
    gl.uniform1i(uniforms.count, shown.length);
    gl.uniform1f(uniforms.time, now / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  function tick(now) {
    frameId = 0;
    while (ripples.length && now - ripples[0].born > 2500) ripples.shift();
    draw(now);
    if (ripples.length && active()) frameId = requestAnimationFrame(tick);
  }

  function resize() {
    width = stage.clientWidth;
    height = stage.clientHeight;
    const pixelRatio = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.max(1, Math.round(width * pixelRatio));
    canvas.height = Math.max(1, Math.round(height * pixelRatio));
    draw(performance.now());
  }

  function addRipple(event) {
    if (!active()) return;
    const rect = stage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (x < 0 || y < 0 || x > width || y > height) return;
    const now = performance.now();
    if (event.type !== 'pointerdown' &&
      (now - lastDrop < 170 || Math.hypot(x - lastX, y - lastY) < 34)) return;
    ripples.push({x: x / width, y: 1 - y / height, born: now, strength: event.type === 'pointerdown' ? 1.15 : 1});
    if (ripples.length > 5) ripples.shift();
    lastDrop = now;
    lastX = x;
    lastY = y;
    if (!frameId) frameId = requestAnimationFrame(tick);
  }

  function sync() {
    if (!active()) {
      cancelAnimationFrame(frameId);
      frameId = 0;
      ripples.length = 0;
      draw(performance.now());
    }
  }

  image.addEventListener('load', () => {
    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    ready = true;
    stage.append(canvas);
    resize();
  }, {once: true});
  hero.addEventListener('pointermove', addRipple, {passive: true});
  hero.addEventListener('pointerdown', addRipple, {passive: true});
  window.addEventListener('scene-motion-change', sync);
  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener('change', sync);
  new ResizeObserver(resize).observe(stage);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      sync();
    }).observe(hero);
  }
})();
