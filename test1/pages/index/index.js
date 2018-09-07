//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    navhover:'nav-hover',
    navlist:[
      {"typeId":0,"name":"全部"},
      {"typeId":1,"name":"海淘攻略"},
      {"typeId":288,"name":"电脑数码"},
      {"typeId":694,"name":"运动户外"},
      {"typeId":808,"name":"服饰鞋包"}
    ],
    lists:'',
    pageSize:5,
    pageNo:1,
    scrollTop: 0,
    typeId:0,
    topicId:0,
    hideloading:true,
    scrollTop: {  
      scroll_top: 0,  
      goTop_show: false  
    }  
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getTypeId:function(e){
    var that = this;
    var typeId =e.target.dataset.typeid;
    that.setData({
    typeId:typeId
    })
    that.getLists('https://best.pconline.com.cn/app/miniapp/getTopicList.do?pageNo=1&pageSize='+ that.data.pageSize +'&typeId='+that.data.typeId);
    
  },
  getLists:function(url){
    var that=this;
    that.setData({hideloading:false})
    that.goTopFun();
    wx.request({
      url:url,
      method:'GET',
      data: {},
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        that.setData({
          lists:res.data.data
          
          })
        setTimeout(function(){that.setData({hideloading:true})}.bind(this),500)  
      }
    })
  },
  scrollTopFun: function(e){   
    if(e.detail.scrollTop > 50){//触发gotop的显示条件  
      this.setData({  
        'scrollTop.goTop_show': true  
      });  
      
    }else{  
      this.setData({  
        'scrollTop.goTop_show': false  
      });  
    }  
  },  
  goTopFun: function(e){  
    var _top=this.data.scrollTop.scroll_top;//发现设置scroll-top值不能和上一次的值一样，否则无效，所以这里加了个判断  
    if(_top==1){  
      _top=0;  
    }else{  
      _top=1;  
    }  
    this.setData({  
      'scrollTop.scroll_top': _top  
    })  
  },
  scrolltolowerFun:function(){
    var that = this;
    var pageIndex =that.data.pageNo;
    pageIndex++;
    that.setData({ 
      pageNo: pageIndex
    })
    that.getLists('https://best.pconline.com.cn/app/miniapp/getTopicList.do?pageNo='+that.data.pageNo+'&pageSize='+ that.data.pageSize +'&typeId='+that.data.typeId);
  },
  goTo:function(e){
    var that= this;
    var tId =e.target.dataset.topicid;
     console.log(tId)
    that.setData({
      topicId:tId
    })
    wx.navigateTo({
      url: '../detail/detail?topicId='+that.data.topicId
    })
    console.log(that.data.topicId)
  },
  onLoad: function () {
    var that = this;
    that.getLists('https://best.pconline.com.cn/app/miniapp/getTopicList.do?pageNo='+that.data.pageNo+'&pageSize='+that.data.pageSize+'&typeId='+that.data.typeId)
  }
})
