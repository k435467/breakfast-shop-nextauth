package com.example.apiserver.controller;


import com.example.apiserver.model.MenuCategory;
import com.example.apiserver.service.MenuCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("menucategory")
public class MenuCategoryController {
    private final MenuCategoryService menuCategoryService;

    @Autowired
    public MenuCategoryController(MenuCategoryService menuCategoryService) {
        this.menuCategoryService = menuCategoryService;
    }

    @GetMapping
    public ResponseEntity<List<MenuCategory>> getAllMenuCategories() {
        List<MenuCategory> menuCategories = menuCategoryService.getMenuCategories();
        return new ResponseEntity<>(menuCategories, HttpStatus.OK);
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<MenuCategory> getMenuCategory(@PathVariable Long id) {
        return new ResponseEntity<>(menuCategoryService.getMenuCategoryById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<MenuCategory> addMenuCategory(@RequestBody MenuCategory menuCategory) {
        MenuCategory menuCategory1 = menuCategoryService.addMenuCategory(menuCategory);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("menucategory", "/menucategory/" + menuCategory1.getId().toString());
        return new ResponseEntity<>(menuCategory1, httpHeaders, HttpStatus.CREATED);
    }

    @PutMapping({"/{id}"})
    public ResponseEntity<MenuCategory> updateMenuCategory(@PathVariable("id") Long id, @RequestBody MenuCategory menuCategory) {
        menuCategoryService.updateMenuCategory(id, menuCategory);
        return new ResponseEntity<>(menuCategoryService.getMenuCategoryById(id), HttpStatus.OK);
    }

    @DeleteMapping({"/{id}"})
    public ResponseEntity<MenuCategory> deleteMenuCategory(@PathVariable("id") Long id) {
        menuCategoryService.deleteMenuCategory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
