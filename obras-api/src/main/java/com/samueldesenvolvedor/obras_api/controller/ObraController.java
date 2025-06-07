package com.samueldesenvolvedor.obras_api.controller;

import com.samueldesenvolvedor.obras_api.dto.ProgressoObraDTO;
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
    public ResponseEntity<Obra> buscarObraPorId(@PathVariable Long id) {
        Optional<Obra> obra = obraService.buscarObraPorId(id);
        return obra.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Obra> salvarObra(@RequestBody Obra obra) {
        Obra obraSalva = obraService.salvarObra(obra);
        return ResponseEntity.ok(obraSalva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Obra> atualizarObra(@PathVariable Long id, @RequestBody Obra obraAtualizada) {
        Obra obra = obraService.atualizarObra(id, obraAtualizada);
        if (obra != null) {
            return ResponseEntity.ok(obra);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarObra(@PathVariable Long id) {
        Optional<Obra> obra = obraService.buscarObraPorId(id);
        if (obra.isPresent()) {
            obraService.deletarObra(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/progresso")
    public ResponseEntity<ProgressoObraDTO> obterProgressoObra(@PathVariable Long id) {
        ProgressoObraDTO progresso = obraService.calcularProgresso(id);
        return ResponseEntity.ok(progresso);
    }
}