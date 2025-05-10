package klu.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import klu.model.Users;
import klu.model.UsersManager;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173/")
public class UsersController {

    @Autowired
    private UsersManager userManager;

    @PostMapping("/signup")
    public String signup(@RequestBody Users user) {
        return userManager.addUser(user);
    }

    @GetMapping("/forgotpassword/{email}")
    public String forgotPassword(@PathVariable("email") String email) {
        return userManager.recoverPassword(email);
    }

    @PostMapping("/signin")
    public String signIn(@RequestBody Users user) {
        return userManager.validateCredentials(user.getEmail(), user.getPassword());
    }

    @PostMapping("/getFullname")
    public String getFullname(@RequestBody Map<String, String> data) {
        return userManager.getFullname(data.get("csrid"));
    }

    @PostMapping("/getUserProfile")
    public Map<String, String> getUserProfile(@RequestBody Map<String, String> data) {
        String token = data.get("csrid"); 
        return userManager.getUserProfile(token);
    }
   
}
