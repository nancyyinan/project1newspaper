// 选取原内容和镜头相关元素
const original = document.getElementById("originalContent");
const lens = document.getElementById("lens");
const magnifiedWrapper = document.getElementById("magnifiedWrapper");
const magnifiedContent = document.getElementById("magnifiedContent");

// 1. 把 originalContent 的内部HTML复制到 magnifiedContent 中
magnifiedContent.innerHTML = original.innerHTML;

// 2. 设置放大倍数
const scale = 2; // 放大2倍可自行调整
// 设定镜头半径(就是宽高的一半)
const lensRadius = lens.offsetWidth / 2;

// 3. 监听鼠标移动，在镜头中显示放大局部
document.addEventListener("mousemove", (e) => {
  // （A）先把镜头本身移动到鼠标位置，让它中心对准鼠标
  let left = e.pageX - lensRadius;
  let top = e.pageY - lensRadius;
  lens.style.left = left + "px";
  lens.style.top = top + "px";

  // （B）计算镜头里要显示的对应原文位置
  //     需要考虑元素在页面中的相对偏移
  const rect = original.getBoundingClientRect();

  // originalContent 左上角在文档中的坐标
  const offsetX = rect.left + window.scrollX;
  const offsetY = rect.top + window.scrollY;

  // mouse 相对于原内容左上角的坐标
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

  // 应用到包装器：
  magnifiedWrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
});
