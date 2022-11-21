package com.example.library.management.System.repository;

import com.example.library.management.System.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepository extends JpaRepository<Request,Integer> {
}
