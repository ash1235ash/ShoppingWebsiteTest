package com.justin.entity;

import org.springframework.stereotype.Component;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Component
@Entity
@Table(name = "users")
public class UsersBean {
	
	@Id
	@Column(name = "User_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId; 

    @Column(name = "Username")
    private String username; 

    @Column(name = "Password")
    private String password; 

    @Column(name = "Email")
    private String email; 

    @Column(name = "Address")
    private String address; 

    @Column(name = "Phone")
    private String phone;

	public int getUserId() {
		return userId;
	}
	//Id基本上不會用到set
	/*public void setUserId(int userId) {
		this.userId = userId;
	}*/

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public UsersBean() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "UsersBean [userId=" + userId + ", username=" + username + ", password=" + password + ", email=" + email
				+ ", address=" + address + ", phone=" + phone + "]";
	}
	
	
	
    
    
	

}
