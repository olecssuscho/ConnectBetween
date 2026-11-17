extends Node


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass

func create(scene: PackedScene, parent: Node, pos: Vector2 = Vector2.ZERO):
	if !parent:
		return
	var new = scene.instantiate()
	new.global_position = pos
	parent.add_child(new)
	return new

func sfx(sound:AudioStream):
	var player = AudioStreamPlayer.new()
	add_child(player)
	player.stream = sound
	player.play()
	await player.finished
	player.queue_free()
