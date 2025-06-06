package com.samueldesenvolvedor.obras_api.service;

import com.samueldesenvolvedor.obras_api.model.Etapa;
import com.samueldesenvolvedor.obras_api.repository.EtapaRepository;
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

    public Etapa salvarEtapa(Etapa etapa) {
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