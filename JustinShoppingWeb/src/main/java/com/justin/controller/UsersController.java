package com.justin.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.justin.entity.UsersBean;
import com.justin.service.UsersService;

@RestController
public class UsersController {
	@Autowired
	private UsersService userService;
	
	@PostMapping("/userInsert")
	public UsersBean userInsert(@RequestBody UsersBean user) {
		
		return userService.insertUser(user);
		
	}
	
	
	@GetMapping("/selectallusers")
	public List<UsersBean> userSelect(){
		return userService.selectAll();
	}
	
	
	@GetMapping("/selectByuserId/{userId}")
	public UsersBean userSelectById(@PathVariable("userId") String userId){
		
		return userService.selectByUserId(Integer.parseInt(userId));
	}
	
	@PutMapping("/userUpdate")
	public UsersBean userUpdate(@RequestBody UsersBean user) {
		
		return userService.updateUser(user);
		
	}
	
	
	
	

}
