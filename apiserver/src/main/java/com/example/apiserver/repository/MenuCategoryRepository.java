package com.example.apiserver.repository;

import com.example.apiserver.model.MenuCategory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuCategoryRepository extends CrudRepository<MenuCategory, Long> {
}
