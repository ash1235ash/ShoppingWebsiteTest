package com.justin.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TheFirstController {
	
	
	@GetMapping("/")
	public String spring() {
		return "Spring Boot!!";
	}
	
	@GetMapping("/hello")
	public String hello() {
		return "Hello World!!";
	}
}
