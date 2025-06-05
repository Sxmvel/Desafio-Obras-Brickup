package com.samueldesenvolvedor.obras_api.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Entity
public class Obra {

    @Id // Chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto incremento no MySQL

    // Atributos da obra.
    private Long id; // Id da obra
    private String nome; // Nome da Obra
    private String descricao; // Descricao da obra
    private LocalDate dataInicio; // Data inicial
    private LocalDate dataPrevisaoFim; // Data Final

    // Lista de etapas relacionadas a essa obra (relacionamento 1:N)
    @OneToMany(mappedBy = "obra", cascade = CascadeType.ALL, orphanRemoval = true)

    private List<Etapa> etapas; // Lista do TIPO etapas que ira dizer a etapa que a obra se encontra PENDENTE, EM_ANDAMENTO ou CONCLUIDA.

    // Construtores Da Classe Obra
    public Obra() {
        //Default
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
