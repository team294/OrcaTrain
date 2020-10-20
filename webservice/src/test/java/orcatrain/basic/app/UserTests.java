package orcatrain.basic.app;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import orcatrain.basic.data.User;

@RunWith(SpringRunner.class)
@SpringBootTest(classes={BasicApplication.class}, webEnvironment = WebEnvironment.RANDOM_PORT)
public class UserTests {

	private String username = "paul";	
	private String password = "pw1234";

	@LocalServerPort
	int port;
	
	private Log log =  LogFactory.getLog(UserTests.class);

	private String getURL() {
		return "http://localhost:"+port;
	}
	
	public String login() {
		System.out.printf("url:%s username:%s %n",getURL(),username);
		User user = new User();
		user.setUsername(username);
		user.setPassword(password);
		
		RestTemplate template = new RestTemplate();
		HttpEntity<User> request = new HttpEntity<User>(user);  
		HttpEntity<String> response = template.exchange(getURL()+"/login", HttpMethod.POST, request, String.class);
		
		String authToken = response.getBody();
		System.out.println("token:"+authToken);	
		
		return authToken;
	}	

	@Test
	public void testLogin() {
		System.out.println("url:"+getURL());
		String token = login();
		assertNotNull("Login failed with null token", token);
	}

	private MultiValueMap<String,String> getHeaders(String authToken) {
		MultiValueMap<String, String> headers = new LinkedMultiValueMap<String, String>();
		headers.add("AuthToken", authToken);
		return headers;
	}		

	@Test
	public void testGetUser() {
		// setup
		String username = "test1";
		String url = getURL()+"/user/"+username;
		System.out.println("url:"+url);

		// call get endpoint
		RestTemplate template = new RestTemplate();
		HttpEntity<String> request = new HttpEntity<String>("",getHeaders(BasicController.TEST_AUTH_TOKEN));  
		HttpEntity<User> response = template.exchange(url, HttpMethod.GET, request, User.class);

		User getUser = response.getBody();
		if (getUser!= null) System.out.println(getUser);
		assertNotNull("get user is null",getUser);

		// call get endpoint without authtoken
		template = new RestTemplate();
		request = new HttpEntity<String>(""); 
		boolean error = false;
		try { 
			response = template.exchange(url, HttpMethod.GET, request, User.class);
			getUser = response.getBody();
		} catch (Exception e) {
			error = true;
		}
		assertTrue("get user should have thrown an error without token",error);		
	}	
	
	public static <T> ArrayList<T> toList(T[] array) {
		ArrayList<T> list = new ArrayList<T>();
		for(T elmt : array) list.add(elmt);
		return list;
	}

	@Test
	public void testGetUserList() {
		// setup
		String url = getURL()+"/user/";
		System.out.println("url:"+url);

		// call get endpoint
		RestTemplate template = new RestTemplate();
		HttpEntity<String> request = new HttpEntity<String>("",getHeaders(BasicController.TEST_AUTH_TOKEN));  
		
		// get as object array
		ResponseEntity<Object[]> responseAsArray = template.exchange(url, HttpMethod.GET, request, Object[].class);
		Object[] userArray = responseAsArray.getBody();
		System.out.println("got array "+userArray.length);

		// get as typed list
		ResponseEntity<List<User>> response = template.exchange(url, HttpMethod.GET, request, new ParameterizedTypeReference<List<User>>() {});
		List<User> userList = response.getBody();

		System.out.println("got list "+userList.size());
		log.info("info got list "+userList.size());
		log.error("erro got list "+userList.size());
		
		assertNotNull("get user is null",userList);
		assertTrue("get user list should not be empty",userList.size() > 0);

	}	

}
