package com.justin.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.justin.entity.UsersBean;
import com.justin.service.UsersService;

@RestController
public class UsersController {
	@Autowired
	private UsersService userService;
	
	@PostMapping("/userInsert")
	public UsersBean insert(@RequestBody UsersBean user) {
		System.out.println(user);
		userService.insert(user);
		return user;
		
	}

}
