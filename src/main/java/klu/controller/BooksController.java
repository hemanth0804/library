package klu.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import klu.model.Books;
import klu.model.BooksManager;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "http://localhost:5173/")
public class BooksController {

    @Autowired
    private BooksManager booksManager;

    @PostMapping("/add")
    public String addBook(@RequestBody Books book) {
        booksManager.addBook(book);
        return "Book added successfully";
    }

    @GetMapping("/getall")
    public List<Books> getAllBooks() {
        return booksManager.getAllBooks();
    }

    @GetMapping("/get/{isbn}")
    public Books getBook(@PathVariable("isbn") String isbn) {
        return booksManager.getBookByIsbn(isbn).orElse(null);
    }

    @PostMapping("/update")
    public String updateBook(@RequestBody Books book) {
        booksManager.updateBook(book.getIsbn(), book);
        return "Book updated successfully";
    }

    @PostMapping("/delete")
    public String deleteBook(@RequestBody Map<String, String> data) {
        booksManager.deleteBook(data.get("isbn"));
        return "Book deleted successfully";
    }

    @PutMapping("/{isbn}/borrow")
    public ResponseEntity<Books> borrowBook(@PathVariable String isbn, @RequestBody Map<String, Boolean> availability) {
        Books updatedBook = booksManager.updateAvailability(isbn, availability.get("availabilityStatus"));
        
        if (updatedBook != null) {
            return ResponseEntity.ok(updatedBook); // Success
        }
        return ResponseEntity.notFound().build(); // Book not found
    }


}
