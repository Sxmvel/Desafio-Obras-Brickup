package com.samueldesenvolvedor.obras_api.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity // Diz ao JPA que esta classe representa uma tabela no banco
@Data // Gera getters, setters, equals, hashCode, toString (Lombok)
@NoArgsConstructor // Gera construtor sem argumentos
@AllArgsConstructor // Gera construtor com todos os argumentos

public class Obra {
    @Id // Chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto incremento no MySQL
    private Long id;

    private String nome;
    private String descricao;

    private LocalDate dataInicio;
    private LocalDate dataPrevisaoFim;

    // Lista de etapas relacionadas a essa obra (relacionamento 1:N)
    @OneToMany(mappedBy = "obra", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Etapa> etapas;
}
