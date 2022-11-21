package com.example.library.management.System.repository;

import com.example.library.management.System.model.Buy;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

public interface BuyRepository extends JpaRepository<Buy,Integer> {

}
