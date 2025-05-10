package klu.repository;

import klu.model.Books;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BooksRepository extends JpaRepository<Books, String> {
    
    // Optional: Add method to find book by ISBN
    Optional<Books> findByIsbn(String isbn);
}
