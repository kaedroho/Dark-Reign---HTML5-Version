function FieldHospitalBuilding(pos_x, pos_y, player)
{
	this._proto = FieldHospitalBuilding;
	this.player = player;
	this.health = this._proto.health_max;
	
	this.init(pos_x, pos_y);
	this.setActionTime(this._proto.build_time);
	
	this.run = function()
	{
		switch (this.state)
		{
			case 'CONSTRUCTION':
				this._runStandartConstruction();
				break;
				
			case 'SELL':
				this._runStandartSell();
				break;
		}
	}
}

AbstractBuilding.setBuildingCommonOptions(FieldHospitalBuilding);

FieldHospitalBuilding.res_key = 'field_hospital';
FieldHospitalBuilding.obj_name = 'Field Hospital';
FieldHospitalBuilding.cost = 500;
FieldHospitalBuilding.sell_cost = 250;
FieldHospitalBuilding.health_max = 720;
FieldHospitalBuilding.build_time = 10;
FieldHospitalBuilding.energy = 100;
FieldHospitalBuilding.enabled = false;
FieldHospitalBuilding.can_build = true;

FieldHospitalBuilding.cell_size = {x: 4, y: 3};
FieldHospitalBuilding.cell_matrix = [1,1,1,1,1,1,1,1,1,0,1,1];
FieldHospitalBuilding.move_matrix = [1,1,0,1,0,1,1,1,1,0,1,1];
FieldHospitalBuilding.cell_padding = {x: 2, y: 1};
FieldHospitalBuilding.image_size = {x: 94, y: 69};
FieldHospitalBuilding.image_padding = {x: -2, y: -2};
FieldHospitalBuilding.shadow_image_size = {x: 95, y: 70};
FieldHospitalBuilding.shadow_image_padding = {x: -2, y: -6};