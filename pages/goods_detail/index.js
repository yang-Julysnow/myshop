import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },

  //商品对象
  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   **/
  onLoad: function (options) {
    const {goods_id} = options;
    // console.log(goods_id)
    this.getGoodsDetail(goods_id);
  },

  //获取商品详情数据
  async getGoodsDetail(goods_id){
    // const res=await request({url:"/goods/detail",data:{goods_id}});
    const goodsObj = await request({url:"/goods/detail",data:{goods_id}});
    this.GoodsInfo=goodsObj,
    // console.log(res)
    this.setData({
      // goodsObj
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        //解决图片格式 webp 在iPhone手机上的兼容问题
        //正常开发流程后台进行改动
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.pics
      }
    })
  },
  
  //点击轮播图放大预览
  handlePrevewImage(e){
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },


  //添加购物车
  handleCartAdd(){
    //获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart")||[];
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index===-1){
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo);
    }else{
      cart[index].num++;
    }

    //把购物车重新添加到缓存
    wx.setStorageSync("cart", cart);
    //弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,//防止一次性点多次
    });
  }
}) 