package by.danilov.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Record {

    private List<Column> columns;

    public Record() {
    }
}
