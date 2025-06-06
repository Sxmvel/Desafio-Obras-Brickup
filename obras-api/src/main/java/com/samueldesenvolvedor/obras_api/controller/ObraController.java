package com.samueldesenvolvedor.obras_api.controller;

import com.samueldesenvolvedor.obras_api.model.Obra;
import com.samueldesenvolvedor.obras_api.service.ObraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/obras")
public class ObraController {

    @Autowired
    private ObraService obraService;

    @GetMapping
    public List<Obra> listarObras() {
        return obraService.buscarTodasObras();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Obra> buscarPorId(@PathVariable Long id) {
        Optional<Obra> obra = obraService.buscarObraPorId(id);
        return obra.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Obra criarObra(@RequestBody Obra obra) {
        return obraService.salvarObra(obra);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Obra> atualizarObra(@PathVariable Long id, @RequestBody Obra novaObra) {
        Obra atualizada = obraService.atualizarObra(id, novaObra);
        if (atualizada != null) {
            return ResponseEntity.ok(atualizada);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarObra(@PathVariable Long id) {
        obraService.deletarObra(id);
        return ResponseEntity.noContent().build();
    }
}