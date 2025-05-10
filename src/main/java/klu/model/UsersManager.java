package klu.model;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import klu.repository.UsersRepository;

@Service
public class UsersManager {

    @Autowired
    UsersRepository UR;

    @Autowired
    EmailManager EM;

    @Autowired
    JWTManager JWT;

    private static final Logger logger = LoggerFactory.getLogger(UsersManager.class);

    private static final String EMAIL_ALREADY_EXISTS = "401::E-mail Already Exists";
    private static final String USER_REGISTERED_SUCCESSFULLY = "200::User registered successfully";
    private static final String INVALID_CREDENTIALS = "401::Invalid credentials";
    private static final String TOKEN_EXPIRED = "401::Token Expired";
    private static final String USER_NOT_FOUND = "401::User not found";
    
    // Method to add a user
    public String addUser(Users U) {
        if (UR.validateEmail(U.getEmail()) > 0) {
            return EMAIL_ALREADY_EXISTS;
        }
        UR.save(U);
        logger.info("User registered with email: {}", U.getEmail());
        return USER_REGISTERED_SUCCESSFULLY;
    }

    // Method to recover password
    public String recoverPassword(String email) {
        Optional<Users> userOpt = UR.findById(email);
        if (userOpt.isPresent()) {
            Users U = userOpt.get();
            String message = String.format("Dear %s,\n\n your password is: %s", U.getFullname(), U.getPassword());
            logger.info("Password recovery initiated for user: {}", email);
            return EM.sendEmail(U.getEmail(), "Library: Password Recovery", message);
        }
        logger.warn("Password recovery failed: User not found with email: {}", email);
        return USER_NOT_FOUND;
    }

    // Method to validate credentials
    public String validateCredentials(String email, String password) {
        if (UR.validateCresentials(email, password) > 0) {
            String token = JWT.generateToken(email);
            logger.info("Credentials validated for user: {}", email);
            return "200::" + token;
        }
        logger.warn("Invalid credentials for user: {}", email);
        return INVALID_CREDENTIALS;
    }

    // Method to get full name from token
    public String getFullname(String token) {
        String email = JWT.validateToken(token);
        if (email.equals("401")) {
            logger.error("Token expired for token: {}", token);
            return TOKEN_EXPIRED;
        }
        Optional<Users> userOpt = UR.findById(email);
        if (userOpt.isPresent()) {
            Users U = userOpt.get();
            logger.info("Retrieved full name for user: {}", U.getEmail());
            return U.getFullname();
        }
        logger.warn("User not found for email: {}", email);
        return USER_NOT_FOUND;
    }

    // Method to get user profile using token
    public Map<String, String> getUserProfile(String token) {
        String email = JWT.validateToken(token);
        if (email.equals("401")) {
            logger.error("Token expired for token: {}", token);
            return createErrorProfile(TOKEN_EXPIRED);
        }

        Optional<Users> userOpt = UR.findByEmail(email);
        if (userOpt.isEmpty()) {
            logger.warn("User not found for email: {}", email);
            return createErrorProfile(USER_NOT_FOUND);
        }

        Users user = userOpt.get();
        Map<String, String> profile = new HashMap<>();
        profile.put("fullname", user.getFullname());
        profile.put("email", user.getEmail());
        profile.put("role", String.valueOf(user.getRole()));
        profile.put("description", user.getDescription());

        logger.info("User profile retrieved for email: {}", user.getEmail());
        return profile;
    }

    // Utility method to create error response
    private Map<String, String> createErrorProfile(String errorMessage) {
        Map<String, String> errorProfile = new HashMap<>();
        errorProfile.put("error", errorMessage);
        return errorProfile;
    }
}
