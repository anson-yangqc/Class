var webgis = webgis ? webgis : {};

//API封装
;(function(){
	
	webgis.Lines = function(initOptions){
		var _this = this;
		this.sid = webgis.common.getId();
		this.map = initOptions.map;
		this._pointHolder = {};
    
		// 添加标记点
		function addPoint(options){
			  var map = options.map.getGmap();
			  var position = options.position;
			  var pointPositionText = position["lat"]+"|"+position["lng"];
			  var info = options.info;
			  var color = options.color;
			  var scopes = options.scopes;
			  var curve = options.curve;

			  if(_this._pointHolder[pointPositionText]){
				  return _this._pointHolder[pointPositionText];
			  }
			  options.scopeId = _this.map.sid + "_curve";
	    	   options.titleStyle = options.titleStyle || {
	    			   offset:{x: 0,y: 0},
	    			   color: "#FFFFFF"
	    	   };
	    	   var clickFn = options.click;
	    	   options.click = function(options) {
   			    	if(clickFn){
   			    		clickFn(options);
   			    	}
   				}
	    	   var point;
	    	   
	    	   if(options.icon && !options.icon.path){
	    		   point = new webgis.Marker(options);
		    	} else {
		    		point = new webgis.Marker(options);
	   			    point.colorValue = color;
		    		point.restore = function(){
				    	var icons = this.get('icons');
						if(Array.isArray(icons)){
							for(var k=0;k<icons.length;k++){
								icons[k].icon.strokeColor = this.colorValue;
							}
							this.set('icons', icons);
						}
				    }
		    	}
      		    point.options = options;
      		    point.info = info;
   			    point.curve = curve;
   			    point.color = color;
	   			    
   			    _this._pointHolder[pointPositionText] = point;
      		    return point;
		};
		function init(initOptions){
			for(var i=0,l=initOptions.lineDatas.length;i<l;i++){
				var data = initOptions.lineDatas[i];
				data.map = _this.map;
				var _polyLine = new webgis.Polyline(data);
				_polyLine.fromPoint = addPoint({
					map: this.map,
					position: data.fromPoint,
					title: data.fromPointLabel,
					showTitle: data.showFromPointLabel,
					titleStyle: data.fromPointLabelStyle,
					icon: data.fromPointIcon,
					info: data.fromPointInfoHtml,
					infoCss: data.pointInfoCss,
					infoShowAction: data.pointInfoShowAction,
					color: data.fromPointColor,
					animate: data.animate,
					scopes: data.tags,
					curve: _polyLine,
					click: data.pointClick
				});
				// 绘制线端点
				_polyLine.toPoint = addPoint({
					map: this.map,
					position: data.toPoint,
					title: data.toPointLabel,
					showTitle: data.showToPointLabel,
					titleStyle: data.toPointLabelStyle,
					icon: data.toPointIcon,
					info: data.toPointInfoHtml,
					infoCss: data.pointInfoCss,
					infoShowAction: data.pointInfoShowAction,
					color: data.toPointColor,
					animate: data.animate,
					scopes: data.tags,
					curve: _polyLine,
					click: data.pointClick
				});
			}
		};

		// 
		webgis.Lines.prototype.add = function(options){
			if(options && options.lineDatas.length>0)init(options);
		};
		// 删除
		webgis.Lines.prototype.remove = function(tags){
			webgis.event.fireEvent("POLYLINE_REMOVE", '', tags?tags:this.map);
		};
		// 显示
		webgis.Lines.prototype.show = function(tags){
			webgis.event.fireEvent("POLYLINE_SHOW", '', tags?tags:this.map);
		};
		
		// 隐藏
		webgis.Lines.prototype.hide = function(tags){
			webgis.event.fireEvent("POLYLINE_HIDE", '', tags?tags:this.map);
		};
		
		
		init(initOptions);
	};
})();
