package klu.repository;

import klu.model.BorrowRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BorrowRecordRepository extends JpaRepository<BorrowRecord, Long> {

    List<BorrowRecord> findByUserEmail(String userEmail);

    List<BorrowRecord> findByBook_Isbn(String isbn);

    List<BorrowRecord> findByReturnedDateIsNull();
    
    List<BorrowRecord> findByUserEmailAndReturnedDateIsNull(String userEmail);
}
