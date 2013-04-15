function MapEditor(level)
{
	this.ctx = {};
	this.map = [];
	this.cur_type = 2;
	
	this.from_point = {};
	this.to_point = {};
	this.path = [];
	
	this.level = level;
	
	this.resources = new ResourseLoader();
	
	this.init = function()
	{
		var x, y;
		
		this.resources.addImage('map-tiles', 'images/levels/'+level.tiles);
		this._loadMapResources();
		this.resources.onComplete = function(){
			level.generateMap();
		};

		this.drawGrid();
		
		this.map = level.map_cells;
		
		for (x=0; x<level.size.x-1; ++x)
			for (y=0; y<level.size.y-1; ++y)
				this._drawCell(x, y, this.map[x][y]);
	};
	
	this._loadMapResources = function()
	{
		//Map objects
		for (var i in level.map_object_proto)
			this.resources.addImage('mapobj_'+i, level.map_object_proto[i].image);
	};
	
	this.drawGrid = function()
	{
		var $canvas = $('#grid');
		
		$canvas
			.attr('width', level.size.x*CELL_SIZE)
			.attr('height', level.size.y*CELL_SIZE);
		
		this.ctx = $canvas.get(0).getContext('2d');
		
		this.ctx.strokeStyle = '#ffffff';
		this.ctx.beginPath();

		for (var i=0; i<=level.size.x; ++i)
		{
			this.ctx.moveTo(i*CELL_SIZE + 12.5, 0);
			this.ctx.lineTo(i*CELL_SIZE + 12.5, level.size.y*CELL_SIZE);
		}
		for (i=0; i<=level.size.y; ++i)
		{
			this.ctx.moveTo(0, i*CELL_SIZE + 12.5);
			this.ctx.lineTo(level.size.x*CELL_SIZE, i*CELL_SIZE + 12.5);
		}
		this.ctx.stroke();
	};
	
	this.clicked = function(x, y)
	{
		var cell_x = Math.floor((x - 12) / CELL_SIZE), cell_y = Math.floor((y - 12) / CELL_SIZE);
		
		if (cell_x<0 || cell_y<0 || cell_x>=level.size.x-1 || cell_y>=level.size.y-1)
			return;
		
		if (this.map[cell_x][cell_y] == this.cur_type)
			return;
		
		this._drawCell(cell_x, cell_y, this.cur_type);
		
		this.map[cell_x][cell_y] = this.cur_type;
	};
	
	this._drawCell = function(x, y, type)
	{
		var draw_x = x*CELL_SIZE + 13.5, draw_y = y*CELL_SIZE + 13.5;
		this.ctx.clearRect(draw_x, draw_y, 22, 22);
		switch (type)
		{
			case 0:
				break;
			case 1:
				this.ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
				this.ctx.fillRect(draw_x, draw_y, 22, 22);
				break;
			case 2:
				this.ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
				this.ctx.fillRect(draw_x, draw_y, 22, 22);
				break;
			case 3:
				this.ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
				this.ctx.fillRect(draw_x, draw_y, 22, 22);
				break;
		}
	};
	
	this.changeType = function(type)
	{
		this.cur_type = parseInt(type);
	};
	
	this.exportData = function()
	{
//		for (var i in this.map)
//			this.map[i][level.size.y - 1] = 0;
//		this.map[level.size.x - 1] = [];
//		for (i=0; i<level.size.y; ++i)
//			this.map[level.size.x - 1][i] = 0;
//		
		return JSON.stringify(this.map);
	};
}


$(function(){
	game = new MapEditor(new Level1());
	var qdraw = false;
	
	game.init();
	
	$('#grid').click(function(event){
		game.clicked(event.layerX, event.layerY);
	});
	$('#grid').mousedown(function(){
		qdraw = true;
	});
	$('#grid').mousemove(function(event){
		if (qdraw)
			game.clicked(event.layerX, event.layerY);
	});
	$('#grid').mouseup(function(){
		qdraw = false;
	});
	
	$('.radio').click(function(){
		game.changeType($(this).val());
	});
	
	$('#export').click(function(){
		$('#text').show().val(game.exportData());
	});
	
	$(document).keyup(function(event) {
		console.log(event.which);
		switch (event.which)
		{
			case 48: //0
			case 49: //1
			case 50: //2
			case 51: //3
				$('#type' + (event.which - 48)).click();
				break;
		}
	});
});