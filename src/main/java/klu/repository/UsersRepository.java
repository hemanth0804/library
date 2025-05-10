package klu.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import klu.model.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, String> {

    @Query("SELECT COUNT(u) FROM Users u WHERE u.email = :email")
    int validateEmail(@Param("email") String email);

    @Query("SELECT COUNT(u) FROM Users u WHERE u.email = :email AND u.password = :password")
    int validateCresentials(@Param("email") String email, @Param("password") String password);

	Optional<Users> findByEmail(String email);

}
