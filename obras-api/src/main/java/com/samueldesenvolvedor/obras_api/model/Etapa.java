package com.samueldesenvolvedor.obras_api.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity // informa ao JPA que essa classe representa uma tabela
@Data  //  Lombok cria automaticamente os métodos get, set, toString, equals, etc.
// Lombok cria os construtores.
@NoArgsConstructor 
@AllArgsConstructor

public class Etapa {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto incremento

    private Long id;

    @ManyToOne
    @JoinColumn(name = "obra_id")
    private Obra obra;

    private String nome; 

    @Enumerated(EnumType.STRING)
    private Status status; //  armazena o valor como texto no banco -  (ex: PENDENTE, EM_ANDAMENTO, etc.).

    private String responsavel;
    
    private LocalDate dataInicio;
    private LocalDate dataFim;

}