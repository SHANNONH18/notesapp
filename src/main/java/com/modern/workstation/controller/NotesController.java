package com.modern.workstation.controller;

import com.modern.workstation.domain.Note;
import com.modern.workstation.repository.NoteRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Api(value = "/notes")
@RestController
@RequestMapping("/api/notes/")
public class NotesController {

    private static final Logger log = LoggerFactory.getLogger(NotesController.class);

    @PostConstruct
    public void init() {

        List<Note> seedData = new ArrayList<Note>();

        Note n1 = new Note();
        n1.setNote("Hello this is a note");
        n1.setCreatedDate(new Date());
        n1.setSubject("Some subject");
        seedData.add(n1);

        Note n2 = new Note();
        n2.setNote("Hello this another note");
        n2.setCreatedDate(new Date());
        n2.setSubject("Another subject");
        seedData.add(n2);

        for(Note n: seedData) {
            noteRepository.save(n);
        }
    }

    @Autowired
    private NoteRepository noteRepository;

    @ApiOperation(value = "notes", nickname = "Grabs all notes")
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public Iterable<Note> addNote() {
        log.debug("Getting all notes");
        return noteRepository.findAll();
    }

    @ApiOperation(value = "notes", nickname = "Grabs all notes")
    @RequestMapping(value = "/notes/add", method = RequestMethod.POST)
    public void addNote(@RequestBody Note note) {
        log.debug("Adding a note");
        if(note!=null) {
            noteRepository.save(note);
        }
    }




}
