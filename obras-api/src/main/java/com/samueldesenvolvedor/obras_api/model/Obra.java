package com.samueldesenvolvedor.obras_api.model;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class Obra {

    @Id // Chave primária

    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto incremento no MySQL
    private Long id; // Id da obra

    @NotBlank(message = "O nome da obra é obrigatório")
    private String nome; // Nome da Obra

    @NotBlank(message = "A descrição da obra é obrigatória")
    private String descricao; // Descricao da obra

    @NotNull(message = "A data de início é obrigatória")
    private LocalDate dataInicio; // Data inicial

    @NotNull(message = "A data de previsão de fim é obrigatória")
    private LocalDate dataPrevisaoFim; // Data Final

   @OneToMany(mappedBy = "obra", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Etapa> etapas = new ArrayList<>();

    // Construtores Da Classe Obra
    public Obra() {
        // Default
    }

    public Obra(Long id, String nome, String descricao, LocalDate dataInicio, LocalDate dataPrevisaoFim,
            List<Etapa> etapas) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.dataInicio = dataInicio;
        this.dataPrevisaoFim = dataPrevisaoFim;
        this.etapas = etapas;
    }

    // GET AND SETTER DOS ATRIBUTOS DA CLASSE OBRA

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataPrevisaoFim() {
        return dataPrevisaoFim;
    }

    public void setDataPrevisaoFim(LocalDate dataPrevisaoFim) {
        this.dataPrevisaoFim = dataPrevisaoFim;
    }

    public List<Etapa> getEtapas() {
        return etapas;
    }

    public void setEtapas(List<Etapa> etapas) {
        this.etapas = etapas;
    }

    // ToString

    @Override
    public String toString() {
        return "Obra [id=" + id + ", nome=" + nome + ", descricao=" + descricao + ", dataInicio=" + dataInicio
                + ", dataPrevisaoFim=" + dataPrevisaoFim + ", etapas=" + etapas + "]";
    }

    // ===== equals e hashCode =====
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof Obra))
            return false;
        Obra obra = (Obra) o;
        return Objects.equals(id, obra.id)
                && Objects.equals(nome, obra.nome)
                && Objects.equals(descricao, obra.descricao)
                && Objects.equals(dataInicio, obra.dataInicio)
                && Objects.equals(dataPrevisaoFim, obra.dataPrevisaoFim);
        // Aqui, note que normalmente só comparamos o ID (ou campos naturais),
        // mas incluí esses campos para exemplo.
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((nome == null) ? 0 : nome.hashCode());
        result = prime * result + ((descricao == null) ? 0 : descricao.hashCode());
        result = prime * result + ((dataInicio == null) ? 0 : dataInicio.hashCode());
        result = prime * result + ((dataPrevisaoFim == null) ? 0 : dataPrevisaoFim.hashCode());
        result = prime * result + ((etapas == null) ? 0 : etapas.hashCode());
        return result;
    }

}
