let colorClass = ['red', 'yellow', 'green', 'blue', 'gray'];
let scrollEventList = [scrollReset, heightLightEvent, adventureEvent, greatStory, scrollReset];  //詳細內容再後面追加

// 畫出原始canvas狀態
function canvasDraw (canvas, str, imgSrc =false){
  let width   = canvas.offsetWidth;
  let height  = canvas.offsetHeight;
  canvas.width = width;
  canvas.height = height;
  let ctx     = canvas.getContext("2d");
  if(imgSrc){
    let img = new Image();
    img.src = imgSrc;
    img.addEventListener('load', function(e){
      ctx.drawImage(img, 0, 0, width, height);
      fillText();
    })
  }else{
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);
    fillText();
  }
  function fillText (){
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.font = 'bold 180px Tahoma';
    ctx.fillStyle = '#fa0';
    ctx.textAlign = 'center';
    ctx.fillText(str, width / 2, height / 2);
    ctx.closePath();
  }
  return ctx;
}


$(function () {
  // 處理navitem並獲取位置

  let section = $('.section');
  let sectionPosition = [];
  let sectionHeight = $(section).height();

  //上方為用到的變數
  $('.navbar_list').height(section.length * 20 + 'px');
  $(section).each(function (index, element) {
    console.log(element);
    sectionPosition.push($(element).offset().top);
    $('#navbar_list')
      .append('<li class="nvbar_item '
        + (index === 0 ? 'active ' : ' ')
        + colorClass[index]
        + '"><span class="navbar_dot left_dot"></span><span class="navbar_dot right_dot"></span>'
        + $(element).attr('data-title')
        + '</li>');
  })
  sectionPosition.push($(section).last().offset().top + sectionHeight);
  console.log(sectionPosition);

  
  // 處理滾輪事件

  let nowSection = 0;
  let navItem = $('.nvbar_item');
  let scrollTop = 0;

  //上方為這邊用到的變數
  $(window).scroll(function () {
    scrollTop = $(window).scrollTop();
    scrollTop = scrollTop + 200;
    if (scrollTop < sectionPosition[nowSection + 1] && scrollTop > sectionPosition[nowSection]) {
      // console.log('沒事');
    } else {
      checkNowSection(scrollTop);
    }
  })
  function checkNowSection(scrollNow) {
    // 用來判斷目前在section的第幾個位置
    for (let i = 1; i <= sectionPosition.length; i++) {
      if (scrollNow < sectionPosition[i]) {
        nowSection = i - 1;
        // console.log(scrollNow, sectionPosition[i], '沒有進來嗎?');
        break;
      }
    }
    if(nowSection == 0){
      // console.log('remover', nowSection);
      $('#topButton').removeClass('active');
    }else{
      // $('#top').addClass('active');
      document.getElementById('topButton').className = 'active';
      // console.log('addddd', nowSection);
    }
    // console.log(scrollNow, nowSection);
    scrollEventList[nowSection](nowSection); //觸發對應section動畫事件;
    $(navItem)
      .eq(nowSection)
      .addClass('active')
      .siblings('.active')
      .removeClass('active');
    $(section)
      .eq(nowSection)
      .addClass('active')
      .siblings('section.active')
      .removeClass('active');
  }
  // 滾輪事件完成

  //處理點擊nav_item事件

  // 移動滾輪
  function moveScroll(num){
    $('html, body').stop().animate({ scrollTop: num });
  }

  // 利用navbar_list冒泡事件處理右邊按鈕的事件
  $('.navbar_list').click(function (e) {
    let index = $(e.target).index();
    moveScroll(sectionPosition[index])
    // console.log()
  })
  // toTop , mh... toTOP
  $('#topButton').click(function(e){
    moveScroll(0);
  })

  // 為每個canvas增加對應事件
  let canvasBrave = document.getElementById('canvasBrave');
  canvasDraw(canvasBrave, 'Be Brave');
  let canvasAdventure = document.getElementById('canvasAdventure');
  let ctxAdventure = canvasDraw(canvasAdventure, 'To Adventure', 'img/adventure.jpg');
  canvasAdventure.addEventListener('mousemove', function (e) {
    ctxAdventure.beginPath();
    // console.log(e.pageY, e.pageX);
    ctxAdventure.fillStyle = '#fa0';
    // canvas.fillRect(x座標,y座標,寬度,高度);
    ctxAdventure.arc(e.pageX, e.pageY - sectionPosition[2], 100, 0, Math.PI * 2, false);
    ctxAdventure.fill();
    ctxAdventure.closePath();
    ctxAdventure.globalCompositeOperation = "destination-out";
  })
})


// 冒險故事決定用滑鼠劃開
