package com.example.library.management.System;

import com.example.library.management.System.model.Library;
import com.example.library.management.System.repository.LibraryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class LibraryManagementSystemApplication implements CommandLineRunner {

	@Autowired
	private PasswordEncoder passwordEncoder;
	public static void main(String[] args) {
		SpringApplication.run(LibraryManagementSystemApplication.class, args);
	}

	@Autowired
	private LibraryRepository libraryRepository;
	@Override
	public void run(String... args) throws Exception {
		System.out.println(this.passwordEncoder.encode("xyz"));
	}
}
