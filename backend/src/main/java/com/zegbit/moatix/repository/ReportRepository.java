package com.zegbit.moatix.repository;

import com.zegbit.moatix.entity.ReportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<ReportEntity, Long> {
    Optional<ReportEntity> findByReportId(String reportId);
}
