// pages/cart/index.js

import {getSetting,chooseAddress,openSetting,showModal,showToast} from "../../utils/asyncWX"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({
  data:{
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    //获取缓存中的地址信息
    const address=wx.getStorageSync("address");

    let cart = wx.getStorageSync("cart")||[];

    cart = cart.filter(v=>v.checked);
    this.setData({address});
    //总价和总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
    });

    this.setData({
      cart,
      totalPrice, 
      totalNum,
      address
    });
  },

  //点击支付功能
  handleOrderPay(){
    //1、判断缓存中有没有token
    const token = wx.getStorageSync("token");
    //2、判断
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
        success: (result)=>{
          
        }
        
      });
      return
    }
    console.log("已经存在")
  }
})