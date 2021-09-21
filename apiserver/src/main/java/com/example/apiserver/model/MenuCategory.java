package com.example.apiserver.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.Set;

@Entity
//@Table
@Data
public class MenuCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    Integer id;

    @Column(unique = true)
    String title;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "menuCategory")
    @EqualsAndHashCode.Exclude
//    @EqualsAndHashCode.Include
    private Set<MenuItem> menuItems;
}
