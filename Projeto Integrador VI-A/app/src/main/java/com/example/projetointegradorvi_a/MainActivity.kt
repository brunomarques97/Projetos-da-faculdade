package com.example.projetointegradorvi_a

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.projetointegradorvi_a.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)


        binding = ActivityMainBinding.inflate(layoutInflater)

        setContentView(binding.root)

        enableEdgeToEdge()
        ViewCompat.setOnApplyWindowInsetsListener(binding.main) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        binding.btIntegrantes.setOnClickListener {

            IrParaTelaIntegrantes()
        }
        binding.btJogo.setOnClickListener {

            IrParaJogo()
        }
    }
    private fun IrParaTelaIntegrantes(){

        val integrantes = Intent(this, TelaIntegrantes::class.java)
        startActivity(integrantes)
    }

    private fun IrParaJogo(){

        val jogo = Intent(this, Jogo::class.java)
        startActivity(jogo)
    }
}