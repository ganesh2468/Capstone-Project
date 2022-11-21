package com.example.library.management.System.repository;

import com.example.library.management.System.model.Borrow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BorrowRepository extends JpaRepository<Borrow,Integer> {
}
