package com.example.library.management.System.model;


import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="library")
public class Library {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "bookName")
    private String bookName;

    @Column(name = "authorName")
    private String authorName;
    @Column(name = "rating")
    private int rating;

    @Column(name = "quantity")
    private int quantity;

    @Lob
    @Column(name = "Image", length = Integer.MAX_VALUE, nullable = true)
    private String image;

    @Column(name = "status")
    private int status;


    public Library(){

    }
    public Library(String bookName, String authorName, int rating,int quantity,int status) {
        this.bookName = bookName;
        this.authorName = authorName;
        this.rating = rating;
        this.quantity=quantity;
        this.status=status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
