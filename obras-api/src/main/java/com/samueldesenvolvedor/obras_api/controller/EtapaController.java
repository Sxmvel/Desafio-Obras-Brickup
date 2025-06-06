package com.samueldesenvolvedor.obras_api.controller;

import com.samueldesenvolvedor.obras_api.model.Etapa;
import com.samueldesenvolvedor.obras_api.service.EtapaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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
    public ResponseEntity<Etapa> buscarEtapaPorId(@PathVariable Long id) {
        Optional<Etapa> etapa = etapaService.buscarEtapaPorId(id);
        return etapa.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Etapa> salvarEtapa(@RequestBody Etapa etapa) {
        Etapa etapaSalva = etapaService.salvarEtapa(etapa);
        return ResponseEntity.ok(etapaSalva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Etapa> atualizarEtapa(@PathVariable Long id, @RequestBody Etapa etapaAtualizada) {
        Optional<Etapa> etapaExistente = etapaService.buscarEtapaPorId(id);
        if (etapaExistente.isPresent()) {
            Etapa etapa = etapaExistente.get();
            etapa.setNome(etapaAtualizada.getNome());
            etapa.setResponsavel(etapaAtualizada.getResponsavel());
            etapa.setDataInicio(etapaAtualizada.getDataInicio());
            etapa.setDataFim(etapaAtualizada.getDataFim());
            etapa.setStatus(etapaAtualizada.getStatus());

            Etapa etapaSalva = etapaService.salvarEtapa(etapa);
            return ResponseEntity.ok(etapaSalva);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEtapa(@PathVariable Long id) {
        Optional<Etapa> etapa = etapaService.buscarEtapaPorId(id);
        if (etapa.isPresent()) {
            etapaService.deletarEtapa(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}