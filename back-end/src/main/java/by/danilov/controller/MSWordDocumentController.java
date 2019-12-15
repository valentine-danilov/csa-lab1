package by.danilov.controller;

import by.danilov.constants.CommonConstants;
import by.danilov.service.MicrosoftWordService;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/document")
public class MSWordDocumentController {

    private final MicrosoftWordService msWordService;

    public MSWordDocumentController(MicrosoftWordService msWordService) {
        this.msWordService = msWordService;
    }

    @GetMapping
    @RequestMapping("/open/new")
    public ResponseEntity openMSWordDocumentFromTemplate() {
        File template = new File(CommonConstants.TEMPLATE_PATH);
        try {
            msWordService.openNewWordDocumentFromTemplate(template);
            return ResponseEntity.ok().build();

        } catch (IOException | InvalidFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }



}
