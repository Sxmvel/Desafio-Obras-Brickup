package com.samueldesenvolvedor.obras_api.controller;

import com.samueldesenvolvedor.obras_api.model.Etapa;
import com.samueldesenvolvedor.obras_api.service.EtapaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/etapas")
public class EtapaController {

    @Autowired
    private EtapaService etapaService;

    @GetMapping
    public List<Etapa> listarEtapas() {
        return etapaService.buscarTodasEtapas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Etapa> buscarPorId(@PathVariable Long id) {
        Optional<Etapa> etapa = etapaService.buscarEtapaPorId(id);
        return etapa.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Etapa criarEtapa(@RequestBody Etapa etapa) {
        return etapaService.salvarEtapa(etapa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Etapa> atualizarEtapa(@PathVariable Long id, @RequestBody Etapa novaEtapa) {
        Etapa atualizada = etapaService.atualizarEtapa(id, novaEtapa);
        if (atualizada != null) {
            return ResponseEntity.ok(atualizada);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEtapa(@PathVariable Long id) {
        etapaService.deletarEtapa(id);
        return ResponseEntity.noContent().build();
    }
}