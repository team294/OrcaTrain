package orcatrain.basic.app;

import java.util.List;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import orcatrain.basic.data.User;


public class TestClient {

	private String username = "paul";	
	private String password = "abc";
	private String url = "http://localhost:8090";

		
	public static void main(String[] args) {
		TestClient client = new TestClient();

		String authToken = client.login();
		System.out.println("token:"+authToken);	

		client.getUsers(authToken);
	}

	public String login() {

		System.out.printf("url:%s username:%s %n",url,username);

		User user = new User();
		user.setUsername(username);
		user.setPassword(password);
		
		RestTemplate template = new RestTemplate();
		HttpEntity<User> request = new HttpEntity<User>(user);  
		HttpEntity<String> response = template.exchange(url+"/login", HttpMethod.POST, request, String.class);
		
		String authToken = response.getBody();
		
		return authToken;
	}

	public void getUsers(String authToken) {

		// call get endpoint
		RestTemplate template = new RestTemplate();
		HttpEntity<String> request = new HttpEntity<String>("",getHeaders(authToken));  

		try { 
			ResponseEntity<List<User>> response = template.exchange(url+"/user", HttpMethod.GET, request, new ParameterizedTypeReference<List<User>>() {});
			List<User> userList= response.getBody();
			System.out.printf("users found:%s %n",userList.size());
			for (User u:userList) {
				System.out.printf("username: %s %n",u.getUsername());
			}
		} catch (Exception e) {
			System.out.print(e);
		}
	}	

	private MultiValueMap<String,String> getHeaders(String authToken) {
		MultiValueMap<String, String> headers = new LinkedMultiValueMap<String, String>();
		headers.add("AuthToken", authToken);
		return headers;
	}	
	

}
