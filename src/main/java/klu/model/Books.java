package klu.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "books")
public class Books {

    @Id
    @Column(name = "isbn")
    private String isbn;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "publisher")
    private String publisher;

    @Column(name = "price")
    private double price;

    @Column(name = "availability_status")
    private boolean availabilityStatus; 
    
    @Column(name = "added_date")
    private Date addedDate;

    // Constructors
    public Books() {}

    public Books(String isbn, String title, String author, String publisher, double price, boolean availabilityStatus, Date addedDate) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.price = price;
        this.availabilityStatus = availabilityStatus;
        this.addedDate = addedDate;
    }

    

    public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public boolean isAvailabilityStatus() {
		return availabilityStatus;
	}

	public void setAvailabilityStatus(boolean availabilityStatus) {
		this.availabilityStatus = availabilityStatus;
	}

	public Date getAddedDate() {
		return addedDate;
	}

	public void setAddedDate(Date addedDate) {
		this.addedDate = addedDate;
	}

	@Override
    public String toString() {
        return "Book [isbn=" + isbn + ", title=" + title + ", author=" + author +
               ", publisher=" + publisher + ", price=" + price +
               ", availabilityStatus=" + availabilityStatus + ", addedDate=" + addedDate + "]";
    }
}
