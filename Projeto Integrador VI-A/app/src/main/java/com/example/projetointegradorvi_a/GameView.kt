package com.example.projetointegradorvi_a

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.RectF
import android.util.AttributeSet
import android.view.MotionEvent
import android.view.View
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import android.media.AudioAttributes
import android.media.SoundPool
import kotlin.math.abs

class GameView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null
) : View(context, attrs) {

    private val paint = Paint(Paint.ANTI_ALIAS_FLAG)

    private lateinit var paddle: Raquete
    private lateinit var ball: Bola

    private lateinit var soundPool: SoundPool
    private var levelUpSoundId: Int = 0

    private var running = false
    private var lastNanos = 0L

    private var score = 0
    private var currentLevel = 3
    private var lives = 3 // número inicial de vidas

    // Fases do jogo
    private lateinit var levels: Array<Array<Bloco>>
    private var activeBricks = mutableListOf<Bloco>()

    // === MATRIZES DE NÍVEIS ===
    private val parede = arrayOf(
        arrayOf(1,1,1,1,1,1,1,1,1,1),
        arrayOf(1,1,1,1,1,1,1,1,1,1),
        arrayOf(1,1,1,1,1,1,1,1,1,1),
        arrayOf(1,1,1,1,1,1,1,1,1,1),
        arrayOf(1,1,1,1,1,1,1,1,1,1),
        arrayOf(1,1,1,1,1,1,1,1,1,1),
        arrayOf(1,1,1,1,1,1,1,1,1,1),
        arrayOf(1,1,1,1,1,1,1,1,1,1)
    )

    private val xadrez = arrayOf(
        arrayOf(1,0,1,0,1,0,1,0,1,0),
        arrayOf(0,1,0,1,0,1,0,1,0,1),
        arrayOf(1,0,1,0,1,0,1,0,1,0),
        arrayOf(0,1,0,1,0,1,0,1,0,1),
        arrayOf(1,0,1,0,1,0,1,0,1,0),
        arrayOf(0,1,0,1,0,1,0,1,0,1),
        arrayOf(1,0,1,0,1,0,1,0,1,0),
        arrayOf(0,1,0,1,0,1,0,1,0,1)
    )

    private val coracao = arrayOf(
        arrayOf(0,1,1,0,0,0,0,1,1,0),
        arrayOf(1,1,1,1,0,0,1,1,1,1),
        arrayOf(1,1,1,1,1,1,1,1,1,1),
        arrayOf(1,1,1,1,1,1,1,1,1,1),
        arrayOf(0,1,1,1,1,1,1,1,1,0),
        arrayOf(0,0,1,1,1,1,1,1,0,0),
        arrayOf(0,0,0,1,1,1,1,0,0,0),
        arrayOf(0,0,0,0,1,1,0,0,0,0)
    )

    private val ucs = arrayOf(
        arrayOf(1,0,1,1,1,1,1,1,1),
        arrayOf(1,0,1,1,0,0,1,0,0),
        arrayOf(1,0,1,1,0,0,1,1,1),
        arrayOf(1,0,1,1,0,0,0,0,1),
        arrayOf(1,1,1,1,1,1,1,1,1)
    )

    // === LOOP PRINCIPAL ===
    private val loop = object : Runnable {
        override fun run() {
            if (!running) return
            val now = System.nanoTime()
            val dt = if (lastNanos == 0L) 0f
            else ((now - lastNanos) / 1_000_000_000.0f).coerceAtMost(0.033f)
            lastNanos = now

            update(dt)
            invalidate()
            postOnAnimation(this)
        }
    }

    // === FUNÇÃO PARA CRIAR FASE A PARTIR DE UMA MATRIZ ===
    private fun createLevelFromMatrix(
        matrix: Array<Array<Int>>,
        brickWidth: Float,
        brickHeight: Float,
        offsetY: Float = 150f
    ): Array<Bloco> {
        val bricks = mutableListOf<Bloco>()
        val margin = 6f // espaçamento entre blocos

        for (row in matrix.indices) {
            for (col in matrix[row].indices) {
                if (matrix[row][col] == 1) {
                    val x = col * brickWidth + margin / 2
                    val y = offsetY + row * brickHeight + margin / 2
                    bricks.add(Bloco(x, y, brickWidth - margin, brickHeight - margin, Color.CYAN))
                }
            }
        }
        return bricks.toTypedArray()
    }

    // === VIBRAÇÃO CURTA AO INICIAR/REINICIAR ===
    private fun vibrateOnStart() {
        val vibrator = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            val vm = context.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as VibratorManager
            vm.defaultVibrator
        } else {
            context.getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            vibrator.vibrate(VibrationEffect.createOneShot(50, VibrationEffect.DEFAULT_AMPLITUDE))
        } else {
            @Suppress("DEPRECATION")
            vibrator.vibrate(50)
        }
    }

    // === INICIALIZA SOUNDPOOL E CARREGA O SOM ===
    private fun initSound() {
        val audioAttributes = AudioAttributes.Builder()
            .setUsage(AudioAttributes.USAGE_GAME)
            .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
            .build()

        soundPool = SoundPool.Builder()
            .setMaxStreams(1)
            .setAudioAttributes(audioAttributes)
            .build()

        levelUpSoundId = soundPool.load(context, R.raw.level_up, 1)
    }

    private fun playLevelUpSound() {
        soundPool.play(levelUpSoundId, 1f, 1f, 0, 0, 1f)
    }

    // === GERENCIAR CARREGAMENTO DE FASE ===
    private fun loadLevel(index: Int) {
        if (index < 0 || index >= levels.size) currentLevel = 0
        else currentLevel = index

        activeBricks.clear()
        activeBricks.addAll(levels[currentLevel].map { it.copy(destroyed = false) })
        resetBallAndPaddle()
    }

    private fun handleLevelCompletion() {
        playLevelUpSound()
        currentLevel++
        if (currentLevel >= levels.size) gameOver()
        else loadLevel(currentLevel)
    }

    private fun handleLifeLoss() {
        lives--
        if (lives <= 0) gameOver()
        else resetBallAndPaddle()
    }

    private fun resetBallAndPaddle() {
        paddle.moveTo(width / 2f, width)
        val radius = ball.radius
        val startY = paddle.y - radius - 8f
        ball.x = width / 2f
        ball.y = startY
        ball.vx = 0f
        ball.vy = -600f
        ball.update(0f, width, height)
    }

    private fun gameOver() {
        lives = 3
        score = 0
        currentLevel = 0
        loadLevel(currentLevel)
    }

    // === CICLO DE ATUALIZAÇÃO ===
    private fun update(dt: Float) {
        if (!::ball.isInitialized) return

        ball.update(dt, width, height)

        // Colisão com a raquete
        if (ball.collideWith(paddle.rect)) {
            ball.increaseSpeed()
            score += 10
        }

        // Colisão com blocos
        for (brick in activeBricks) {
            if (!brick.destroyed && RectF.intersects(ball.rect, brick.rect)) {
                brick.destroyed = true
                score += 10
                val dx = (ball.x - brick.rect.centerX())
                val dy = (ball.y - brick.rect.centerY())
                if (abs(dx) > abs(dy)) ball.vx = -ball.vx else ball.vy = -ball.vy
                break
            }
        }

        // Verifica vitória ou queda da bola
        if (activeBricks.all { it.destroyed }) handleLevelCompletion()
        else if (ball.y - ball.radius > height) handleLifeLoss()
    }

    // === OVERRIDES ===
    override fun onAttachedToWindow() {
        super.onAttachedToWindow()
        running = true
        lastNanos = 0L
        vibrateOnStart()
        initSound()
        postOnAnimation(loop)
    }

    override fun onDetachedFromWindow() {
        running = false
        soundPool.release()
        super.onDetachedFromWindow()
    }

    override fun onSizeChanged(w: Int, h: Int, oldw: Int, oldh: Int) {
        super.onSizeChanged(w, h, oldw, oldh)
        val d = resources.displayMetrics

        val paddleW = (100f * d.density).coerceAtMost(w * 0.9f)
        val paddleH = 20f * d.density
        val paddleY = h - 48f * d.density
        paddle = Raquete(w / 2f - paddleW / 2f, paddleY, paddleW, paddleH)

        val radius = 10f * d.density
        ball = Bola(w / 2f, paddleY - radius - 8f * d.density, radius)
        ball.vx = 0f
        ball.vy = -600f

        val brickWidth = w / 10f
        val brickHeight = 50f * d.density

        val level1 = createLevelFromMatrix(parede, brickWidth, brickHeight)
        val level2 = createLevelFromMatrix(xadrez, brickWidth, brickHeight)
        val level3 = createLevelFromMatrix(coracao, brickWidth, brickHeight)
        val level4 = createLevelFromMatrix(ucs, brickWidth, brickHeight)

        levels = arrayOf(level1, level2, level3,level4)
        loadLevel(currentLevel)
    }

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        canvas.drawColor(Color.BLACK)

        paint.color = Color.WHITE
        paint.textSize = 20f * resources.displayMetrics.scaledDensity
        canvas.drawText("Pontos: $score", 20f, 50f, paint)
        canvas.drawText("Vidas: $lives", width - 250f, 50f, paint)

        paddle.draw(canvas, paint)
        ball.draw(canvas, paint)

        for (brick in activeBricks) {
            if (!brick.destroyed) {
                paint.color = brick.color
                paint.style = Paint.Style.FILL
                canvas.drawRect(brick.rect, paint)

                paint.color = Color.BLACK
                paint.style = Paint.Style.STROKE
                paint.strokeWidth = 3f
                canvas.drawRect(brick.rect, paint)
            }
        }

        paint.style = Paint.Style.FILL
    }

    override fun onTouchEvent(event: MotionEvent): Boolean {
        when (event.actionMasked) {
            MotionEvent.ACTION_DOWN, MotionEvent.ACTION_MOVE -> {
                paddle.moveTo(event.x, width)
                invalidate()
                return true
            }
        }
        return super.onTouchEvent(event)
    }
}