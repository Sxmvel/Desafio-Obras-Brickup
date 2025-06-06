package com.samueldesenvolvedor.obras_api.repository;

<<<<<<< HEAD
import com.samueldesenvolvedor.obras_api.model.Obra; // <- este é o import necessário
=======
import com.samueldesenvolvedor.obraapi.model.Obra;
>>>>>>> Repository
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ObraRepository extends JpaRepository<Obra, Long> {
    // O JpaRepository já fornece:
    // - save(Obra obra)
    // - findById(Long id)
    // - findAll()
    // - deleteById(Long id)
    // - e vários outros métodos prontos.
    
    // Caso queira adicionar buscas específicas, por exemplo:
    // List<Obra> findByNomeContaining(String nomeParcial);
}
