require(['js/common.js'],function(){
	require(['mui','dom','picker','echarts','poppicker','dtpicker'],function(mui,dom,picker,echarts){
		mui.init();
		
		//禁用手势侧滑 监听mui-inner-wrap容器的drag事件，阻止冒泡。
		var offCanvasInner = dom('.mui-off-canvas-wrap').querySelector('.mui-inner-wrap');
		offCanvasInner.addEventListener('drag', function(event) {
			event.stopPropagation();
		});
		
		//初始化
		function init(){
			//初始化滚动
			initScroll();
			//添加点击事件
			addEvent();
			//初始化时间
			initDate();
			//图表
			echart();
		}
		
		//滚动事件
		function initScroll(){
			//侧边滚动
			mui('.aside-scroll').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
			//主页面滚动
			mui('.con-scroll').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
		}
		
		//初始化时间
		var picker,
			dtPicker,
			curYear=new Date().getFullYear(),//年
			curMonth=new Date().getMonth()+1,
			_selectDate=dom('#select-date'),//月
			status='month';//默认给月的状态
		function initDate(){
			picker = new mui.PopPicker();
			picker.setData([{value:'month',text:'月'},
							{value:'year',text:'年'}]);
			_selectDate.innerHTML=curYear+'-'+curMonth;	
			dtPicker = new mui.DtPicker({
				type:'month'
			}); 
			
		}
		
		//添加点击事件
		function addEvent(){
			//关闭侧边栏
			dom('.close-aside').addEventListener('tap',function(){
				mui('.mui-off-canvas-wrap').offCanvas('close');
			})
			//点击月或者年
			dom('#select-month').addEventListener('tap',function(){
				var that=this;
				picker.show(function (selectItems) {
					console.log(selectItems[0].text);//月
					console.log(selectItems[0].value);//month
					that.innerHTML=selectItems[0].text;
					status=selectItems[0].value;
					_selectDate.innerHTML=status=='month'?curYear+'-'+curMonth:curYear;
					dom('h5[data-id="title-m"]').style.display=status=='month'?'inline-block':'none';
					dom('h5[data-id="title-y"]').style.width=status=='month'?'50%':'100%';
					dom('.mui-picker[data-id="picker-m"]').style.display=status=='month'?'block':'none';
					dom('.mui-picker[data-id="picker-y"]').style.width=status=='month'?'50%':'100%';
					
					if(status=='month'){
						dom('.year-show').classList.add('none');
						dom('.month-show').classList.remove('none');
					}else{
						dom('.year-show').classList.remove('none');
						dom('.month-show').classList.add('none');
					}
				})
			})
			//点击选择时间
			_selectDate.addEventListener('tap',function(){
				var that=this;
				dtPicker.show(function (selectItems) { 
					curYear=selectItems.y.text ;
					curMonth=selectItems.m.text;
					_selectDate.innerHTML=status=='month'?curYear+'-'+curMonth:curYear;	
				})
			})
			//点击显示账单页面
			dom('.select-bill').addEventListener('tap',function(){
				this.classList.add('active');
				dom('.select-table').classList.remove('active');
				dom('.bill-wrap').classList.remove('none');
				dom('.table-wrap').classList.add('none');
			})
			//点击显示图表页面
			dom('.select-table').addEventListener('tap',function(){
				this.classList.add('active');
				dom('.select-bill').classList.remove('active');
				dom('.bill-wrap').classList.add('none');
				dom('.table-wrap').classList.remove('none');
			})
		}
		
		function echart(){
			var income = echarts.init(dom('#income'));
			var expend = echarts.init(dom('#expend'));
			option = {
				series: [
					{
						name:'访问来源',
						type:'pie',
						radius: ['40%', '55%'],
						data:[
							{value:335, name:'直达'},
							{value:310, name:'邮件营销'},
							{value:234, name:'联盟广告'},
							{value:135, name:'视频广告'},
							{value:1048, name:'百度'},
							{value:251, name:'谷歌'},
							{value:147, name:'必应'},
							{value:102, name:'其他'}
						]
					}
				]
			};
			income.setOption(option);
			expend.setOption(option);
		}
		init();//页面的主入口
	})
})