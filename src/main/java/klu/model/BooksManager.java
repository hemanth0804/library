package klu.model;

import klu.repository.BooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BooksManager {

    @Autowired
    private BooksRepository booksRepository;

    public List<Books> getAllBooks() {
        return booksRepository.findAll();
    }

    public Optional<Books> getBookByIsbn(String isbn) {
        return booksRepository.findById(isbn);
    }

    public Books addBook(Books book) {
        return booksRepository.save(book);
    }

    public Books updateBook(String isbn, Books bookDetails) {
        return booksRepository.findById(isbn).map(book -> {
            book.setTitle(bookDetails.getTitle());
            book.setAuthor(bookDetails.getAuthor());
            book.setPublisher(bookDetails.getPublisher());
            book.setPrice(bookDetails.getPrice());
            book.setAvailabilityStatus(bookDetails.isAvailabilityStatus());
            book.setAddedDate(bookDetails.getAddedDate());
            return booksRepository.save(book);
        }).orElseThrow(() -> new RuntimeException("Book not found with ISBN: " + isbn));
    }

    public void deleteBook(String isbn) {
        booksRepository.deleteById(isbn);
    }

    public Books updateAvailability(String isbn, boolean availabilityStatus) {
        return booksRepository.findById(isbn).map(book -> {
            book.setAvailabilityStatus(availabilityStatus);
            return booksRepository.save(book); // ✅ returns saved updated book
        }).orElseThrow(() -> new RuntimeException("Book not found with ISBN: " + isbn));
    }


}
