package com.justin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.justin.entity.UsersBean;
import com.justin.repository.UsersRepository;


@Service
public class UsersService {
	
	@Autowired
	private UsersRepository userDao;
	
	public void insert(UsersBean user) {
		userDao.save(user);
	}

}
