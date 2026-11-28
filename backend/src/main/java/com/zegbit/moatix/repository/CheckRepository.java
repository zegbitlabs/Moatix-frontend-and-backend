package com.zegbit.moatix.repository;

import com.zegbit.moatix.entity.CheckEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CheckRepository extends JpaRepository<CheckEntity, String> {
    Optional<CheckEntity> findByCheckId(String checkId);
    Optional<CheckEntity> findByInputHash(String inputHash);
}
