package com.justin.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class TheFirstController {
	
	
	
	
	@GetMapping("/homePage")
	public String homePage() {
		System.out.println("test");
	        return "index";    
	}
	
	/*@GetMapping("/register")
	public String register() {
		return "register";
	}*/
	
	
	
	
	
}
