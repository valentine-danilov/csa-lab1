package by.danilov.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RecordBook {

    public RecordBook() {
    }

    private StudentInfo studentInfo;
    private List<Record> records;
}
