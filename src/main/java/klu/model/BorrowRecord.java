package klu.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "borrowrecords")
public class BorrowRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "isbn", nullable = false)  // Assumes Books has @Id String isbn
    private Books book;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @Column(name = "borrowed_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date borrowedDate;

    @Column(name = "due_date")
    @Temporal(TemporalType.DATE)
    private Date dueDate;

    @Column(name = "returned_date")
    @Temporal(TemporalType.DATE)
    private Date returnedDate;

    @Column(name = "status")
    private String status;  // e.g., "BORROWED", "RETURNED", "OVERDUE"

    // Default constructor
    public BorrowRecord() {}

    // Parameterized constructor
    public BorrowRecord(Books book, String userEmail, Date borrowedDate, Date dueDate, String status) {
        this.book = book;
        this.userEmail = userEmail;
        this.borrowedDate = borrowedDate;
        this.dueDate = dueDate;
        this.status = status;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Books getBook() {
        return book;
    }

    public void setBook(Books book) {
        this.book = book;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Date getBorrowedDate() {
        return borrowedDate;
    }

    public void setBorrowedDate(Date borrowedDate) {
        this.borrowedDate = borrowedDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public Date getReturnedDate() {
        return returnedDate;
    }

    public void setReturnedDate(Date returnedDate) {
        this.returnedDate = returnedDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // toString method
    @Override
    public String toString() {
        return "BorrowRecord [id=" + id + ", book=" + book + ", userEmail=" + userEmail +
               ", borrowedDate=" + borrowedDate + ", dueDate=" + dueDate +
               ", returnedDate=" + returnedDate + ", status=" + status + "]";
    }
}
