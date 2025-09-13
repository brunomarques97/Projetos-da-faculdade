package com.example.projetointegradorvi_a

import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.RectF

/** Raquete com utilitário para manter-se dentro da tela. */
class Raquete(
    var x: Float,
    var y: Float,
    var width: Float,
    var height: Float,
    var color: Int = Color.WHITE
) {
    val rect = RectF(x, y, x + width, y + height)

    fun moveTo(centerX: Float, screenWidth: Int) {
        x = centerX - width / 2f
        if (x < 0f) x = 0f
        if (x + width > screenWidth) x = screenWidth - width
        rect.set(x, y, x + width, y + height)
    }

    fun draw(canvas: Canvas, paint: Paint) {
        paint.color = color
        rect.set(x, y, x + width, y + height)
        canvas.drawRect(rect, paint)
    }
}