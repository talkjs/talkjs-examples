package com.example.springboottalkjs.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.springboottalkjs.model.User;
import com.example.springboottalkjs.repository.UserRepository;

@CrossOrigin("*")
@RestController
public class UserController {

	@Autowired
	UserRepository userRepository;
	
	@PostMapping(value = "/createUser")
	public ResponseEntity<User> createUser(@RequestBody User user) { 
		return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
	}
	
	@GetMapping(value = "/getUser")
	public ResponseEntity<User> getUser(@RequestParam(required = true) Long userId) { 
		return new ResponseEntity<>(userRepository.findById(userId).get(), HttpStatus.OK);
	}
}
