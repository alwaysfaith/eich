$(function(){
  var newDoubleSelect = {
    selData:null,
    initDoubleSelect:function(selData){// 初始化一级下拉列表
      var shtml = "";
      this.selData = selData;
      $.each(selData, function(k1, p){
        shtml += '<a href="javascript:void(0)" data-value="'+k1+'" class="">'+k1+'</a>';
      });
      $("#s1").html(shtml);
      this.setNewSelect1($("#s1 a[data-value="+"江苏"+"]")); //默认省份
	  this.setNewSelect2($("#s2 a[data-value="+"无锡"+"]"));  //默认城市
    },
    setListData:function(){// 设置列表数据
      var province = $("#buyArea input[name=materia1]").val();
      var city = $("#buyArea input[name=materia2]").val();
      var dataList = [];
      if(this.selData.hasOwnProperty(province)){
        if(city != ''){//如果选择了市/区
          if(this.selData[province].hasOwnProperty(city)){
            dataList = this.selData[province][city];
          }
        }else{
          $.each(this.selData[province],function(k,v){
            $.merge(dataList,v);
          });
        }
      }
	  var ss='';
	  $.each(dataList,function(k,v){
		  ss += '<dl class="store-info-item"><dt>'+v["name"]+'</dt><dd>'+v["addr"]+'</dd></dl>';
      });
	  $("#storeInfo").html(ss);
    },
    setNewSelFromMap:function(dataVal){//点击地图上某地区后需要重置一级下拉列表选中3
      if(this.selData.hasOwnProperty(dataVal)){
        this.setNewSelect1($("#s1 a[data-value="+dataVal+"]"));
      }else{
        //alert("没有哦");
      }
    },
    setNewSelect1:function(selObj){//设置一级下拉列表
      var dataVal = selObj.attr('data-value');
      $('.lx1 em').html(selObj.text());
      selObj.addClass("cur").siblings().removeClass("cur");
      $("#buyArea input[name=materia1]").val(dataVal);
      $('.lx2 em').html("请选择");
      $("#buyArea input[name=materia2]").val("");
      var shtml = "";
      var defaultCity = " ";
      if(this.selData.hasOwnProperty(dataVal)){
        var getDefaultFlag = true; 
        $.each(this.selData[dataVal], function(k1, p){
          if(getDefaultFlag){
            defaultCity = k1;
            getDefaultFlag = false;
          }
          shtml += '<a href="javascript:void(0)" data-value="'+k1+'" class="">'+k1+'</a>';
        });
      }
      $("#s2").html(shtml);
	  //alert(defaultCity);
      //this.setNewSelect2($("#s2 a[data-value="+"无锡"+"]")); 
	  this.setNewSelect2($("#s2 a[data-value="+defaultCity+"]")); 
      this.setListData();
    },
    setNewSelect2:function(selObj){//设置二级下拉列表
      var dataVal = selObj.attr('data-value');
      $('.lx2 em').html(selObj.text());
      selObj.addClass("cur").siblings().removeClass("cur");
      $("#buyArea input[name=materia2]").val(dataVal);
      this.setListData();
    },
    bindEvents:function(){//绑定事件
      var _self = this;
      $(document).bind("click", function() {
        $(".selectauto").hide();
      });
      $("#buyArea").on('click',".lx1,.lx2",function(e) {
        e.stopPropagation();
        var _obj = $(this);
        var selBox = _obj.find(".selectauto");
        var isShow = selBox.is(":visible");
        $(".selectauto").hide();
        if(!isShow){//是否已经显示了
          _obj.find(".selectauto").show();
        }
      }).on('click',".lx1 a",function(e) {
        e.stopPropagation();
        $(".selectauto").hide();
        _self.setNewSelect1($(this));
      }).on('click',".lx2 a",function(e) {
        e.stopPropagation();
        $(".selectauto").hide();
        _self.setNewSelect2($(this));
      });
    }
  };
  $.get('/template/eichitoo/xml/BuyData.xml', function(root){  //获取数据
    var buyData = {};//获取省市数据 
    var isIE = /msie/.test(navigator.userAgent.toLowerCase());
    //IE很变态，返回的字符无法解析成XML，需要重新建立object   红色字体部分是对IE进行判断.
    var xml;
    // if (isIE) {
    //   xml = new ActiveXObject("Microsoft.XMLDOM");
    //   xml.async = false;
    //   xml.loadXML(root);
    // } else {
      xml = root;
    // }
    $(xml).find('node').each(function(){   
      var $node = $(this);     
      var province = $node.attr("province");
      var city = $node.attr("city"); 

      if(!buyData.hasOwnProperty(province)){//添加省   
        buyData[province] = {};
      }
      if(!buyData[province].hasOwnProperty(city)){//添加区/市
        buyData[province][city] = [];
      }
      var info = {
        "name":$node.attr("name"),
        "addr":$node.attr("addr"),
        "province":province,
        "city":city
      }
      buyData[province][city].push(info);
    });   
    newDoubleSelect.bindEvents();
    newDoubleSelect.initDoubleSelect(buyData);
  },'xml');
});