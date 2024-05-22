package com.justin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.justin.entity.UsersBean;
import com.justin.repository.UsersRepository;


@Service
public class UsersService {
	
	@Autowired
	private UsersRepository usersRepository;
	
	public UsersBean insertUser(UsersBean user) {
		usersRepository.save(user);
		user.setPassword(null);
		return user;
	}
	
	
	public List<UsersBean> selectAll(){
		 List<UsersBean> users = usersRepository.findAll();
	        
	        for (UsersBean user : users) {
	            user.setPassword(null);
	        }
	        return users;
	}
	
	public UsersBean updateUser(UsersBean user) {
		UsersBean originalData=usersRepository.findById(user.getUserId()).orElse(null);
		String password=originalData.getPassword();
		user.setPassword(password);
		usersRepository.save(user);
		user.setPassword(null);
		return user;
	}
	
	public UsersBean selectByUserId(Integer userId) {
		//usersRepository.findById(userId).orElse(null).setPassword(null);
		
		UsersBean user=usersRepository.findById(userId).orElse(null);
		user.setPassword(null);
		return user;
	}
	

	


}
