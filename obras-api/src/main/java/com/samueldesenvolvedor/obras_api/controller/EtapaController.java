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
    public List<Etapa> listarTodas() {
        return etapaService.buscarTodasEtapas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Etapa> buscarPorId(@PathVariable Long id) {
        Optional<Etapa> etapa = etapaService.buscarEtapaPorId(id);
        return etapa.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Etapa salvar(@RequestBody Etapa etapa) {
        return etapaService.salvarEtapa(etapa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Etapa> atualizarEtapa(@PathVariable Long id, @RequestBody Etapa etapaAtualizada) {
        Optional<Etapa> optionalEtapa = etapaService.buscarEtapaPorId(id);

        if (optionalEtapa.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Etapa etapaExistente = optionalEtapa.get();
        etapaExistente.setNome(etapaAtualizada.getNome());
        etapaExistente.setResponsavel(etapaAtualizada.getResponsavel());
        etapaExistente.setDataInicio(etapaAtualizada.getDataInicio());
        etapaExistente.setDataFim(etapaAtualizada.getDataFim());
        etapaExistente.setStatus(etapaAtualizada.getStatus());

        Etapa etapaSalva = etapaService.salvarEtapa(etapaExistente);
        return ResponseEntity.ok(etapaSalva);
    }
}