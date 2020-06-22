import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsList:[]
  },

  //接口参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },

  //总页数
  totalPages:1,
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid,
    this.getGoodsList();
  },

  //获取商品列表数据
   async getGoodsList(){
     const res = await request({url:"/goods/search",data:this.QueryParams});

     //获取数据的length
     const total = res.total;
     //计算总页数
     this.totalPages = Math.ceil(total/this.QueryParams.pagesize);
    //  console.log(this.totalPages)
     this.setData({
       //拼接上拉加载的数组到已加载的数组后面
      goodsList:[...this.data.goodsList,...res.goods]
     })

     //关闭下拉刷新窗口
     wx.stopPullDownRefresh();
   },

  //标题点击事件
  handleTabsItemChange(e){
    // console.log(e)
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);

    this.setData({
      tabs
    })
  },

  //上拉加载
  onReachBottom(){
    // console.log("到底部了")
    //判断有没有下一页
    if(this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({
        title: '没有下一页数据了！'
      });
    }else{
      console.log("正在加载下一页")
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  //下拉刷新
  onPullDownRefresh(){
    //重置数组
    this.setData({
      goodsList:[]
    })

    //重置页码
    this.QueryParams.pagenum=1;

    //重新发送数据请求
    this.getGoodsList();
  }
}) 