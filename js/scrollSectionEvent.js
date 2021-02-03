var canvasTime;
var canvasTimeOur;

// 將canvas畫回去
function resetEvent(nowSection) {
  resetBrave();
  resetAdventure();
}
function resetAdventure() {
  let canvasAdventure = document.getElementById('canvasAdventure');
  canvasDraw(canvasAdventure, 'To Adventure', 'img/adventure.jpg');
  clearInterval(svgTime);

}
function resetBrave() {
  let canvasBrave = document.getElementById('canvasBrave');
  canvasDraw(canvasBrave, 'Be Brave');
  clearInterval(canvasTime);
  clearTimeout(canvasTimeOur);
  clearInterval(svgTime);
}

// 那個section沒有自己的事件也沒有需要重置canvas
let scrollStop = function (nowSection) {
}

// 那個section需要重置canvas但沒有自己的專屬事件
let scrollReset = function (nowSection) {
  resetEvent(nowSection);
}

// 播放劃開畫面的那個圈圈
let heightLightEvent = function (nowSection) {
  // console.log('觸發')
  let canvas = document.getElementById('canvasBrave');
  let ctx = canvas.getContext("2d");
  let width = canvas.offsetWidth;
  let height = canvas.offsetHeight;
  let xAsix = 0; //  width + 150 ~ width - 150 
  let yAsix = 0; //  height + 150 ! height -150 loop * 2
  canvasTime = setInterval(() => {
    ctx.beginPath();
    ctx.fillStyle = '#fa0';
    // canvas.fillRect(x座標,y座標,寬度,高度);
    ctx.arc(width - xAsix - 75, yAsix, 150, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
    ctx.globalCompositeOperation = "destination-out";
    xAsix += width / 200;
    yAsix += height / 200;
  }, 10);
  canvasTimeOur = setTimeout(() => {
    clearInterval(canvasTime);
    clearTimeout(canvasTimeOur);
  }, 2000);
  resetAdventure();
}

let adventureEvent = function (nowSection) {
  resetBrave();
}

let greatStory = function(nowSection){
  svgTime = setInterval(() => {
    AnimateOffset();
  }, 66);
}





// 將畫面計算好屬性畫回畫面上
const filterFeImage = document.querySelector("#f feImage");
const xlink = "http://www.w3.org/1999/xlink";
let story = document.getElementsByClassName('story')[0];
let story_svg = document.getElementById('great_story_svg');
let width = story.offsetWidth;
let height = story.offsetHeight;
let svgTime;
story_svg.innerHTML = '<g id="svgandg" filter="url(#f)"><image id="Darwin" xmlns:xlink="http://www.w3.org/1999/xlink"xlink:href="img/story.jpg" width="' + width + '" height="' + height + '"></image><text id="text" text-anchor="middle" x="' + (width / 2) + '" y="' + (height / 2) + '" style="font-size:180px;font-weight:900;text-align:center;text-anchor: middle;" fill="#000">Great Story</text></g>';

// 起始狀態和速度
let displacement = 0;
let speed = 0.2;
function setXlinkHref() {
  // 這公式...網路上找的= =
  let xlinkHref =
    "data:image/svg+xml;utf8,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='" + width + "' height='" + height + "'%3E%3Cdefs%3E%3CradialGradient id='rg' r='.9'%3E";
  for (var i = 0; i < 11; i++) {
    // 這個是話漸層色
    // offset='${(i - 2) * 20 + displacement * 2}%25'  可以控制每一個波的波長
    xlinkHref += `%3Cstop 
            offset='${(i - 2) * 20 + displacement * 2}%25' 
            stop%2Dcolor='%23${i % 2 == 0 ? "f00" : "000"}'%3E%3C/stop%3E`;
  }

  xlinkHref +=
    "%3C/radialGradient%3E%3C/defs%3E%3Crect id='witness' width='" + width + "' height='" + height + "' fill='url(%23rg)'%3E%3C/rect%3E%3C/svg%3E";

  return xlinkHref;
}
function AnimateOffset() {
  let xlinkHref = setXlinkHref();
  filterFeImage.setAttributeNS(xlink, "href", xlinkHref);
  if (displacement <= 20) {
    displacement += speed;
  } else {
    displacement = 0;
  }
}