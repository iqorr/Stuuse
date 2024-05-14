package com.example.stuuse.service;

import com.example.stuuse.dao.FreeHourRepository;
import com.example.stuuse.dao.entity.FreeHour;
import com.example.stuuse.exception.ContentNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FreeHourService {
    private final FreeHourRepository freeHourRepository;

    @Autowired
    public FreeHourService(FreeHourRepository freeHourRepository) {
        this.freeHourRepository = freeHourRepository;
    }

    public List<FreeHour> getAllHours() {
        return freeHourRepository.findAll();
    }

    public FreeHour getHourById(Long id) {
        return freeHourRepository.findById(id)
                .orElseThrow(() -> new ContentNotFoundException(String.format("Content of ID %s does not exists.", id)));
    }

    public FreeHour saveHour(FreeHour hour) {
        return freeHourRepository.save(hour);
    }

    public FreeHour updateHour(Long id, FreeHour hour) {
        hour.setHourId(id);
        return freeHourRepository.save(hour);
    }

    public void deleteHourById(Long id) {
        if (freeHourRepository.findById(id).isPresent()) {
            freeHourRepository.deleteById(id);
        } else {
            throw new ContentNotFoundException(String.format("Content of ID %s does not exists.", id));
        }
    }

}
