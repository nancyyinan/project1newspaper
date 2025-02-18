// 选取原内容和镜头相关元素
const original = document.getElementById("originalContent");
const lens = document.getElementById("lens");
const magnifiedWrapper = document.getElementById("magnifiedWrapper");
const magnifiedContent = document.getElementById("magnifiedContent");

// 选取 main-content，只有在这里面时才显示放大镜
const mainContent = document.querySelector(".main-content");

// 1. 把 originalContent 的内部HTML复制到 magnifiedContent 中
magnifiedContent.innerHTML = original.innerHTML;

// 2. 设置放大倍数
const scale = 2; // 放大2倍可自行调整

// 设定镜头半径(就是宽高的一半)
const lensRadius = lens.offsetWidth / 2;

// 3. 当鼠标进入/离开 main-content 时，显示/隐藏镜头
mainContent.addEventListener("mouseenter", () => {
  lens.style.display = "block";
});
mainContent.addEventListener("mouseleave", () => {
  lens.style.display = "none";
});

// 4. 只有在 main-content 内部移动时，才执行放大逻辑
mainContent.addEventListener("mousemove", handleMagnify);

function handleMagnify(e) {
  // （A）让镜头中心跟随鼠标
  const left = e.pageX - lensRadius;
  const top = e.pageY - lensRadius;
  lens.style.left = left + "px";
  lens.style.top = top + "px";

  // （B）计算鼠标在 originalContent 内部的坐标
  const rect = original.getBoundingClientRect();

  // originalContent 左上角在文档中的坐标
  const offsetX = rect.left + window.scrollX;
  const offsetY = rect.top + window.scrollY;

  // 鼠标相对于 originalContent 左上角的坐标
  const posX = e.pageX - offsetX;
  const posY = e.pageY - offsetY;

  /*
   * 让鼠标所在点 (posX, posY) 在放大后，正好位于镜头圆心。
   * 因为 .magnified 会 transform: scale(scale)，
   * 所以放大后该点坐标变成 (posX * scale, posY * scale)。
   * 要让它在镜头圆心，需 translate() 让此点位移到 (lensRadius, lensRadius)。
   *
   * 即： translateX = lensRadius - posX * scale
   *      translateY = lensRadius - posY * scale
   */
  const translateX = lensRadius - posX * scale;
  const translateY = lensRadius - posY * scale;

  // （C）通过 transform 移动 + 缩放 .magnified
  magnifiedWrapper.style.transform = `
    translate(${translateX}px, ${translateY}px) scale(${scale})
  `;
}
