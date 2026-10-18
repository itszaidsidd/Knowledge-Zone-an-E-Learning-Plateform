package com.kz.kz.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kz.kz.entity.Lesson;
import com.kz.kz.repository.LessonRepository;

@Service 
public class LessonService {

    @Autowired
    private LessonRepository lessonRepository;

    public Lesson addLesson(Lesson lesson) {
        return lessonRepository.save(lesson);
    }

    public List<Lesson> getAllLessons() {
        return lessonRepository.findAll();
    }

    public List<Lesson> getLessonsByCourseId(Long courseId) {
        return lessonRepository.findByCourseId(courseId);
    }

    public Lesson getLessonById(Long id) {
        return lessonRepository.findById(id).orElse(null);
    }

    // public Lesson updateLesson(Long id, Lesson lesson) {
    //     lesson.setId(id);
    //     return lessonRepository.save(lesson);
    // }

    public Lesson updateLesson(Long id, Lesson newLesson) {
        Optional<Lesson> optionalLesson = lessonRepository.findById(id);
        if (optionalLesson.isPresent()) {
            Lesson existingLesson = optionalLesson.get();
            
            existingLesson.setTitle(newLesson.getTitle());
            existingLesson.setDescription(newLesson.getDescription());
            existingLesson.setCourseId(newLesson.getCourseId());
            
            return lessonRepository.save(existingLesson);
        }
        return null;
    }

    public Boolean deleteLesson(Long id) {
        try {
            if (lessonRepository.existsById(id)) {
                lessonRepository.deleteById(id);
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }

}
