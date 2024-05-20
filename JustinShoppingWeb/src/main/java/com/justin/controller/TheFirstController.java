package com.justin.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class TheFirstController {
	
	
	
	
	@GetMapping("/homePage")
	public String homePage() {
	        return "redirect:/frontpages/index.html";    
	}
	
	@GetMapping("/register")
	public String register() {
		return "redirect:/frontpages/register.html";
	}
	
	
	
	
	
}
