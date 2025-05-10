package klu.model;

import klu.repository.BooksRepository;
import klu.repository.BorrowRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BorrowRecordManager {

    @Autowired
    private BooksRepository booksRepository;

    @Autowired
    private BorrowRecordRepository borrowRecordRepository;

    public String borrowBook(String isbn, String userEmail, Date dueDate) {
        Optional<Books> optionalBook = booksRepository.findById(isbn);
        if (optionalBook.isEmpty()) {
            return "Book not found.";
        }

        Books book = optionalBook.get();
        if (!book.isAvailabilityStatus()) {
            return "Book is currently unavailable.";
        }

        // Update book availability
        book.setAvailabilityStatus(false);
        booksRepository.save(book);

        // Save borrow record
        BorrowRecord record = new BorrowRecord(book, userEmail, new Date(), dueDate, "BORROWED");
        borrowRecordRepository.save(record);

        return "Book borrowed successfully.";
    }

    public String returnBook(Long recordId) {
        Optional<BorrowRecord> optionalRecord = borrowRecordRepository.findById(recordId);
        if (optionalRecord.isEmpty()) {
            return "Borrow record not found.";
        }

        BorrowRecord record = optionalRecord.get();
        if ("RETURNED".equalsIgnoreCase(record.getStatus())) {
            return "Book already returned.";
        }

        // Update book availability
        Books book = record.getBook();
        book.setAvailabilityStatus(true);
        booksRepository.save(book);

        // Update borrow record
        record.setReturnedDate(new Date());
        record.setStatus("RETURNED");
        borrowRecordRepository.save(record);

        return "Book returned successfully.";
    }

    public List<BorrowRecord> getAllRecords() {
        return borrowRecordRepository.findAll();
    }

    public List<BorrowRecord> getRecordsByUserEmail(String email) {
        return borrowRecordRepository.findByUserEmail(email);
    }

    public List<BorrowRecord> getUnreturnedBooks() {
        return borrowRecordRepository.findByReturnedDateIsNull();
    }


}
