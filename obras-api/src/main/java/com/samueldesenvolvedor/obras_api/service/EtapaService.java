package com.samueldesenvolvedor.obras_api.service;

import com.samueldesenvolvedor.obras_api.model.Etapa;
import com.samueldesenvolvedor.obras_api.model.Obra;
import com.samueldesenvolvedor.obras_api.repository.EtapaRepository;
import com.samueldesenvolvedor.obras_api.repository.ObraRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class EtapaService {

    @Autowired
    private EtapaRepository etapaRepository;

    public List<Etapa> buscarTodasEtapas() {
        return etapaRepository.findAll();
    }

    public Optional<Etapa> buscarEtapaPorId(Long id) {
        return etapaRepository.findById(id);
    }

    @Autowired
    private ObraRepository obraRepository;

    public Etapa salvarEtapa(Etapa etapa) {
        if (etapa.getObra() == null || etapa.getObra().getId() == null) {
            throw new RuntimeException("A obra associada é obrigatória.");
        }

        Long obraId = etapa.getObra().getId();
        Obra obra = obraRepository.findById(obraId)
                .orElseThrow(() -> new RuntimeException("Obra com ID " + obraId + " não encontrada."));

        etapa.setObra(obra); // associa a obra de forma segura
        return etapaRepository.save(etapa);
    }

    public void deletarEtapa(Long id) {
        etapaRepository.deleteById(id);
    }

    public Etapa atualizarEtapa(Long id, Etapa novaEtapa) {
        Optional<Etapa> existente = etapaRepository.findById(id);
        if (existente.isPresent()) {
            Etapa etapa = existente.get();
            etapa.setNome(novaEtapa.getNome());
            etapa.setResponsavel(novaEtapa.getResponsavel());
            etapa.setDataInicio(novaEtapa.getDataInicio());
            etapa.setDataFim(novaEtapa.getDataFim());
            etapa.setStatus(novaEtapa.getStatus());
            etapa.setObra(novaEtapa.getObra());
            return etapaRepository.save(etapa);
        } else {
            return null;
        }
    }

}