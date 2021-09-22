package com.example.apiserver.model.DTO;

import lombok.Data;

@Data
public class MenuItemDTO {
    private String title;
    private Integer price;
    private Long menuCategoryId;
}
