//找到url中匹配的字符串
function findInUrl(str){
	url = location.href;
	return url.indexOf(str) == -1 ? false : true;
}
//获取url参数
function queryString(key){
    return (document.location.search.match(new RegExp("(?:^\\?|&)"+key+"=(.*?)(?=&|$)"))||['',null])[1];
}

//产生指定范围的随机数
function randomNumb(minNumb,maxNumb){
	var rn=Math.round(Math.random()*(maxNumb-minNumb)+minNumb);
	return rn;
	}
	
var wHeight;
$(document).ready(function(){
	window.addEventListener('touchmove', function (e) { e.preventDefault();e.stopPropagation(); }, false);
	
	wHeight=$(window).height();
	if(wHeight<832){
		wHeight=832;
		}
	$('.page').height(wHeight);
	$('.h832').css('padding-top',(wHeight-832)/2+'px');
	});
	
//监听手机摇动事件
function addShake(){
	if (window.DeviceMotionEvent) {
		window.addEventListener('devicemotion', deviceMotionHandler, false);
		} else {
			alert('你的设备不支持DeviceMotion事件');
			goPage2b();
			}
	}
 var SHAKE_THRESHOLD = 2000;
 var last_update = 0;
 var x = y = z = last_x = last_y = last_z = 0;
 //摇一摇开关
 var canShake = true;
  
 function deviceMotionHandler(eventData) {
     var acceleration = eventData.accelerationIncludingGravity;
     var curTime = new Date().getTime();
 
    //100ms监听一次，拒绝重复监听
    if ((curTime - last_update) > 100 && canShake) { 
        var diffTime = curTime - last_update;
        last_update = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
        if (speed > SHAKE_THRESHOLD) { 
            canShake=false;
			goPage2b();
            };
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
	
function indexAct(){
	$('.indexImg1b').fadeIn(1000);
	setTimeout(function(){
		$('.indexImg1').fadeIn(1000);
		setTimeout(function(){
			$('.popBg').fadeIn(500);
			$('.indexImg2').addClass('indexImg2Act1');
			$('.page1').fadeIn(1000);
			setTimeout(function(){
				$('.popBg').fadeOut(1000);
				},1500);
			},1500);
		},1000);
	}
	
function goPage2(){
	$('.page1').addClass('indexImg2Act');
	setTimeout(function(){
		$('.page2').show();
		$('.page1').hide();
		addShake();
		},1100);
	}

function goPage2b(){
	$('.pageNoetA').fadeOut(500);
	$('.pageNoetB').fadeIn(500);
	$('.page2Img1').fadeOut(500);
	$('.page2Img2Img').bind('touchend',function(){goPage3();});
	//.touchwipe({
//		min_move_x: 40, //横向灵敏度
//		min_move_y: 40, //纵向灵敏度
//		wipe: function() {
//			goPage3();
//			}, 
//		preventDefaultEvents: true //阻止默认事件
//		});
	}
	
function goPage3(){
	$('.indexImg1').hide();
	$('.indexImg1b').hide();
	$('.page2').addClass('leftDownHide');
	$('.popBg').fadeIn(500);
	setTimeout(function(){
		$('.page2').hide();
		$('.popBg').fadeOut(500)
		},1100);
	$('.page3').fadeIn(500);
	$('.page3Img1').touchwipe({
		min_move_x: 40, //横向灵敏度
		min_move_y: 40, //纵向灵敏度
		wipeUp: function() {
			goPage3b();
			}, //向上滑动事件
		wipeDown: function() {
			goPage3b();
			}, //向下滑动事件
		preventDefaultEvents: true //阻止默认事件
		});
	}
	
function goPage3b(){
	$('.page3Bg').fadeOut(500);
	$('.page3Img1').fadeOut(500);
	setTimeout(function(){
		$('.page3Bg').fadeIn(500);
		$('.page3Img2').fadeIn(1000);
		},500);
	$('.page3Img2').touchwipe({
		min_move_x: 40, //横向灵敏度
		min_move_y: 40, //纵向灵敏度
		wipeUp: function() {
			goPage3c();
			}, //向上滑动事件
		wipeDown: function() {
			goPage3c();
			}, //向下滑动事件
		preventDefaultEvents: true //阻止默认事件
		});
	}
	
function goPage3c(){
	$('.page3Bg').fadeOut(500);
	$('.page3Img2').fadeOut(500);
	setTimeout(function(){
		$('.page3Bg').fadeIn(500);
		$('.page3Img3').fadeIn(1000);
		},500);
	$('.page3Img3').touchwipe({
		min_move_x: 40, //横向灵敏度
		min_move_y: 40, //纵向灵敏度
		wipeUp: function() {
			goPage3d();
			}, //向上滑动事件
		wipeDown: function() {
			goPage3d();
			}, //向下滑动事件
		preventDefaultEvents: true //阻止默认事件
		});
	}
	
function goPage3d(){
	$('.page3Bg').fadeOut(500);
	setTimeout(function(){
		$('.page3Bg2').fadeIn(500);
		$('.page3Img4').fadeIn(1000);
		$('.page3Btn1').fadeIn(1000);
		},500);
	$('.page3Img3').fadeOut(500);
	$('.downArrow').hide();
	}
	
function infoAct(){
	$('.infoStep1').hide();
	$('.infoImg2a').addClass('infoImg2aAct').show();
	setTimeout(function(){
		$('.infoImg2b').fadeIn(1000);
		},1500);
	}
	
isPlay=true;
function bgmCon(){
	if(isPlay){
		isPlay=false;
		var bgm=document.getElementById('bgm');
		bgm.pause();
		$('.bgm1').removeClass('bgm1Act');
		}
		else{
			isPlay=true;
			var bgm=document.getElementById('bgm');
			bgm.play();
			$('.bgm1').addClass('bgm1Act');
			}
	}