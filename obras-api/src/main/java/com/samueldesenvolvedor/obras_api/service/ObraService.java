package com.samueldesenvolvedor.obras_api.service;

import com.samueldesenvolvedor.obras_api.model.Obra;

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

}