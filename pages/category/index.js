import { request } from "../../request/index.js";
import regeneratorRuntime, { async } from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧的菜单数据
    leftMenuList:[],
    //右侧商品菜单数据
    rightContent:[],
    //被点击菜单
    currentIndex:0,
    //右侧内容滚动条
    scrollTop:0
  },

  //接口返回的数据
  Cates:[],


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判定本地有没有旧数据

    const Cates = wx.getStorageSync("cates");
    if(!Cates){
      this.getCates();
    }else{
      if(Date.now()-Cates.time>1000*300){
        //旧数据超过5分钟重新发送请求获取数据
        this.getCates();
      }else{
        //使用旧数据
        console.log('使用旧数据')
        this.Cates=Cates.data;
        //构造左侧的大菜单数据
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        //构造左侧的商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  
  },

  //获取分类数据
  async getCates(){
    const res = await request({url:'/categories'});
    this.Cates=res;
    //接口数据存入本地存储中
    wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
    //构造左侧的大菜单数据
    let leftMenuList = this.Cates.map(v=>v.cat_name);
    //构造左侧的商品数据
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },

  //左侧菜单的点击事件
  handleItemTap(e){
    const {index} = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      //左侧点击切换的时候右侧内容的滚动条在最顶部
      scrollTop:0
    }) 
  }
})