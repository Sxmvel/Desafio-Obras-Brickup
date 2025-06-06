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
    public List<Obra> listarTodas() {
        return obraService.buscarTodasObras();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Obra> buscarPorId(@PathVariable Long id) {
        Optional<Obra> obra = obraService.buscarObraPorId(id);
        return obra.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Obra salvar(@RequestBody Obra obra) {
        return obraService.salvarObra(obra);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Obra> atualizarObra(@PathVariable Long id, @RequestBody Obra obraAtualizada) {
        Optional<Obra> optionalObra = obraService.buscarObraPorId(id);

        if (optionalObra.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Obra obraExistente = optionalObra.get();
        obraExistente.setNome(obraAtualizada.getNome());
        obraExistente.setDescricao(obraAtualizada.getDescricao());
        obraExistente.setDataInicio(obraAtualizada.getDataInicio());
        obraExistente.setDataPrevisaoFim(obraAtualizada.getDataPrevisaoFim());

        Obra obraSalva = obraService.salvarObra(obraExistente);
        return ResponseEntity.ok(obraSalva);
    }
}