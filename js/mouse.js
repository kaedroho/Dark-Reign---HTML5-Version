function MousePointer(game)
{
	this.type = 0; //0 - simple
	this.show_cursor = false;
	this.position = {x: 0, y: 0};
	
	this.draw_time = 0;
	this.draw_frame = 0;
	
	this.is_selection = false;
	this.selection_start_pos = {};
	
	this.panning_region_time = 0;
	this.direction_to_cursor = [18, 20, 16, 0, 22, 0, 21, 0, 17, 19, 15];
	
	game.resources.addImage('cursors', 'images/cursors.png');
	
	this.draw = function(current_time)
	{
		if (!this.show_cursor)
		{
			this.panning_region_time = current_time;
			return;
		}
		
		//Selection draw
		if (this.is_selection)
		{
			var sel_size = this._getSelectionSize();
			
			game.viewport_ctx.strokeStyle = '#fff';
			game.viewport_ctx.lineWidth = 1;
			game.viewport_ctx.strokeRect(
				this.selection_start_pos.x - game.viewport_x, 
				this.selection_start_pos.y - game.viewport_y, 
				sel_size.width, sel_size.height);
			
			if (Math.abs(sel_size.width)>3 || Math.abs(sel_size.height)>3)
			{
				game.viewport_ctx.drawImage(game.resources.get('cursors'), 0, 0, 17, 24, this.position.x, this.position.y, 17, 24);
				return;
			}
		}
		
		//Cursor draw
		
		if (game.debug.mouse_panning)
		{
			var move_x = 0, move_y = 0, cur_icon;
			
			if (this.position.x < PANNING_FIELD_SIZE)
				move_x = -1;
			else if (this.position.x > (VIEWPORT_SIZE - PANNING_FIELD_SIZE))
				move_x = 1;
			else
				game.viewport_move_mouse_x = 0;
			
			if (this.position.y < PANNING_FIELD_SIZE)
				move_y = -1;
			else if (this.position.y > (VIEWPORT_SIZE - PANNING_FIELD_SIZE))
				move_y = 1;
			else
				game.viewport_move_mouse_y = 0;
			
			if (move_x!=0 || move_y!=0)
			{
				if  (current_time > (this.panning_region_time + 800))
				{
					game.viewport_move_mouse_x = move_x;
					game.viewport_move_mouse_y = move_y;
					
					//check if can move
					if (move_x != 0)
						if ((move_x==-1 && game.viewport_x<=0) || (move_x==1 && game.viewport_x>=game.level.max_movement.x))
							move_x = 0;
					if (move_y != 0)
						if ((move_y==-1 && game.viewport_y<=0) || (move_y==1 && game.viewport_y>=game.level.max_movement.y))
							move_y = 0;
					
					//Draw move pointer
					if (move_x==0 && move_y==0)
					{
						if (game.viewport_move_mouse_y == -1)
							cur_icon = 14;
						else if (game.viewport_move_mouse_y == 1)
							cur_icon = 13;
						else if (game.viewport_move_mouse_x == -1)
							cur_icon = 12;
						else
							cur_icon = 11;
						this._drawCursor(current_time, cur_icon, 4);
					}
					else
						this._drawCursor(current_time, this.direction_to_cursor[(move_x+1)*4 + (move_y+1)], 7);
					
					return;
				}
			}
			else
				this.panning_region_time = current_time;
		}
		
		var pos = this.getCellPosition(), ptype;
		if (game.action_state != ACTION_STATE_NONE)
		{
			switch (game.action_state)
			{
				case ACTION_STATE_SELL:
					this._drawCursor(current_time, 6, 6);
					break;
				case ACTION_STATE_POWER:
					this._drawCursor(current_time, 5, 8);
					break;
				case ACTION_STATE_BUILD:
					AbstractBuilding.drawBuildMouse(game.action_state_options.object, pos.x, pos.y);
					this._drawCursor(current_time, 7, 1);
					break;
				case ACTION_STATE_REPAIR:
					this._drawCursor(current_time, 8, 9);
					break;
				case ACTION_STATE_ATTACK:
					if (game.selected_info.can_attack_ground)
						this._drawCursor(current_time, 3, 8);
					else
						this._drawCursor(current_time, 4, 2);
					break;
			}
		}
		else if (MapCell.getSingleUserId(game.level.map_cells[pos.x][pos.y]) != -1)
		{
			var objid = MapCell.getSingleUserId(game.level.map_cells[pos.x][pos.y]), draw_default = false;
			if (game.objects[objid].is_building)
			{
				if (game.selected_info.harvesters && game.objects[objid].isHarvestPlatform())
					this._drawCursor(current_time, 9, 8);
				else if (game.selected_info.humans && game.objects[objid]._proto === FieldHospitalBuilding)
					this._drawCursor(current_time, 10, 5);
				else 
					draw_default = true;
			}	
			else
				draw_default = true;
			
			if (draw_default)
				this._drawCursor(current_time, 1, 8);
		}
		else if (game.selected_objects.length>0 && !game.selected_info.is_building)
		{
			ptype = game.level.map_cells[pos.x][pos.y].type
			if (!game.selected_info.is_fly && (ptype==CELL_TYPE_WATER || ptype==CELL_TYPE_NOWALK))
				this._drawCursor(current_time, 4, 2);
			else
				this._drawCursor(current_time, 2, 7);
		}
		else
		{
			//Normal cursor
			this.draw_frame = 0;
			game.viewport_ctx.drawImage(game.resources.get('cursors'), 0, 0, 17, 24, this.position.x, this.position.y, 17, 24);
		}
	}
	
	this._drawCursor = function(current_time, cursorid, frames)
	{
		if ((current_time - this.draw_time) > 100)
		{
			this.draw_frame = ((this.draw_frame + 1) % frames);
			this.draw_time = current_time;
		}
		game.viewport_ctx.drawImage(
			game.resources.get('cursors'), this.draw_frame*32, cursorid*32, 32, 32, 
			this.position.x - 16, this.position.y - 16, 32, 32
		);
	}
	
	this.getCellPosition = function()
	{
		return {
			x: Math.floor((this.position.x + game.viewport_x)/CELL_SIZE), 
			y: Math.floor((this.position.y + game.viewport_y)/CELL_SIZE)
		};
	}
	
	this.selectionStart = function()
	{
		switch (game.action_state)
		{
			case ACTION_STATE_NONE:
				this.is_selection = true;
				this.selection_start_pos = {
					x: game.viewport_x + this.position.x + 0.5,
					y: game.viewport_y + this.position.y + 0.5
				};
				break;
		}
	}
	
	this.selectionStop = function()
	{
		var pos = this.getCellPosition(), unitid;
		
		this.is_selection = false;
		
		switch (game.action_state)
		{
			case ACTION_STATE_NONE:
				var sizes = this._getSelectionSize();
		
				if (Math.abs(sizes.width)<4 && Math.abs(sizes.height)<4)
				{
					unitid = MapCell.getSingleUserId(game.level.map_cells[pos.x][pos.y]);
					//Is harvesting?
					if (unitid!=-1 && game.objects[unitid].is_building && game.selected_info.harvesters && game.objects[unitid].isHarvestPlatform())
					{
						for (var i in game.selected_objects)
							game.objects[game.selected_objects[i]].harvest(game.objects[unitid]);
					}
					else if (unitid!=-1 && game.selected_info.humans && game.objects[unitid]._proto === FieldHospitalBuilding) //Heal humans ?
					{
						for (var i in game.selected_objects)
							game.objects[game.selected_objects[i]].goHeal(game.objects[unitid], (i==0));
					}
					else
						game.onClick('left');
				}
				else
				{
					var start_x = Math.floor(this.selection_start_pos.x/CELL_SIZE), 
						start_y = Math.floor(this.selection_start_pos.y/CELL_SIZE);

					game.regionSelect(Math.min(start_x, pos.x), Math.min(start_y, pos.y), Math.max(start_x, pos.x), Math.max(start_y, pos.y));
				}
				break;
			
			case ACTION_STATE_BUILD:
				if (AbstractBuilding.canBuild(game.action_state_options.object, pos.x, pos.y, game.selected_objects[0]))
				{
					game.objects[game.selected_objects[0]].build(pos.x, pos.y, game.action_state_options.object);
					game.cleanActionState();
				}
				else
					game.resources.play('cant_build');
				break;
				
			case ACTION_STATE_SELL:
				if (game.level.map_cells[pos.x][pos.y].building != -1)
					game.objects[game.level.map_cells[pos.x][pos.y].building].sell();
				break;
				
			case ACTION_STATE_ATTACK:
				var target;
				unitid = MapCell.getSingleUserId(game.level.map_cells[pos.x][pos.y]);
				
				if (unitid == -1)
					target = {type: 'ground', x: pos.x, y: pos.y};
				else
					target = {type: 'object', objid: unitid};
				
				for (var i in game.selected_objects)
					game.objects[game.selected_objects[i]].attack(target);
				game.toggleActionState(ACTION_STATE_ATTACK);
				break;
		}
	}
	
	this._getSelectionSize = function()
	{
		return {
			width: game.viewport_x + this.position.x - this.selection_start_pos.x + 0.5,
			height: game.viewport_y + this.position.y - this.selection_start_pos.y + 0.5
		};
	}
}