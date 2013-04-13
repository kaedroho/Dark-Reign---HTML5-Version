/**
 * ?movement: <= SetMovement(Linear, )
 * minimum_range: <= SetAttributes(minimum_range, maximum_range, ?maxammo?, firedelay, energypershot)
 * maximum_range
 * firedelay => shoot per msec. Calculation: 33.75*firedelay
 * can_shoot_ground <= CanShootGround() & CanShootGroundUnit() & CanShootBuilding()
 * can_shoot_flyer <= CanShootFlyer()
 * offence <= SetOffense(type strength ?area_effect?)
 * fire_sound <= SetFireSound()
 * hit_explosion <= SetHitExplosion()
 * bulet_speed <= SetSpeed(? ? ? ?)
 */
var WeaponConfig = {
	GatPlasma: {
		bulet_animation: 'eoplspr1_animation',
		minimum_range: 0,
		maximum_range: 5,
		firedelay: 108,
		can_shoot_ground: true,
		can_shoot_flyer: true,
		offence: {
			type: 'E3',
			strength: 10
		},
		fire_sound: 'gxigtwc0',
		hit_explosion: 'eoplsex2_explosion',
		bulet_speed: 700
	},
	LaserRifle: {
		bulet_animation: 'eolaspr2_animation',
		minimum_range: 0,
		maximum_range: 4,
		firedelay: 270,
		can_shoot_ground: true,
		can_shoot_flyer: false,
		offence: {
			type: 'E2',
			strength: 11
		},
		fire_sound: 'gxlgnwc0',
		hit_explosion: 'smalllaser_hitpuff_explosion',
		bulet_speed: 700
	},
	NeutronAss: {
		bulet_animation: 'eoncnpr0_animation',
		minimum_range: 0,
		maximum_range: 9,
		firedelay: 1080,
		can_shoot_ground: true,
		can_shoot_flyer: false,
		offence: {
			type: 'E3',
			strength: 180
		},
		fire_sound: 'gxneuwc0',
		hit_explosion: 'eoncnex0_explosion',
		bulet_speed: 2000
	},
	PlasmaRifle: {
		bulet_animation: 'eoplspr0_animation',
		minimum_range: 0,
		maximum_range: 4,
		firedelay: 270,
		can_shoot_ground: true,
		can_shoot_flyer: true,
		offence: {
			type: 'E3',
			strength: 18
		},
		fire_sound: 'gxbonwc0',
		hit_explosion: 'eoplsex0_explosion',
		bulet_speed: 700
	},
	PolyAcid: {
		bulet_animation: 'eorfgpr0_animation',
		minimum_range: 0,
		maximum_range: 5,
		firedelay: 675,
		can_shoot_ground: true,
		can_shoot_flyer: false,
		offence: {
			type: 'M3',
			strength: 15
		},
		fire_sound: 'gxextwc1',
		hit_explosion: 'eorfgex0_explosion',
		bulet_speed: 700
	}
};