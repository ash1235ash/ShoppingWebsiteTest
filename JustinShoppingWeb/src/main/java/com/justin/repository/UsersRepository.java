package com.justin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.justin.entity.UsersBean;

public interface UsersRepository extends JpaRepository<UsersBean, Integer> {

}
