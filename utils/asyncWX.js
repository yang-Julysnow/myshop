// Promise形式getSetting
export const getSetting=()=>{
        return new Promise((resolve,reject)=>{
                wx.getSetting({
                        success: (result)=>{
                                resolve(result)
                        },
                        fail: (err)=>{
                                reject(err)
                        }
                });
        })
}

// Promise 形式 chooseAddress
export const chooseAddress=()=>{
        return new Promise((resolve,reject)=>{
                wx.chooseAddress({
                        success: (result)=>{
                                resolve(result)
                        },
                        fail: (err)=>{
                                reject(err)
                        }
                });
        })
}

// Promise 形式 openSetting
export const openSetting=()=>{
        return new Promise((resolve,reject)=>{
                wx.openSetting({
                        success: (result)=>{
                                resolve(result)
                        },
                        fail: (err)=>{
                                reject(err)
                        }
                });
        })
}

// Promise 形式 showModal
export const showModal=({content})=>{
        return new Promise((resolve,reject)=>{
                wx.showModal({
                        title: '提示',
                        // content: '您是否要删除',
                        content:content,
                        success: (res) => {
                          
                          resolve(res);
                        },
                        fail:(err)=>{
                                reject(err);
                        } 
                });
        })
}

// Promise 形式 showToast
export const showToast=({title})=>{
        return new Promise((resolve,reject)=>{
                wx.showModal({
                        title: title,
                        icon: 'none',
                        success:(res)=>{
                                resolve(res);
                        },
                        fail:(err)=>{
                                reject(err);
                        }
                });
        })
}