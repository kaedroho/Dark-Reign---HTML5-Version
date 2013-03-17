function TrainingFacilityBuilding(pos_x, pos_y, player)
{
	this._proto = TrainingFacilityBuilding;
	this.player = player;
	
	this.init(pos_x, pos_y);
}

AbstractBuilding.setBuildingCommonOptions(TrainingFacilityBuilding);

TrainingFacilityBuilding.res_key = 'training_facility';
TrainingFacilityBuilding.obj_name = 'Training Facility';
TrainingFacilityBuilding.cost = 1500;
TrainingFacilityBuilding.build_time = 30;
TrainingFacilityBuilding.sell_cost = 750;
TrainingFacilityBuilding.sell_time = 15;
TrainingFacilityBuilding.health_max = 900;
TrainingFacilityBuilding.energy = 100;
TrainingFacilityBuilding.can_build = true;
TrainingFacilityBuilding.crater = 3;

TrainingFacilityBuilding.cell_size = {x: 5, y: 5};
TrainingFacilityBuilding.cell_matrix = [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1];
TrainingFacilityBuilding.move_matrix = [0,0,1,1,0,0,1,1,1,0,1,1,0,1,1,0,1,1,0,1,0,1,1,0,0];
TrainingFacilityBuilding.cell_padding = {x: 2, y: 2};
TrainingFacilityBuilding.image_size = {x: 117, y: 101};
TrainingFacilityBuilding.image_padding = {x: 0, y: 0};

TrainingFacilityBuilding.upgradable = true;