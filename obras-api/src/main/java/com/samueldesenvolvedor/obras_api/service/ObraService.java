package com.samueldesenvolvedor.obras_api.service;

import com.samueldesenvolvedor.obras_api.dto.ProgressoObraDTO;
import com.samueldesenvolvedor.obras_api.model.Obra;
import com.samueldesenvolvedor.obras_api.model.Status;
import com.samueldesenvolvedor.obras_api.repository.ObraRepository;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ObraService {

    @Autowired
    private ObraRepository obraRepository;

    public List<Obra> buscarTodasObras() {
        return obraRepository.findAll();
    }

    public Optional<Obra> buscarObraPorId(Long id) {
        return obraRepository.findById(id);
    }

    public Obra salvarObra(Obra obra) {
        return obraRepository.save(obra);
    }

    public void deletarObra(Long id) {
        obraRepository.deleteById(id);
    }

    public Obra atualizarObra(Long id, Obra novaObra) {
        Optional<Obra> existente = obraRepository.findById(id);

        if (existente.isPresent()) {
            Obra obra = existente.get();
            obra.setNome(novaObra.getNome());
            obra.setDescricao(novaObra.getDescricao());
            obra.setDataInicio(novaObra.getDataInicio());
            obra.setDataPrevisaoFim(novaObra.getDataPrevisaoFim());
            return obraRepository.save(obra);
        } else {
            return null;
        }
    }

    public ProgressoObraDTO calcularProgresso(Long obraId) {

        Obra obra = obraRepository.findById(obraId)
                .orElseThrow(() -> new RuntimeException("Obra não encontrada com ID: " + obraId));

        int totalEtapas = obra.getEtapas().size();
        int etapasConcluidas = (int) obra.getEtapas().stream()
                .filter(etapa -> etapa.getStatus() == Status.CONCLUIDA)
                .count();

        double percentualConcluido = totalEtapas == 0 ? 0.0 : ((double) etapasConcluidas / totalEtapas) * 100.0;

        return new ProgressoObraDTO(
                obra.getId(),
                obra.getNome(),
                totalEtapas,
                etapasConcluidas,
                percentualConcluido
        );
    }
}