package com.example.projetointegradorvi_a

import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.RectF
import kotlin.math.abs
import kotlin.math.cos
import kotlin.math.hypot
import kotlin.math.sin

class Bola(
    var x: Float,
    var y: Float,
    var radius: Float,
    var color: Int = Color.YELLOW
) {
    var vx: Float = 0f
    var vy: Float = -600f
    val rect = RectF(x - radius, y - radius, x + radius, y + radius)

    /** Atualiza posição e trata colisões com as bordas (exceto fundo). */
    fun update(dtSeconds: Float, screenWidth: Int, screenHeight: Int) {
        if (dtSeconds <= 0f) {
            rect.set(x - radius, y - radius, x + radius, y + radius)
            return
        }

        x += vx * dtSeconds
        y += vy * dtSeconds

        // Paredes laterais
        if (x - radius < 0f) { x = radius; vx = -vx }
        if (x + radius > screenWidth) { x = screenWidth - radius; vx = -vx }

        // Teto
        if (y - radius < 0f) { y = radius; vy = -vy }

        rect.set(x - radius, y - radius, x + radius, y + radius)
    }

    /**
     * Colisão com a raquete.
     * Reflete a bola para cima e aplica "ângulo" conforme a batida (efeito tipo Breakout).
     */
    fun collideWith(paddle: RectF): Boolean {
        if (!RectF.intersects(rect, paddle)) return false

        val paddleCenter = paddle.left + paddle.width() / 2f
        val offset = (x - paddleCenter) / (paddle.width() / 2f) // -1..1
        val speed = hypot(vx.toDouble(), vy.toDouble()).toFloat()

        // Ângulo máximo de 60°
        val maxAngle = Math.toRadians(60.0).toFloat()
        val angle = (offset.coerceIn(-1f, 1f)) * maxAngle

        // Direção para cima com variação lateral pelo offset
        vx = speed * sin(angle)
        vy = -abs(speed * cos(angle))

        // Evita "grudar" na raquete
        y = paddle.top - radius - 0.5f
        rect.set(x - radius, y - radius, x + radius, y + radius)
        return true
    }

    /** Aumenta um pouco a velocidade após cada batida. */
    fun increaseSpeed(factor: Float = 1.05f) {
        vx *= factor
        vy *= factor
    }

    fun draw(canvas: Canvas, paint: Paint) {
        paint.color = color
        canvas.drawCircle(x, y, radius, paint)
    }
}