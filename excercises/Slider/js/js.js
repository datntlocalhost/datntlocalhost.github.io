
/*=======================================================================================================*
 *                                        KHAI BÁO CÁC THÀNH PHẦN                                        *
 *=======================================================================================================*/
var slideImg = document.getElementsByClassName("slide-img"); // lấy tất cả img đang có trong slide main
var curImg = 0; //số image hiện tại đang được hiện thị
var timerSlideShow = 2000; // thời gian delay chạy auto slide show
var autoSlideShow; //biến cho auto slide show

/*=======================================================================================================*
 *                                    ĐỊNH NGHĨA CÁC MODULE & HÀM XỬ LÝ                                  *
 *=======================================================================================================*/

// module cho slide-main
var slideMain = function () {

	//khởi tạo, gán các eventlistener cho slide main
	function init() {
		var slideContainer = document.getElementById("slidemain");
		slideContainer.addEventListener("mouseover", function () {onHover();});
		slideContainer.addEventListener("mouseout", function () {onLeave();});
	}

	//hàm xử lí khi hover vào slide container
	function onHover() {

		//sẽ hiển thị back và forward button
		directBtn.enable();

		//tắt auto slide show
		clearInterval(autoSlideShow);
	}

	//hàm xử lí khi leave slide container
	function onLeave() {

		//tắt hiển thị back và forward button
		directBtn.disable();

		//bật auto show slide
		autoSlideShow  = setInterval(function () { changeImage(1); }, timerSlideShow);
	}

	return {
		init: init,
		hover: onHover,
		leave: onLeave
	};

}();

/* module cho button back và button forward */
var directBtn = function () {
	
	var btns = document.getElementsByClassName("direction-btn");

	// hàm xử lí khởi tạo các eventlistener cho các button back và forward
	function init() {
		for (let i = 0; i < btns.length; i++) {
			let idBtn = btns[i].id;
			btns[i].addEventListener("mouseover", function () {onHover(idBtn);});
			btns[i].addEventListener("mouseout", function () {onLeave(idBtn);});
			btns[i].addEventListener("click", function (){onClick(idBtn)});
		}
	}

	//xử lí hiển thị các button
	function onEnable() {
		for (let i = 0; i < btns.length; i++) {
			btns[i].style.visibility = "initial";
		}
	}

	//xử lí ẩn các button
	function onDisable() {
		for (let i = 0; i < btns.length; i++) {
			btns[i].style.visibility = "hidden";
		}
	}

    // hàm xử lý khi mouse hover vào btn
    function onHover(idBtn){
    	document.getElementById(idBtn).src = "imgs/" + idBtn + "Hover.png";
    }

    // hàm xử lý khi mouse leave khỏi btn
    function onLeave(idBtn){
    	document.getElementById(idBtn).src = "imgs/" + idBtn + "Leave.png";
    }

    //hàm xử lý khi click vào button
    function onClick (idBtn) {

    	if (idBtn == "backBtn") {
			changeImage(-1);	
		}
		else {
			changeImage(1);
		}
    }

    return {
    	init: init,
    	enable: onEnable,
    	disable: onDisable,
    	hover: onHover,
    	leave: onLeave,
    	colick: onClick
    };

}();

/* module cho dot */
var dot = function () {

	var dots = document.getElementsByClassName("dot-num");

	//dot sẽ tắt (hiển thị nền trong suốt) khi không phải slide mà dot đang chiếu đến
	function onDisable(num) {
		dots[num].className = dots[num].className.replace(" dot-num-white", "");
	}

	//dot sẽ được bật (hiển thị nền trắng) khi đến slide mà dot đang chiếu đến
	function onEnalble (num) {
		dots[num].className += " dot-num-white";
	}

	return {
		enable: onEnalble,
		disable: onDisable
	};

}();

/* Hàm xử lí thay đổi image trong slide */
function changeImage(num) {

	var numImg = slideImg.length; //số lượng image torng slide
	
	curImg += num; // vị trí image kế tiếp

	// nếu vị trí image kế tiếp lớn hơn tổng số lượng image thì set về 0
	// nếu vị trí image < 0 thì set về tổng số image đang có - 1
	if (curImg >= numImg) {
		curImg = 0;	
	} 
	else if (curImg < 0) {
		curImg = numImg - 1;
	}

	//set display = none cho tất cả các image có trong slile và disable các dot
	for (var i = 0 ; i < numImg ; i++) {
		slideImg[i].style.display = "none"; 
		dot.disable(i);
	}

	//chỉ hiển thị slide đang chiếu tới và bật dot mà nó đang chiếu tới
	slideImg[curImg].style.display = "block";
	dot.enable(curImg);
}

/*=======================================================================================================*
 *                          ADD CÁC EVENTLISTENER CHO CÁC THẺ SAU KHI LOADED                             *
 *=======================================================================================================*/

window.onload = function () {

	// bắt đầu chạy slide show
	autoSlideShow  = setInterval(function () { changeImage(1); }, timerSlideShow);

	// add eventlistener cho slidemain
	slideMain.init();

	// init cho back và forward button
	directBtn.init();

};
