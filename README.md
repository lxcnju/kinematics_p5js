# kinematics_p5js
Drawing beautiful curves using kinematics.

利用动力学里面机械臂的运动绘制漂亮的曲线。

* 代码架构
* 原理解析

## 代码架构
 * home.html  浏览器打开的主页
 * kinematics.js  动力学特效的代码
 * multi_kinematics.js  画布上有多处动力学特效曲线的代码
 
## 原理解析
  利用动力学特效来生成曲线是很常见的，比如本实验中的机械臂运动，模拟机械臂绕固定点进行旋转运动。下面是很形象的解释图：<br>
  <div align=center>
    <img src="https://github.com/lxcnju/kinematics_p5js/blob/master/kinematics.png" />
  </div> <br>
  从图中看出，这是一个由三条机械臂组成的机械臂动力系统，点O是支撑点，三条机械臂分别是OA,AB和BC，三条机械臂与水平方向形成了夹角angle1,angle2和angle3，这三个角度随着时间的变化而增大或减小，那么机械臂就会绕着顺时针或逆时针方向进行旋转，那么点A，B和C留下的轨迹即是非常漂亮的曲线。<br>
  在这里面机械臂长度，角度改变方向和角度改变大小等等都是可以调整的参数，会生成不同形状的曲线。下面给出一个绘制的过程图：<br>
  <div align=center>
    <img src="https://github.com/lxcnju/kinematics_p5js/blob/master/kinematics.gif" />
  </div> <br>
