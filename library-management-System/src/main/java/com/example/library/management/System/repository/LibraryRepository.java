package com.example.library.management.System.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.library.management.System.model.Library;

import java.util.List;
import java.util.Optional;

public interface LibraryRepository extends JpaRepository<Library,Integer> {
//    Optional<Library> findByBook(String bookName);
}
