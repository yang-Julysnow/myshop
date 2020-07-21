// pages/cart/index.js

import {getSetting,chooseAddress,openSetting,showModal,showToast} from "../../utils/asyncWX"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({
  data:{
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    //获取缓存中的地址信息
    const address=wx.getStorageSync("address");

    const cart = wx.getStorageSync("cart")||[];

    this.setData({address});
    this.setCart(cart);
  },

  //点击收货地址
  async handleChooseAddress(){
    try{
      //获取权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      //判断权限状态
      if(scopeAddress===false){
        //点击取消后还想获取,打开权限
        await openSetting();
      }
      let address = await chooseAddress();
      address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo;
      //存到缓存中
      wx.setStorageSync("address", address);
    }catch(err){
      console.log(err);
    }
  },

  //商品选中状态事件
  handleItemChange(e){
    const goods_id = e.currentTarget.dataset.id;
    let {cart} = this.data;
    let index = cart.findIndex(v=>v.goods_id===goods_id);
    cart[index].checked=!cart[index].checked;
    this.setCart(cart);
  },

  setCart(cart){
    let allChecked=true;
    //总价和总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if(v.checked){
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
      }else{
        allChecked=false;
      }
    });
    allChecked = cart.length != 0 ? allChecked : false;

    this.setData({
      cart,
      totalPrice, totalNum, allChecked
    });
    wx.setStorageSync("cart",cart);
  },

  //商品的全选功能
  handleItemAllcheck(){
    let {cart,allChecked} = this.data;
    allChecked =! allChecked;
    cart.forEach(v=>v.checked=allChecked);

    this.setCart(cart)
  },

  //加减商品数量
  async handleItemNumEdit(e){
    const {operation,id} = e.currentTarget.dataset;
    let {cart} = this.data;
    const index = cart.findIndex(v=>v.goods_id===id);
    if(cart[index].num===1&&operation===-1){
      const res=await showModal({content:"您是否要删除这个商品!"});
      if(res.confirm){
        cart.splice(index,1);
        this.setCart(cart);
      }else{
        
      }
    }else{
      cart[index].num+=operation;
      this.setCart(cart)
    }
  },

  //结算功能
  async handlePay(){
    //判断收货地址
    const {address,totalNum} = this.data;
    if(!address.userName){
      await showToast({title:"您还没有收货地址！"});
      return;
    }
    //判断有没有商品
    if(totalNum===0){
      await showToast({title:"您还没有选购商品！"});
      return;
    }

    //跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  }
})