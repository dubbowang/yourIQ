//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    welflag: true,
    cdownflag: false,
    gameflag: false,
    count: 3,
    gameblock: 0,
    blockviewlist: [],
    timer: '',
    stylenumber: 0,
    validatenumber: 0,
    second: 0,
    millisecond: 0,
    timerIns: 0
  },
  // 欢迎界面-第一次进入游戏
  firstGame() {
    this.setData({
      welflag: false,
      cdownflag: true
    })
    let _self = this;
    // count为方框单列数量
    let number = this.data.count;
    // 加载计时器 倒计时三秒开始
    let time = setInterval(() => {
      number--;
      this.setData({
        count: number
      })
      // 当倒计数字为0 开始 停止计时器
      if (number == 0) {
        clearInterval(time);
        this.setData({
          count: 3,
          welflag: false,
          cdownflag: false,
          gameflag: true
        })
        _self.beginGame(5);
      }
    }, 1000)
  },
  // 开始游戏 参数为单列数量
  beginGame(gameType) {
    let blocknum = gameType * gameType;
    let blockviewlist = [];
    for (let i = 1; i <= blocknum; i++) {
      blockviewlist.push(i);
    }
    function randomsort(a, b) {
      return Math.random() > .5 ? -1 : 1;
      //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
    }
    // 随机打乱数组中的数据
    blockviewlist.sort(randomsort);
    this.setData({
      gameblock: gameType,
      blockviewlist: blockviewlist
    })
    // 开始倒计时
    var timerIns = setInterval(this.timer, 50);//每隔50毫秒执行一次timer函数
    this.setData({
      timerIns: timerIns
    });
  },
  // 计时器
  timer() {
    let millisecond = this.data.millisecond + 50;
    let second = this.data.second;
    if (millisecond >= 1000) {
      millisecond = 0;
      second = second + 1;
      this.setData({
        millisecond: millisecond,
        second: second,
        timer: second + ":" + millisecond
      });
    } else {
      this.setData({
        millisecond: millisecond,
        second: second,
        timer: second + ":" + millisecond
      });
    }
  },
  // 用户点击方块时 检查当前方框的数据并进行操作
  clickNumFn(event) {
    // 获取当前点击的View中自定义的Data-clicknumber的数据
    let clicknumber = event.currentTarget.dataset.clicknumber;
    // clicknumber等于0 判断从1开始
    if (this.data.validatenumber == 0) {
      if (clicknumber != 1) {
        console.log("不等于1！");
        return;
      } else {
        this.setData({
          validatenumber: clicknumber
        })
      }
    } else {
      if (clicknumber != (this.data.validatenumber + 1)) {
        console.log("点的不对！");
        return;
      } else if (clicknumber == this.data.gameblock * this.data.gameblock) {
        console.log("结束了！");
        clearInterval(this.data.timerIns);
        let _self = this;
        // 显示弹窗
        wx.showModal({
          title: '挑战成功！',
          content: '您的成绩为：' + this.data.timer + "秒",
          showCancel: false,
          success() {
            _self.refreshData();
          }
        })
        return;
      } else {
        this.setData({
          validatenumber: clicknumber
        })
      }
    }
  },
  // 触摸方块时增加当前方框的边框效果
  touchNumView(event) {
    let stylenumber = event.currentTarget.dataset.clicknumber;
    this.setData({
      stylenumber: stylenumber
    })
  },
  // 离开触摸方块时还原效果，震动
  endNumView() {
    this.setData({
      stylenumber: 0
    })
    // 震动
    wx.vibrateShort({})
  },
  // 重置全局Data中的数据
  refreshData() {
    this.setData({
      welflag: true,
      cdownflag: false,
      gameflag: false,
      count: 3,
      gameblock: 0,
      blockviewlist: [],
      timer: '',
      stylenumber: 0,
      validatenumber: 0,
      second: 0,
      millisecond: 0,
      timerIns: 0
    });
  }
})
