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

    // Atributos da obra.

    private Long id; // Id da obra
    private String nome; // Nome da Obra
    private String descricao; // Descricao da obra
    private LocalDate dataInicio; // Data inicial 
    private LocalDate dataPrevisaoFim; // Data Final

    // Lista de etapas relacionadas a essa obra (relacionamento 1:N)
    @OneToMany(mappedBy = "obra", cascade = CascadeType.ALL, orphanRemoval = true)

    private List<Etapa> etapas; // Lista do TIPO etapas que ira dizer a etapa que a obra se encontra PENDENTE, EM_ANDAMENTO ou CONCLUIDA.


}
