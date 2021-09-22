package com.example.apiserver.controller;

import com.example.apiserver.model.MenuItem;
import com.example.apiserver.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("menuitem")
public class MenuItemController {
    private final MenuItemService menuItemService;

    @Autowired
    public MenuItemController(MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<MenuItem> getMenuItem(@PathVariable Long id) {
        return new ResponseEntity<>(menuItemService.getMenuItemById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<MenuItem> addMenuItem(@RequestBody MenuItem menuItem) {
        MenuItem menuItem1 = menuItemService.addMenuItem(menuItem);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("menuitem", "/menuitem/" + menuItem1.getId().toString());
        return new ResponseEntity<>(menuItem1, httpHeaders, HttpStatus.CREATED);
    }

    @PutMapping({"/{id}"})
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable("id") Long id, @RequestBody MenuItem menuItem) {
        menuItemService.updateMenuItem(id, menuItem);
        return new ResponseEntity<>(menuItemService.getMenuItemById(id), HttpStatus.OK);
    }

    @DeleteMapping({"/{id}"})
    public ResponseEntity<MenuItem> deleteMenuItem(@PathVariable("id") Long id) {
        menuItemService.deleteMenuItem(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
