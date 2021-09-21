package com.example.apiserver.service;

import com.example.apiserver.model.MenuCategory;
import com.example.apiserver.repository.MenuCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MenuCategoryService {

    private final MenuCategoryRepository menuCategoryRepository;

    @Autowired
    public MenuCategoryService(MenuCategoryRepository menuCategoryRepository) {
        this.menuCategoryRepository = menuCategoryRepository;
    }

    public List<MenuCategory> getMenuCategories() {
        List<MenuCategory> menuCategories = new ArrayList<>();
        menuCategoryRepository.findAll().forEach(menuCategories::add);
        return menuCategories;
    }

    public MenuCategory getMenuCategoryById(Long id) {
        return menuCategoryRepository.findById(id).get();
    }

    public MenuCategory addMenuCategory(MenuCategory menuCategory) {
        return menuCategoryRepository.save(menuCategory);
    }

    public void updateMenuCategory(Long id, MenuCategory menuCategory) {
        MenuCategory target = getMenuCategoryById(id);
        target.setTitle(menuCategory.getTitle());
    }

    public void deleteMenuCategory(Long id) {
        menuCategoryRepository.deleteById(id);
    }

}
