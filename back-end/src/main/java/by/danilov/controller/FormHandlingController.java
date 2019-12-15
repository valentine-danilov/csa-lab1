package by.danilov.controller;

import by.danilov.domain.Record;
import by.danilov.domain.RecordBook;
import by.danilov.domain.ResponseResult;
import by.danilov.service.MicrosoftWordService;
import com.google.common.base.Stopwatch;
import org.apache.poi.xwpf.usermodel.*;
import org.apache.xmlbeans.XmlException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController
public class FormHandlingController {

    private final MicrosoftWordService microsoftWordService;

    private static final String DOCUMENT_PATH = "src\\main\\resources\\documents\\Document1.docx";

    public FormHandlingController(MicrosoftWordService microsoftWordService) {
        this.microsoftWordService = microsoftWordService;
    }

    @PostMapping(
            value = "/table/submit",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity submitTable(@RequestBody List<Record> records) {
        return null;
    }

    @PostMapping(
            value = "/record-book/submit",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseResult submitRecordBook(@RequestBody RecordBook recordBook) {

        FileOutputStream documentOutputStream = null;
        FileInputStream documentInputStream = null;
        try {
            File documentFile = new File(DOCUMENT_PATH);
            documentInputStream = new FileInputStream(documentFile);

            XWPFDocument document = new XWPFDocument(documentInputStream);

            microsoftWordService.saveStudentInfo(document, recordBook.getStudentInfo());
            microsoftWordService.saveTable(document, recordBook.getRecords());
            microsoftWordService.addPageBreak(document);

            documentOutputStream = new FileOutputStream(documentFile);
            document.write(documentOutputStream);
            document.close();

            microsoftWordService.openWordDocument(documentFile);

            return ResponseResult.builder()
                    .message("OK")
                    .code(HttpStatus.OK.value())
                    .build();


        } catch (Exception e) {
            e.printStackTrace();
            return ResponseResult.builder()
                    .message("Unexpected error")
                    .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .build();
        } finally {
            try {
                if (documentInputStream != null) {
                    documentInputStream.close();
                }
                if (documentOutputStream != null) {
                    documentOutputStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @PostMapping(
            value = "/record-book/submit/huge-data",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseResult submitHugeData(@RequestBody RecordBook recordBook) {

        List<Record> records = recordBook.getRecords();
        List<Record> testRecords = new ArrayList<>();
        Record recordToDuplicate = records.get(0);

        for (int i = 0; i <= 10000; i++) {
            testRecords.add(recordToDuplicate);
        }

        FileOutputStream documentOutputStream = null;
        FileInputStream documentInputStream = null;
        try {
            File documentFile = new File(DOCUMENT_PATH);
            documentInputStream = new FileInputStream(documentFile);

            XWPFDocument document = new XWPFDocument(documentInputStream);


            microsoftWordService.saveStudentInfo(document, recordBook.getStudentInfo());

            Stopwatch stopwatch = Stopwatch.createStarted();

            microsoftWordService.saveTable(document, testRecords);

            stopwatch.stop();
            String timeElapsed = MessageFormat.format("Time elapsed: {0}", stopwatch.elapsed(TimeUnit.MILLISECONDS));


            documentOutputStream = new FileOutputStream(documentFile);
            document.write(documentOutputStream);
            document.close();

            microsoftWordService.openWordDocument(documentFile);

            return ResponseResult.builder()
                    .message(timeElapsed)
                    .code(HttpStatus.OK.value())
                    .build();


        } catch (Exception e) {
            e.printStackTrace();
            return ResponseResult.builder()
                    .message("Unexpected error")
                    .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .build();
        } finally {
            try {
                if (documentInputStream != null) {
                    documentInputStream.close();
                }
                if (documentOutputStream != null) {
                    documentOutputStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @GetMapping(value = "/test")
    public ResponseResult test() {
        return ResponseResult.builder()
                .message("OK")
                .code(HttpStatus.OK.value())
                .build();
    }

}
