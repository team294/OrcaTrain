package orcatrain.basic.app;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import orcatrain.basic.data.User;


@RestController
@CrossOrigin
public class BasicController {

    public static final String TEST_AUTH_TOKEN = "testtoken";

	@Autowired
	private BasicService service;    

	   
	@PostMapping("/login")
    public User login(@RequestBody User login, HttpServletResponse response) {
        System.out.printf("POST /login %s %n",login.getUsername());
        User user = service.login(login);

        if (user != null) {
            System.out.printf("login successfull for %s %n",login.getUsername());
            user.setToken(TEST_AUTH_TOKEN);
        } else {
            System.out.printf("login failed for %s %n",login.getUsername());
        }

        return user;
    }    


    @GetMapping("/user/{username}")
    public User getUserInfo(@RequestHeader(value = "AuthToken") String authToken, @PathVariable String username) {
        System.out.printf("GET /user/%s %n",username);
        checkAuthToken(authToken);
        User user = service.getUserByName(username);
        return user;
    }    

    @GetMapping("/user")
    public List<User> getUsers(@RequestHeader(value = "AuthToken") String authToken) {
        System.out.printf("GET /user %n");
        checkAuthToken(authToken);
        return service.getUsers();
    }        

    private boolean checkAuthToken(String authToken) {
        boolean auth = false;
        
        if (authToken.equals(TEST_AUTH_TOKEN)) {
            auth = true;
        } else {
            throw new RuntimeException("Invalid authToken");
        }

        return auth;

    }    
}