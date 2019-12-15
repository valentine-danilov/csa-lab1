package by.danilov.service;

import by.danilov.domain.Record;
import by.danilov.domain.RecordBook;
import by.danilov.domain.StudentInfo;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.xwpf.usermodel.*;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.*;
import java.lang.reflect.Field;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.MessageFormat;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static by.danilov.constants.CommonConstants.TEMPLATE_PATH;
import static java.util.Objects.isNull;

@Service
public class MicrosoftWordService {

    private static final String NEW_DOCUMENT_PATH = "src\\main\\resources\\documents\\{0}.docx";
    private static final String PARAMETER_PATTERN = "{%s}";

    private File createWordDocumentFromTemplate(File template) throws IOException, InvalidFormatException {

        FileOutputStream documentOutputStream = null;

        try {
            /*Load template from file*/
            XWPFDocument document = new XWPFDocument(OPCPackage.open(template));

            /*Create new file and write template to it*/
            File newDocument = createNewDocument();
            documentOutputStream = new FileOutputStream(newDocument);
            document.write(documentOutputStream);
            document.close();

            return newDocument;

        } finally {
            if (documentOutputStream != null) {
                documentOutputStream.close();
            }
        }
    }

    public void openWordDocument(File document) throws IOException {
        Desktop desktop = Desktop.getDesktop();
        desktop.open(document);
    }

    public void openNewWordDocumentFromTemplate(File template) throws IOException, InvalidFormatException {
        File newDocument = createWordDocumentFromTemplate(template);
        openWordDocument(newDocument);
    }

    private File createNewDocument() {

        Path pathToNewFile = Paths.get(MessageFormat.format(NEW_DOCUMENT_PATH, "Document"));

        for (int i = 1; Files.exists(pathToNewFile); i++) {
            String newDocumentPath = MessageFormat.format(NEW_DOCUMENT_PATH, "Document" + i);
            pathToNewFile = Paths.get(newDocumentPath);
        }

        return pathToNewFile.toFile();

    }

    public boolean saveTable(XWPFDocument doc, List<Record> records) {

        XWPFTable table = doc.getTableArray(0);
        int tableSize = table.getRows().size();

        for (int i = 0; i < records.size(); i++) {

            XWPFTableRow currentRow;
            final int rowIndex = i + 1;

            if (rowIndex >= tableSize) {
                currentRow = table.createRow();
                setTableRow(currentRow, rowIndex, records.get(i));
                tableSize++;
            } else {
                currentRow = table.getRow(rowIndex);
                setTableRow(currentRow, rowIndex, records.get(i));
            }
        }
        return true;
    }

    private void setTableCell(XWPFTableRow row, int columnIndex, String setValue) {
        XWPFParagraph paragraph = row.getCell(columnIndex).getParagraphArray(0);

        if (paragraph.getRuns().size() == 0) {
            XWPFRun run = paragraph.createRun();
            run.setText(setValue, 0);
        } else {
            for (XWPFRun run : paragraph.getRuns()) {
                run.setText(setValue, 0);
            }
        }
    }

    private void setTableRow(XWPFTableRow row, int rowIndex, Record record) {
        setTableCell(row, 0, String.valueOf(rowIndex));
        record.getColumns().forEach(column -> setTableCell(row, column.getIndex() + 1, column.getValue()));
    }

    public void setStudentInfo(List<XWPFRun> runs, StudentInfo studentInfo) throws IllegalAccessException, NoSuchFieldException {
        for (XWPFRun run : runs) {
            String text = run.getText(0);

            if (isNull(text) || !text.contains("{") || !text.contains("}")) {
                continue;
            }

            Pattern fieldNamePattern = Pattern.compile(".*\\{(?<FieldNameGroup>.+)}.*");
            Matcher fieldNameMatcher = fieldNamePattern.matcher(text);

            String fieldName = "";

            if (fieldNameMatcher.find()) {
                fieldName = fieldNameMatcher.group("FieldNameGroup");
            }

            Field field = studentInfo.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);
            String param = String.format(PARAMETER_PATTERN, field.getName());
            String value = String.valueOf(field.get(studentInfo));
            text = text.replace(param, value);
            run.setText(text, 0);

        }
    }

    public boolean saveStudentInfo(XWPFDocument doc, StudentInfo studentInfo) throws IOException, IllegalAccessException, NoSuchFieldException {

        for (XWPFParagraph p : doc.getParagraphs()) {
            List<XWPFRun> runs = p.getRuns();
            if (runs != null) {
                setStudentInfo(runs, studentInfo);
            }
        }

        return true;
    }

    public void addPageBreak(XWPFDocument document) {
        XWPFParagraph paragraph = document.createParagraph();
        paragraph.setPageBreak(true);
    }

}
