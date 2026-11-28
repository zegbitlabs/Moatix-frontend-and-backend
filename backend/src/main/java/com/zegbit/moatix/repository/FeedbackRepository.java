package com.zegbit.moatix.repository;

import com.zegbit.moatix.entity.FeedbackEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<FeedbackEntity, Long> {
    List<FeedbackEntity> findByCheckId(String checkId);
}
