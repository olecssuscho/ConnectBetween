extends Node2D
@onready var x_preview: Sprite2D = $explosion_preview/x_preview
@onready var y_preview: Sprite2D = $explosion_preview/y_preview

var life_timer: float = 10

func _ready() -> void:
	var tween = get_tree().create_tween()
	tween.set_ease(Tween.EASE_IN).set_trans(Tween.TRANS_CIRC)
	tween.tween_property(x_preview,"scale:x",100,0.2)
	tween.parallel().tween_property(y_preview,"scale:y",100,0.2)

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	if life_timer > 0:
		life_timer -= 0.1
	elif life_timer <= 0:
		for x in range(-9,10):
			g.create(preload("uid://b1iepihc8wl4l"),get_parent(),global_position + Vector2(x*16,0))
			for y in range(-9,10):
				g.create(preload("uid://b1iepihc8wl4l"),get_parent(),global_position + Vector2(0,y*16))
		queue_free()
