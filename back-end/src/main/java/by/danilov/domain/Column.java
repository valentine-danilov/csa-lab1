package by.danilov.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Column {

    private String name;
    private String value;
    private String type;
    private Integer index;

    public Column() {
    }
}
