package com.example.apiserver.controller;

import com.example.apiserver.model.DTO.MenuItemDTO;
import com.example.apiserver.model.MenuCategory;
import com.example.apiserver.model.MenuItem;
import com.example.apiserver.service.MenuCategoryService;
import com.example.apiserver.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("menuitem")
@CrossOrigin("http://localhost:3000")
public class MenuItemController {
    private final MenuItemService menuItemService;
    private final MenuCategoryService menuCategoryService;

    @Autowired
    public MenuItemController(MenuItemService menuItemService, MenuCategoryService menuCategoryService) {
        this.menuItemService = menuItemService;
        this.menuCategoryService = menuCategoryService;
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<MenuItem> getMenuItem(@PathVariable Long id) {
        return new ResponseEntity<>(menuItemService.getMenuItemById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<MenuItem> addMenuItem(@RequestBody MenuItemDTO menuItemDTO) {
        // Future improve: modelMapper
        MenuCategory menuCategory = menuCategoryService.getMenuCategoryById(menuItemDTO.getMenuCategoryId());
        MenuItem menuItem = new MenuItem();
        menuItem.setTitle(menuItemDTO.getTitle());
        menuItem.setPrice(menuItemDTO.getPrice());
        menuItem.setMenuCategory(menuCategory);
        MenuItem menuItem1 = menuItemService.addMenuItem(menuItem);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("menuitem", "/menuitem/" + menuItem1.getId().toString());
        return new ResponseEntity<>(menuItem1, httpHeaders, HttpStatus.CREATED);
    }

    @PutMapping({"/{id}"})
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable("id") Long id, @RequestBody MenuItemDTO menuItemDTO) {
        MenuItem target = menuItemService.getMenuItemById(id);
        target.setTitle(menuItemDTO.getTitle());
        target.setPrice(menuItemDTO.getPrice());
        target.setMenuCategory(menuCategoryService.getMenuCategoryById(menuItemDTO.getMenuCategoryId()));
        menuItemService.updateMenuItem(id, target);
        return new ResponseEntity<>(menuItemService.getMenuItemById(id), HttpStatus.OK);
    }

    @DeleteMapping({"/{id}"})
    public ResponseEntity<MenuItem> deleteMenuItem(@PathVariable("id") Long id) {
        menuItemService.deleteMenuItem(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
