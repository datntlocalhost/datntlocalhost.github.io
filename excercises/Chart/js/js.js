
//module tập hợp các kiểu vẽ trong canvas
var draw = function () {

	/*
	* hàm init - gán giá trị cho các thuộc cần thiết để bắt đầu quá trình vẽ
    * @param1: ctx - môi trường vẽ
    * @param2: moveX - tọa độ hoành của điểm bắt đầu
    * @param3: moveY - tọa độ tung của điểm bắt đầu
    * @param4: color - màu sắc của đường vẽ (ko bắt buộc)
    * @param5: lineWidth - độ đậm của đường vẽ
    * @param6: lineJoin - kiểu nối điểm giữa các đường thẳng (ko bắt buộc)
	*/
	function init (ctx, moveX, moveY, color, lineWidth, lineJoin) {
		
		ctx.lineWidth = lineWidth;
		ctx.lineJoin = lineJoin;
		ctx.strokeStyle = color;

		ctx.beginPath();
		ctx.moveTo(moveX, moveY);
	}

	/*
	* hàm mStroke - tiến hành vẽ sau khi đã định nghĩa và gán các thuộc tính
	* @param1: ctx - môi trường vẽ
	*/
	function mStroke (ctx) {
		ctx.stroke();
	}

	/*
	* hàm text - vẽ chữ
	* @param1: ctx - môi trường vẽ
	* @param2: text - chuỗi cần vẽ
	* @param3: font - font chữ, kích thước, kiểu chữ
	* @param4: color - màu sắc chữ
	* @param5: coorX - tọa độ hoành điểm bắt đầu vẽ
	* @param6: coorY - tọa độ tung điểm bắt đầu vẽ
	* @param7: mRotate - được truyền vào trong trường hợp muốn thay đổi hướng của chữ
	*/
	function text (ctx, text, font, color, coorX, coorY, mRotate) {
		
		ctx.font = font;
		ctx.fillStyle = color;
		ctx.rotate(mRotate); //xoay chữ
		ctx.fillText(text, coorX, coorY);
		ctx.rotate(-mRotate); //trở lại ban đầu
	}

	/*
	* hàm lineTo - vẽ một đường thẳng
	* @param1: ctx - môi trường vẽ
	* @param2: moveX - tọa độ hoành của điểm bắt đầu
    * @param3: moveY - tọa độ tung của điểm bắt đầu
    * @param4: lineX - tọa độ hoành điểm kết thúc
    * @param5: lineY - tọa độ tung điểm kết thúc
    * @param6: color - màu sắc của đường vẽ (ko bắt buộc) 
    * @param5: lineWidth - độ đậm của đường vẽ (ko bắt buộc)
	*/
	function lineTo (ctx, moveX, moveY, lineX, lineY, color, lineWidth) {
		
		init(ctx, moveX, moveY, color, lineWidth);
		ctx.lineTo(lineX, lineY);
		mStroke(ctx);
	}

	/*
	* hàm lineJoin - vẽ các đường thẳng nối liền (liên kết) nhau
	* @paran1: ctx - môi trường vẽ
	* @param2: moveX - tọa độ hoành của điểm bắt đầu
	* @param3: moveY - tọa độ tung của điểm bắt đầu
	* @param4: coorArray - một mảng chứa các tọa độ điểm kết thúc cho từng đường vẽ
	* @param5: color - màu sắc của đường vẽ (ko bắt buộc) 
	* @param6: lineWidth - độ đậm của đường vẽ (ko bắt buộc)
	* @param7: lineJoin - kiểu nối điểm giữa các đường thẳng (ko bắt buộc)
	*/
	function lineJoin (ctx, moveX, moveY, coorArray, color, lineWidth, lineTypeJoin) {
		
		var arrLength = coorArray.length;

		init(ctx, moveX, moveY, color, lineWidth, lineJoin);

		//Xử lí khi số tọa độ là lẽ
		if (arrLength % 2 != 0) {
			//tọa độ tung kết thúc của đường vẽ cuối cùng sẽ cho bằng tọa hộ hoành của đường kẻ đó
			coorArray.push(coorArray[arrLength - 1]); 
		}

		for(let i = 0; i < arrLength; i += 2) {
			ctx.lineTo(coorArray[i], coorArray[i+1]);
		}

		mStroke(ctx);

	}

	/*
	* hàm ellipse - vẽ đường ellipse và đường tròn
	* @param1: ctx - môi trường vẽ
	* @param2: centerX - tọa độ hoành của tâm đường ellipse
	* @param3: centerY - tọa độ tung của tâm đường ellipse
	* @param4: radiusX - bán kính ellipse theo trục hoành
	* @param5: radiusY - bán kính ellipse theo trục tung
	* @param6: rotation - xoay ellipse (đơn vị tính là radians) 
	* @param7: startAngle - góc bắt đầu vẽ (đơn vị tính là radians)
	* @param8: endAngle - góc kết thúc vẽ (đơn vị tính là radians)
	* @param9: anticlockwise - hướng vẽ, true sẽ vẽ ngược chiều kim đồng hồ, false sẽ vẽ theo chiều kim đồng hồ
	* @param10: color - màu sắc đường vẽ
	* @param11: lineWidth - độ đậm của đường vẽ
	*/
	function ellipse (ctx, centerX, centerY, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise, color, lineWidth) {
		
		init(ctx, centerX, centerY, color, lineWidth);
		
		ctx.ellipse(centerX, centerY, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
		ctx.closePath();
		
		mStroke(ctx);

	}

	/*
	* hàm bezierCurve - vẽ đường cong
	* @param1: ctx - môi trường vẽ
	* @param2: moveX - tọa độ hoành điểm bắt đầu vẽ
	* @param3: moveY - tọa độ tung điểm bắt đầu vẽ
	* @param4: cp1X - tọa độ hoành điểm bẻ cong đường thẳng thứ nhất
	* @param5: cp1Y - tọa độ tung điểm bẻ cong đường thẳng thứ nhất
	* @param6: cp2X - tọa độ hoành điểm bẻ cong đường thẳng thứ hai
	* @param7: cp2Y - tọa độ tung điểm bẻ cong đường thẳng thứ hai
	* @param8: endX - tọa độ hoành điểm kết thúc của đường vẽ
	* @param9: endY - tọa độ tung điểm kết thúc của đường vẽ
	* @param10: color - màu sắc đường vẽ
	* @param11: lineWidth - độ đậm của đường vẽ
	*/
	function bezierCurve (ctx, moveX, moveY, cp1X, cp1Y, cp2X, cp2Y, endX, endY, color, lineWidth) {
		
		init(ctx, moveX, moveY, color, lineWidth);
		
		ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
		
		mStroke(ctx);
	}


	/*
	* hàm shapeFill - tô màu cho khối
	* @param1: ctx - môi trường vẽ
	* @param2: màu sắc 
	*/
	function shapeFill (ctx, color) {
		
		ctx.fillStyle = color;
		ctx.fill();
	}

	/*
	* hàm fillRec - đổ màu theo hình chữ nhật
	* @param1: ctx - môi trường vẽ
	* @param2: startX - tọa độ hoành điểm bắt đầu đổ màu
	* @param3: startY - tọa độ tung điểm bắt đầu đổ màu
	* @param4: endX - khoảng cách kết thúc theo trục hoành
	* @param5: endY - khoảng cách kết thúc theo trục tung
	* @param6: color - màu sắc
	*/
	function fillRec(ctx, startX, startY, endX, endY, color) {
		
		ctx.fillStyle = color;
		ctx.fillRect(startX, startY, endX, endY);
	}

	return {

		init: init,
		text: text,
		lineTo: lineTo,
		lineJoin: lineJoin,
		ellipse: ellipse,
		bezierCurve: bezierCurve,
		shapeFill: shapeFill,
		fillRec: fillRec

	};
}();

window.onload = function () {

	//Vẽ đồ thị 1
	function chart1 () {

		var canvas = document.getElementById("chart-1");
		var ctx    = canvas.getContext("2d");
		
		//Vẽ phần trụ dưới
		//lineJoin (ctx, moveX, moveY, coorArray, color, lineWidth, lineTypeJoin) 
		//shapeFill (ctx, color)
		draw.lineJoin(ctx, 110, 150, [110, 200, 390, 200, 390, 150]);
		draw.shapeFill(ctx, "#456AA4");
		
		//ellipse (ctx, centerX, centerY, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise, color, lineWidth)
		draw.ellipse(ctx, 250, 200, 140, 40, 0 ,0, Math.PI, false, "#456AA4");
		draw.shapeFill(ctx, "#456AA4");
		
		//Vẽ phần mặt trên
		draw.ellipse(ctx, 250, 150, 140, 40, 0 ,0, 1.6*Math.PI, false, "#009ED5");
		draw.shapeFill(ctx, "#009ED5");

		//Vẽ phần bị cắt
		draw.lineJoin(ctx, 294, 111, [250, 150, 294, 150, 294, 111], "#456AA4");
		draw.shapeFill(ctx, "#456AA4");

		draw.ellipse(ctx, 270, 140, 118, 40, 0 ,1.62*Math.PI, 2*Math.PI, false, "#E4322B");
		draw.shapeFill(ctx, "#E4322B");

		//fillRec(ctx, startX, startY, endX, endY, color)
		draw.fillRec(ctx, 270, 139, 119, 12, "#E4322B");

		//Vẽ phần thông tin cho mỗi khúc
		draw.lineJoin(ctx, 40, 90, [130, 90, 180, 145], "#5071A9", 3);
		draw.text(ctx, "80% ĐÃ ĐẠT", "14px Arial", "#009ED5", 35, 82);

		draw.lineJoin(ctx, 350, 112, [390, 70, 470, 70], "#E4322B", 3);
		draw.text(ctx, "20% CHƯA ĐẠT", "14px Arial", "#009ED5", 390, 62);

		draw.text(ctx, "BIỂU ĐỒ TỔNG QUAN KHUNG NĂNG LỰC", "12px Arial", "#009ED5", 140, 270);
	}

	//Vẽ đồ thị 2
	function chart2 () {

		var canvas = document.getElementById("chart-2");
		var ctx    = canvas.getContext("2d");

		//Vẽ khung biểu đồ
		draw.lineJoin(ctx, 100, 50, [100, 240, 420, 240], "black", 2);
		draw.text(ctx, "0", "20px Arial", "black", 87, 240);
		draw.text(ctx, "1", "20px Arial", "black", 87, 200);
		draw.text(ctx, "2", "20px Arial", "black", 87, 160);
		draw.text(ctx, "3", "20px Arial", "black", 87, 120);
		draw.text(ctx, "4", "20px Arial", "black", 87, 80);

		//Vẽ text cho chart
		draw.text(ctx, "RANK SCORE RANK", "20px Arial", "black", 150, 30);
		draw.text(ctx, "QUY LAM VIEC", "20px Arial", "black", 140, 285);
		draw.text(ctx, "HISTORY", "20px Arial", "black", -170, 50, -90 * Math.PI/180);

		//Vẽ line nội dung cho biểu đồ
		//bezierCurve(ctx, moveX, moveY, cp1X, cp1Y, cp2X, cp2Y, endX, endY, color, lineWidth)
		draw.bezierCurve(ctx, 117, 170, 122, 166, 128, 164, 137, 130, "#00AEEF", 5);
		draw.bezierCurve(ctx, 137, 130, 149, 80, 165, 80, 177, 130, "#00AEEF", 5);
		draw.bezierCurve(ctx, 177, 130, 191, 183, 205, 183, 217, 130, "#00AEEF", 5);
		draw.bezierCurve(ctx, 217, 130, 237, 50, 248, 125, 257, 129, "#00AEEF", 5);
		draw.bezierCurve(ctx, 257, 129, 286, 140, 320, 90, 357, 92, "#00AEEF", 5);

	}

	//Vẽ đồ thị 3
	function chart3 () {

		var canvas = document.getElementById("chart-3");
		var ctx    = canvas.getContext("2d");

		//Vẽ 60%
		//ellipse(ctx, centerX, centerY, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise, color, lineWidth)
		draw.ellipse(ctx, 150, 150, 100, 100, 0, 0.3*Math.PI, 1.5*Math.PI, false, "#189747");
		draw.shapeFill(ctx, "#189747");

		//Vẽ 10% xanh
		draw.ellipse(ctx, 150, 150, 100, 100, 0,  1.5*Math.PI, 1.7*Math.PI, false, "#4267B1");
		draw.shapeFill(ctx, "#4267B1");

		//Vẽ 20% 
		draw.ellipse(ctx, 150, 150, 100, 100, 0,  0.1*Math.PI, 1.7*Math.PI, true, "#DB3D26");
		draw.shapeFill(ctx, "#DB3D26");

		//Vẽ 10% cam
		draw.ellipse(ctx, 150, 150, 100, 100, 0,  0.1*Math.PI, 0.3*Math.PI, false, "#F8991D");
		draw.shapeFill(ctx, "#F8991D");

		//Vẽ vòng trắng giữa
		draw.ellipse(ctx, 150, 150, 45, 45, 0,  0, 2*Math.PI, false, "#FFF");
		draw.shapeFill(ctx, "#FFF");

		//Vẽ màu các hình vuông chú thích
		//fillRec(ctx, startX, startY, endX, endY, color)
		draw.fillRec(ctx, 350, 100, 15, 15, "#4267B1");
		draw.fillRec(ctx, 350, 135, 15, 15, "#DB3D26");
		draw.fillRec(ctx, 350, 170, 15, 15, "#F8991D");
		draw.fillRec(ctx, 350, 205, 15, 15, "#189747");

		//Vẽ text chú thích
		//text (ctx, text, font, color, coorX, coorY, mRotate)
		draw.text(ctx, "Xuất xắc", "bold 17px Arial", "black", 375, 115);
		draw.text(ctx, "Tốt", "bold 17px Arial", "black", 375, 150);
		draw.text(ctx, "Trung bình", "bold 17px Arial", "black", 375, 185);
		draw.text(ctx, "Kém", "bold 17px Arial", "black", 375, 220);

		//Vẽ số % trong biểu đồ
		draw.text(ctx, "10%", "bold 17px Arial", "black", 155, 90);
		draw.text(ctx, "20%", "bold 17px Arial", "black", 205, 140);
		draw.text(ctx, "10%", "bold 17px Arial", "black", 200, 200);
		draw.text(ctx, "60%", "bold 17px Arial", "black", 70, 190);

	}

	function chart4 () {

		var canvas = document.getElementById("chart-4");
		var ctx    = canvas.getContext("2d");

		//Vẽ khung biểu đồ
		//lineTo (ctx, moveX, moveY, lineX, lineY, color, lineWidth)
		draw.lineTo(ctx, 100, 70, 400, 70, "#66D9EF");
		draw.lineTo(ctx, 100, 110, 400, 110, "#66D9EF");
		draw.lineTo(ctx, 100, 150, 400, 150, "#66D9EF");
		draw.lineTo(ctx, 100, 190, 400, 190, "#66D9EF");
		draw.lineTo(ctx, 100, 230, 400, 230, "#000");

		//Vẽ thông tin trục hoành
		draw.text(ctx, "A", "17px Arial", "black", 115, 250);
		draw.text(ctx, "B", "17px Arial", "black", 175, 250);
		draw.text(ctx, "C", "17px Arial", "black", 235, 250);
		draw.text(ctx, "E", "17px Arial", "black", 295, 250);
		draw.text(ctx, "F", "17px Arial", "black", 355, 250);

		//Vẽ thông tin trục tung
		draw.text(ctx, "4", "17px Arial", "black", 80, 75);
		draw.text(ctx, "3", "17px Arial", "black", 80, 115);
		draw.text(ctx, "2", "17px Arial", "black", 80, 155);
		draw.text(ctx, "1", "17px Arial", "black", 80, 195);
		draw.text(ctx, "0", "17px Arial", "black", 80, 235);

		//Vẽ text cho biểu đồ
		draw.text(ctx, "BIỂU ĐỒ LỊCH SỬ LEVEL OF POSITION", "22px Arial", "black", 60, 35);
		draw.text(ctx, "LEVEL OF POSITION", "italic 18px Arial", "#66D9EF", -230, 40, -90*Math.PI/180);
		draw.text(ctx, "TÊN DỰ ÁN", "italic 18px Arial", "#66D9EF", 200, 280);
		draw.text(ctx, "LEVEL", "18px Arial", "#000", 410, 112);
		draw.text(ctx, "OF", "18px Arial", "#000", 410, 135);
		draw.text(ctx, "POSITION", "18px Arial", "#000", 410, 158);

		//Vẽ dữ liệu cho biểu đồ
		//fillRec(ctx, startX, startY, endX, endY, color)
		draw.fillRec(ctx, 100, 150, 40, 80, "#3366CC");
		draw.fillRec(ctx, 160, 225, 40, 5, "#3366CC");
		draw.fillRec(ctx, 220, 110, 40, 120, "#3366CC");
		draw.fillRec(ctx, 280, 70, 40, 160, "#3366CC");
		draw.fillRec(ctx, 340, 70, 40, 160, "#3366CC");
		draw.fillRec(ctx, 410, 70, 40, 15, "#3366CC");


	}

	chart1();
	chart2();
	chart3();
	chart4();

}