class_name GameSettings
extends Node

@export var grid_size: int = 5

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass


func _on_timer_timeout() -> void:
	g.create(preload("uid://dglb3vb3n6x8w"),get_parent(),
	(Vector2(randi_range(0,grid_size)-grid_size/2,randi_range(0,grid_size)-grid_size/2)*16).snapped(Vector2(16,16)))
