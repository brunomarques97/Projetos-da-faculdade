package com.example.projetointegradorvi_a

import android.graphics.Canvas
import android.graphics.Paint
import android.graphics.RectF

data class Bloco(
    val x: Float,
    val y: Float,
    val width: Float,
    val height: Float,
    val color: Int,
    var destroyed: Boolean = false
) {
    val rect: RectF
        get() = RectF(x, y, x + width, y + height)

    fun draw(canvas: Canvas, paint: Paint) {
        if (!destroyed) {
            paint.color = color
            paint.style = Paint.Style.FILL
            canvas.drawRect(rect, paint)
        }
    }
}
