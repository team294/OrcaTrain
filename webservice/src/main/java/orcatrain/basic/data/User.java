package orcatrain.basic.data;

public class User {
	private String username;
	private String password;
	private String token;

	public User() {

	};

	public User(String username, String password) {
		this.username = username;
		this.password = password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getPassword() {
		return password;
	}
	public void setUsername(String username) {
		this.username = username;
	}

	public String getUsername() {
		return username;
	}

	public String toString() {
		return username+" "+password;
	}

	public void setToken(String t) {
		this.token = t;
	}

	public String getToken() {
		return this.token;
	}

}
