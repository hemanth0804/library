package klu.controller;

import klu.model.BorrowRecord;
import klu.model.BorrowRecordManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/borrow")
@CrossOrigin(origins = "http://localhost:5173/") // Ensure this matches your frontend app's URL
public class BorrowRecordController {

    @Autowired
    private BorrowRecordManager borrowManager;

    // Borrow a book
    @PostMapping("/borrowBook")
    public String borrowBook(@RequestBody Map<String, String> data) {
        String isbn = data.get("isbn");
        String email = data.get("email");
        String dueDateStr = data.get("dueDate");

        try {
            Date dueDate = new SimpleDateFormat("yyyy-MM-dd").parse(dueDateStr);
            return borrowManager.borrowBook(isbn, email, dueDate);
        } catch (Exception e) {
            return "Invalid date format. Please use yyyy-MM-dd.";
        }
    }

    // Return a book
    @PostMapping("/returnBook")
    public String returnBook(@RequestBody Map<String, String> data) {
        Long recordId = Long.parseLong(data.get("recordId"));
        return borrowManager.returnBook(recordId);
    }

    // Get all borrow records
    @GetMapping("/all")
    public List<BorrowRecord> getAllRecords() {
        return borrowManager.getAllRecords();
    }

    // Get borrow records by user email
    @GetMapping("/user/{email}")
    public List<BorrowRecord> getRecordsByEmail(@PathVariable String email) {
        return borrowManager.getRecordsByUserEmail(email);
    }

    // Get unreturned borrow records
    @GetMapping("/unreturned")
    public List<BorrowRecord> getUnreturnedBooks() {
        return borrowManager.getUnreturnedBooks();
    }

}
