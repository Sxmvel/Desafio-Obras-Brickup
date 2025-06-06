package com.samueldesenvolvedor.obras_api.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity
public class Etapa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto incremento

    private Long id;

    @ManyToOne
    @JoinColumn(name = "obra_id")
    private Obra obra;

    private String nome;

    @Enumerated(EnumType.STRING)
    private Status status; // armazena o valor como texto no banco - (ex: PENDENTE, EM_ANDAMENTO, etc.).
    private String responsavel;
    private LocalDate dataInicio;
    private LocalDate dataFim;


    // Construtores Da Classe Etapa 
    public Etapa() {
        //Dafault
    }

    public Etapa(Long id, Obra obra, String nome, Status status, String responsavel, LocalDate dataInicio,
            LocalDate dataFim) {
        this.id = id;
        this.obra = obra;
        this.nome = nome;
        this.status = status;
        this.responsavel = responsavel;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
    }
    

    // Getter e Setter Da Classe Etapa
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Obra getObra() {
        return obra;
    }
    public void setObra(Obra obra) {
        this.obra = obra;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public Status getStatus() {
        return status;
    }
    public void setStatus(Status status) {
        this.status = status;
    }
    public String getResponsavel() {
        return responsavel;
    }
    public void setResponsavel(String responsavel) {
        this.responsavel = responsavel;
    }
    public LocalDate getDataInicio() {
        return dataInicio;
    }
    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }
    public LocalDate getDataFim() {
        return dataFim;
    }
    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    // HASHCODE E EQUALS

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((obra == null) ? 0 : obra.hashCode());
        result = prime * result + ((nome == null) ? 0 : nome.hashCode());
        result = prime * result + ((status == null) ? 0 : status.hashCode());
        result = prime * result + ((responsavel == null) ? 0 : responsavel.hashCode());
        result = prime * result + ((dataInicio == null) ? 0 : dataInicio.hashCode());
        result = prime * result + ((dataFim == null) ? 0 : dataFim.hashCode());
        return result;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Etapa)) return false;
        Etapa etapa = (Etapa) o;
        return Objects.equals(id, etapa.id)
                && Objects.equals(obra != null ? obra.getId() : null,
                                  etapa.obra != null ? etapa.obra.getId() : null)
                && Objects.equals(nome, etapa.nome)
                && status == etapa.status
                && Objects.equals(responsavel, etapa.responsavel)
                && Objects.equals(dataInicio, etapa.dataInicio)
                && Objects.equals(dataFim, etapa.dataFim);
    }
    
}
