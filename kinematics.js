// 绘制动力学曲线
// 由固定数量的机械臂组成机械臂系统，每次机械臂会绕固定点进行旋转一定角度，将顶点的轨迹作图

var armSys1;        // 机械臂系统1，画布左边
var armSys2;        // 机械臂系统2，画布右边

var nums = 5;       // 每个机械臂系统里面的机械臂数量

function setup() {
    createCanvas(1350, 600);
    armSys1 = new ArmSystem(width/4, height/2);               // 初始化，注意x与y位置
	armSys2 = new ArmSystem(3 * width/4, height/2);
	
	// 添加机械臂
	for(var k = 0; k < nums; k++){
		armSys1.addArm(random(50, 150), random(0.0, 1.0));
	}
	for(var k = 0; k < nums; k++){
		armSys2.addArm(random(50, 150), random(0.0, 1.0));
	}
}


function draw() {
    background(255, 2);           // 每次擦除之前的2%，而不是一次性擦除
	armSys1.updateArms();         // 更新机械臂位置
	armSys2.updateArms();
	armSys1.display();            // 显示
	armSys2.display();
}

// 机械臂系统，包含中心位置和一系列机械臂
function ArmSystem(x, y){
	this.x = x;                   // 中心位置
	this.y = y;
	this.arms = [];               // 机械臂数组
	this.armsNum = 0;             // 机械臂数量
	// 添加机械臂，每次添加以上一次添加的机械臂为父亲结点
	this.addArm = function(length, angle){
		if(this.armsNum == 0){
			var arm = new Arm(this.x, this.y, length, angle);
			this.arms.push(arm);
		}else{
			var arm = new Arm(this.arms[this.armsNum - 1].getEndx(), this.arms[this.armsNum - 1].getEndy(), length, angle);   // 初始位置在上一个机械臂的末端
			arm.parentArm = this.arms[this.armsNum - 1];     // 父亲结点
			this.arms.push(arm);
		}
		this.armsNum++;           // 数量自增
	}
	// 更新机械臂
	this.updateArms = function(){
		for(var k = 0; k < this.armsNum; k++){
			this.arms[k].update();          // 角度和位置更新
		}
	}
	// 显示
	this.display = function(){
		for(var k = 0; k < this.armsNum; k++){
			this.arms[k].display();
		}
	}
}

// 机械臂
function Arm(x, y, length, angle){
	this.x = x;                // 初始端点坐标
	this.y = y;
	this.length = length;      // 长度
	this.angle = angle;        // 角度
	this.angleStep = random(-0.02, 0.02);   // 每次角度更新大小
	this.parentArm = null;     // 父亲机械臂
	
	// 获得父系结点的角度之和
	this.getAngle = function(){
		var res = this.angle;
		var p = this.parentArm;
		while(p != null){
			res += p.angle;
			p = p.parentArm;
		}
		return res;
	}
	// 获得机械臂末端坐标
	this.getEndx = function(){
		return this.x + this.length * cos(this.getAngle());
	}
	this.getEndy = function(){
		return this.y + this.length * sin(this.getAngle());
	}
	// 显示
	this.display = function(){
		stroke(255, 0, 0);                // 红色填充
		strokeWeight(1);                  // 机械臂粗细
		line(this.x, this.y, this.getEndx(), this.getEndy());   // 机械臂
		strokeWeight(2);
		point(this.getEndx(), this.getEndy());      // 机械臂末端点
	}
	// 更新
	this.update = function(){
		this.angle += this.angleStep;     // 更新角度
		// 更新位置
		if(this.parentArm){
			this.x = this.parentArm.getEndx();
			this.y = this.parentArm.getEndy();
		}
	}
}