package com.example.stuuse.controller;

import com.example.stuuse.dao.entity.FreeHour;
import com.example.stuuse.service.FreeHourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(
        path = "api/free_hours",
        produces = MediaType.APPLICATION_JSON_VALUE
)
public class FreeHourController {

    private final FreeHourService freeHourService;

    @Autowired
    public FreeHourController(FreeHourService freeHourService) {
        this.freeHourService = freeHourService;
    }

    @GetMapping
    public ResponseEntity<List<FreeHour>> getAllFreeHours() {
        return ResponseEntity.ok(freeHourService.getAllHours());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<FreeHour> getFreeHourById(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(freeHourService.getHourById(id));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FreeHour> saveFreeHour(@RequestBody FreeHour freeHour) {
        return ResponseEntity.ok(freeHourService.saveHour(freeHour));
    }

    @PutMapping(path = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FreeHour> updateFreeHour(@PathVariable(name = "id") Long id, @RequestBody FreeHour freeHour) {
        return ResponseEntity.ok(freeHourService.updateHour(id, freeHour));
    }

    @DeleteMapping(path = "/{id}")
    public void deleteFreeHourById(@PathVariable(name = "id") Long id) {
        freeHourService.deleteHourById(id);
    }

}
