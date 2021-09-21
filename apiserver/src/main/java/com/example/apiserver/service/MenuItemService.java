package com.example.apiserver.service;

import com.example.apiserver.model.MenuItem;
import com.example.apiserver.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;

    @Autowired
    public MenuItemService(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    public MenuItem getMenuItemById(Long id) {
        return menuItemRepository.findById(id).get();
    }

    public MenuItem addMenuItem(MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }

    public void updateMenuItem(Long id, MenuItem menuItem) {
        MenuItem target = getMenuItemById(id);
        target.setTitle(menuItem.getTitle());
        target.setPrice(menuItem.getPrice());
        target.setMenuCategory(menuItem.getMenuCategory());
    }

    public void deleteMenuItem(Long id) {
        menuItemRepository.deleteById(id);
    }
}
