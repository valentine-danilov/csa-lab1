package by.danilov.domain;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ResponseResult {

    private Integer code;
    private String message;

}
