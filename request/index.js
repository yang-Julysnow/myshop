//同时发送异步ajax的次数
let ajaxTime=0;

export const request = (params) =>{
        ajaxTime++;
        //加载中效果
        wx.showLoading({
                title: '加载中',
                mask:true
        })
        
        

        //公共url
        const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
        return new Promise((resolve,reject)=>{
                wx.request({
                        ...params,
                        url:baseUrl+params.url,
                        success:(result)=>{
                                resolve(result.data.message);
                        },
                        fail:(err)=>{
                                reject(err);
                        },
                        complete:()=>{
                                ajaxTime--;
                                if(ajaxTime===0){
                                        wx.hideLoading()
                                }
                        }
                });
        })
}