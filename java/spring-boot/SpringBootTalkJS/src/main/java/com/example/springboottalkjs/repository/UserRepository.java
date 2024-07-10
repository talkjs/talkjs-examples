package com.example.springboottalkjs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springboottalkjs.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>  {
}
