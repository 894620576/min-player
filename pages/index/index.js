const fenest = require('../../base/base.js');

Page({
	data: {
		markers: [
			{
				id: 1,
				latitude: 22.719265,
				longitude: 114.229784,
				iconPath: '../../static/img/marker.png',
				name: 'marker1',
				callout: {
					content: 'marker1',
					display: 'ALWAYS'
				}
			},
			{
				id: 2,
				latitude: 22.719305,
				longitude: 114.232327,
				iconPath: '../../static/img/marker.png',
				name: 'marker2',
				callout: {
					content: 'marker2',
					display: 'ALWAYS'
				}
			}, {
				id: 3,
				latitude: 22.719651,
				longitude: 114.23002,
				iconPath: '../../static/img/marker.png',
				name: 'marker3',
				callout: {
					content: 'marker3',
					display: 'ALWAYS'
				}
			}],
		latitude: 22.720448,
		longitude: 114.228813,
		textData: {},
		city: '',
		scale: 18
	},
	onShow() {
		this.getLoacation();
	},
	getLoacation(){
		const that = this;
		wx.getLocation({
			type:'gcj02',
			complete:function(e){
				if(e.errMsg == "getLocation:fail auth deny"){
					that.setData({
						longitude:107.175006,
						latitude:34.358721,
						scale:8
					});
				}else{
					that.setData({
						longitude:e.longitude,
						latitude:e.latitude
					});
				}
				console.log(e);
				console.log(that.data);
			}
		})
	},
	onMakerTap(e) {
		const id = e.markerId;

		/*
		* 选中点击的marker
		* */
		for (let i in this.data.markers) {
			if (this.data.markers[i].id === id) {
				this.data.markers[i].iconPath = '../../static/img/marker_checked.png';
			} else {
				this.data.markers[i].iconPath = '../../static/img/marker.png';
			}
		}

		// 更新选中红点
		this.setData({
			markers: this.data.markers
		});
		console.log(this);
		// fenest.modal(this.markers[0].name);
	},
	bindTap(e) {
		fenest.showToast('点击地图');
	},
	enterClick() {
		wx.navigateTo({
			url: '../example/index'
		});
	},
	onActionSheet() {
		wx.getSystemInfo({
			success(res) {
				const phone = res.system.substring(0,3);
				let list = ["室内设施", "室外设施"];
				if(phone !== "iOS"){
					list = ["室内设施", "室外设施", "取消"]
				}
				fenest.showActionSheet(list).then((res) => {
					if (res) {
						fenest.showToast('你选择了' + res);
					}
				});
			}
		});


	},
	onScanCode() {
		wx.scanCode({
			success(res) {
				console.log(res);
			}
		});
	},
	onLoad(e) {
	}


});
