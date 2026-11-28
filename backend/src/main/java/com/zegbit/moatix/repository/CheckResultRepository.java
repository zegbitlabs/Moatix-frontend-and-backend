package com.zegbit.moatix.repository;

import com.zegbit.moatix.entity.CheckResultEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CheckResultRepository extends JpaRepository<CheckResultEntity, Long> {
    Optional<CheckResultEntity> findByCheck_CheckId(String checkId);
}
