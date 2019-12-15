package by.danilov.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StudentInfo {

    private String name;
    private String surname;
    private String university;
    private String faculty;
    private Integer enrollmentYear;
    private Integer studentId;

}
