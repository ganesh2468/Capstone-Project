package com.example.library.management.System.controller;

        import com.example.library.management.System.exception.ResourceNotFoundException;
        import com.example.library.management.System.model.*;
        import com.example.library.management.System.repository.*;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.*;

        import java.util.List;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1")
public class LibraryController {
    @Autowired
    private LibraryRepository libraryRepository;

    @Autowired
    private BorrowRepository borrowRepository;

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private BuyRepository buyRepository;

    @Autowired
    private BuyRequestRepository buyRequestRepository;

    // get all details
    @GetMapping("/library")
    public List<Library> getAllBooks() {
        return libraryRepository.findAll();
    }

    @DeleteMapping("/library/{id}")
    public ResponseEntity<HttpStatus> deleteLibrary(@PathVariable int id) {
        Library library = libraryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not exist with id" + id));
        libraryRepository.delete(library);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    @DeleteMapping("/library/{bookName}")
//    public ResponseEntity<HttpStatus> deleteBook(@PathVariable String bookName) {
//        Library library = libraryRepository.findByBook(bookName).orElseThrow(() -> new ResourceNotFoundException("Not exist with id" + bookName));
//        libraryRepository.delete(library);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }

    @GetMapping("/library/borrow")
    public List<Borrow> getAllBorrows() {
        return borrowRepository.findAll();
    }

    @GetMapping("/library/borrow/{id}")
    public ResponseEntity<Borrow> getBorrowById(@PathVariable int id) {
        Borrow borrow = borrowRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not exist with id" + id));
        return ResponseEntity.ok(borrow);
    }

    @DeleteMapping("/library/borrow/{id}")
    public ResponseEntity<HttpStatus> deleteBorrow(@PathVariable int id) {
        Borrow borrow = borrowRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not exist with id" + id));
        borrowRepository.delete(borrow);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/library/borrow")
    public Borrow borrowLibrary(@RequestBody Borrow borrow) {
        return borrowRepository.save(borrow);
    }

    @GetMapping("/library/request")
    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    @GetMapping("/library/requestbuy")
    public List<BuyRequest> getAllRequestsBuy() {
        return buyRequestRepository.findAll();
    }

    @GetMapping("/library/request/{id}")
    public ResponseEntity<Request> getRequestById(@PathVariable int id) {
        Request request = requestRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not exist with id" + id));
        return ResponseEntity.ok(request);
    }

    @GetMapping("/library/requestbuy/{id}")
    public ResponseEntity<BuyRequest> getRequestBuyById(@PathVariable int id) {
        BuyRequest buyRequest = buyRequestRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not exist with id" + id));
        return ResponseEntity.ok(buyRequest);
    }

    @DeleteMapping("/library/request/{id}")
    public ResponseEntity<HttpStatus> deleteRequest(@PathVariable int id) {
        Request request = requestRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not exist with id" + id));
        requestRepository.delete(request);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/library/request")
    public Request requestLibrary(@RequestBody Request request) {
        return requestRepository.save(request);
    }

    @PostMapping("/library/requestbuy")
    public BuyRequest requestLibrary(@RequestBody BuyRequest buyRequest) {
        return buyRequestRepository.save(buyRequest);
    }


    @DeleteMapping("/library/buy/{id}")
    public ResponseEntity<HttpStatus> deleteCart(@PathVariable int id) {
        Buy buy = buyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not exist with id" + id));
        buyRepository.delete(buy);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/library/requestbuy/{id}")
    public ResponseEntity<HttpStatus> deleteBuyRequest(@PathVariable int id) {
        BuyRequest buyRequest = buyRequestRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not exist with id" + id));
        buyRequestRepository.delete(buyRequest);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/library/buy")
    public void  DeleteAll() {
         buyRepository.deleteAll();
    }

    @DeleteMapping("/library/requestbuy")
    public void  DeleteAllRequests() {
        buyRequestRepository.deleteAll();
    }

    @PostMapping("/library/buy")
    public Buy buyLibrary(@RequestBody Buy buy) {
        return buyRepository.save(buy);
    }


    @GetMapping("/library/buy")
    public List<Buy> getAllbuy() {
        return buyRepository.findAll();
    }


    @PostMapping("/library")
    public Library createLibrary(@RequestBody Library library) {
        return libraryRepository.save(library);
    }


    @GetMapping("/library/{id}")
    public ResponseEntity<Library> getLibraryById(@PathVariable int id) {
        Library library = libraryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not exist with id" + id));
        return ResponseEntity.ok(library);
    }

    @PutMapping("/library/{id}")
    public ResponseEntity<Library> updateLibrary(@PathVariable int id, @RequestBody Library libraryDetails) {
        Library updateLibrary = libraryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not exist with id" + id));
        updateLibrary.setBookName(libraryDetails.getBookName());
        updateLibrary.setAuthorName(libraryDetails.getAuthorName());
        updateLibrary.setRating(libraryDetails.getRating());
        updateLibrary.setImage(libraryDetails.getImage());
        updateLibrary.setStatus(libraryDetails.getStatus());
        libraryRepository.save(updateLibrary);
        return ResponseEntity.ok(updateLibrary);
    }

    @PutMapping("/library/buy/{id}")
    public ResponseEntity<Buy> updateRequest(@PathVariable int id, @RequestBody Buy buyDetails) {
        Buy updateRequest = buyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not exist with id" + id));
        updateRequest.setBookName(buyDetails.getBookName());
        updateRequest.setAuthorName(buyDetails.getAuthorName());
        updateRequest.setRating(buyDetails.getRating());
        updateRequest.setImage(buyDetails.getImage());
        updateRequest.setStatus(buyDetails.getStatus());
        buyRepository.save(updateRequest);
        return ResponseEntity.ok(updateRequest);
    }
}
