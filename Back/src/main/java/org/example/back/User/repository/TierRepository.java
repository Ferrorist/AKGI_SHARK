package org.example.back.User.repository;

import javax.transaction.Transactional;

import org.example.back.User.entity.TierEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TierRepository extends JpaRepository<TierEntity, Integer> {
	@Modifying
	@Transactional
	@Query("UPDATE Tier t SET t.clearCnt = t.clearCnt+1 WHERE t.userIdx = :userIdx")
	void updateClearCnt(@Param("userIdx") int userIdx);

	@Modifying
	@Transactional
	@Query("UPDATE Tier t SET t.userTier = :nextTier WHERE t.userIdx = :userIdx")
	void updateTier(@Param("userIdx") int userIdx, @Param("nextTier") String nextTier);

	@Query("SELECT t.userTier FROM Tier t WHERE t.userIdx = :userIdx")
	String findUserTierById(@Param("userIdx") int userIdx);
}
