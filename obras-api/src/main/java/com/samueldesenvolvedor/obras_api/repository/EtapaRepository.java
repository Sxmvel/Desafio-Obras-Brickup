package com.samueldesenvolvedor.obras_api.repository;

import com.samueldesenvolvedor.obras_api.model.Etapa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EtapaRepository extends JpaRepository<Etapa, Long> {
    // Métodos CRUD básicos já vêm de JpaRepository<Etapa, Long>.

    // Exemplo de consulta personalizada: buscar todas as etapas de uma obra por ID
    // da obra
    List<Etapa> findByObraId(Long obraId);
}