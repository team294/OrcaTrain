package orcatrain.basic.app;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import orcatrain.basic.data.*;

@Component
public class BasicService {

	private List<User> userList = null;
	
	public List<User> getUsers() {
		if (userList == null) {
			userList = new ArrayList<User>();
			userList.add(new User("paul","abc"));
			userList.add(new User("michael","def"));
		}

		return userList;
	}	

	public User getUserByName(String name) {
		User found = null;
		List<User> userList = getUsers();
		for (User u:userList) {
			if (u.getUsername().equalsIgnoreCase(name)) {
				found = u;
				break;
			}
		}
		
		return found;
	}	

	public User login(User loginUser) {
		User u = getUserByName(loginUser.getUsername());
		if (u!= null && u.getPassword().equals(loginUser.getPassword())) {
			return u;
		} else {
			return null;
		}
	}


}
