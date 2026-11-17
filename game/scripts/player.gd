extends Node2D

@onready var pos: Label = $"../ui/pos"
@onready var game_settings: GameSettings = $"../game_settings"
@onready var sprite: Sprite2D = $sprite


var direction: Vector2
var target_pos: Vector2

var gridPos: Vector2i

var state: States = States.idle
enum States {idle,moving}

const REPEAT_DELAY := 0.15
const TILE_SIZE := 16
const INPUT_DIRECTIONS := ["up","right","down","left"]

func _ready() -> void:
	pass


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	if INPUT_DIRECTIONS.any(func(action): return Input.is_action_just_pressed(action)):
		move_timer = 0.0
	elif move_timer > 0.0:
		move_timer = max(0.0, move_timer - delta)
	
	direction = Input.get_vector("left","right","up","down")
	
	handle_states()
	
	gridPos = Vector2i(round(global_position.x / TILE_SIZE),round(global_position.y / TILE_SIZE))
	pos.text = "x: " + str(gridPos.x) + " y: " + str(gridPos.y) 

func handle_states():
	match state:
		States.idle:
			if direction != Vector2.ZERO and move_timer == 0.0:
				change_state(States.moving)
		States.moving:
			pass

func change_state(newState: States):
	state_exit(state)
	state = newState
	state_enter(newState)

func state_enter(state: States):
	match state:
		States.moving:
			start_move()

func state_exit(state: States):
	pass


var move_timer: float

func start_move():
	move_timer = REPEAT_DELAY
	var possible_pos := (global_position + direction * TILE_SIZE).snapped(Vector2(TILE_SIZE, TILE_SIZE))
	if int(possible_pos.x / TILE_SIZE) in range(-game_settings.grid_size/2,game_settings.grid_size/2+1) \
	and int(possible_pos.y / TILE_SIZE) in range(-game_settings.grid_size/2,game_settings.grid_size/2+1):
		target_pos = possible_pos
		start_moving_particle()
		g.sfx(preload("uid://brydqs4jo3gty"))
	if !direction:
		change_state(States.idle)
	start_sprite_anim()
	
	var tween = get_tree().create_tween()
	tween.set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_OUT)
	tween.tween_property(self,"global_position",target_pos.snapped(Vector2(16,16)),0.1)
	
	await tween.finished
	change_state(States.idle)

var sprite_offset_tween: Tween

func start_moving_particle():
	var dust = g.create(preload("uid://dmxykjbxwtmqt"),get_parent(),global_position)
	if direction.x:
		dust.anim.play("hor")
		dust.scale.x = direction.x
	if direction.y:
		dust.anim.play("ver")
		dust.scale.y = direction.y

func start_sprite_anim():	
	if sprite_offset_tween:
		sprite_offset_tween.kill()
	sprite.offset = direction * 5
	sprite_offset_tween = create_tween()
	sprite_offset_tween.set_trans(Tween.TRANS_ELASTIC).set_ease(Tween.EASE_OUT)
	sprite_offset_tween.tween_property(sprite,"offset",Vector2.ZERO,0.5)
	
