
CREATE OR REPLACE FUNCTION get_user_matches(p_user_id UUID, p_limit INTEGER, p_offset INTEGER)
RETURNS TABLE(
    id UUID,
    user_id_1 UUID,
    user_id_2 UUID,
    status TEXT,
    matched_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ,
    matched_user_id UUID,
    matched_username TEXT,
    matched_first_name TEXT,
    matched_photo TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        m.id,
        m.user_id_1,
        m.user_id_2,
        m.status,
        m.matched_at,
        m.created_at,
        CASE 
          WHEN m.user_id_1 = p_user_id THEN u2.id
          ELSE u1.id
        END as matched_user_id,
        CASE 
          WHEN m.user_id_1 = p_user_id THEN u2.username
          ELSE u1.username
        END as matched_username,
        CASE 
          WHEN m.user_id_1 = p_user_id THEN up2.first_name
          ELSE up1.first_name
        END as matched_first_name,
        CASE 
          WHEN m.user_id_1 = p_user_id THEN pp2.photo_url
          ELSE pp1.photo_url
        END as matched_photo
       FROM matches m
       LEFT JOIN users u1 ON m.user_id_1 = u1.id
       LEFT JOIN users u2 ON m.user_id_2 = u2.id
       LEFT JOIN user_profiles up1 ON u1.id = up1.user_id
       LEFT JOIN user_profiles up2 ON u2.id = up2.user_id
       LEFT JOIN profile_photos pp1 ON u1.id = pp1.user_id AND pp1.is_primary = TRUE
       LEFT JOIN profile_photos pp2 ON u2.id = pp2.user_id AND pp2.is_primary = TRUE
       WHERE (m.user_id_1 = p_user_id OR m.user_id_2 = p_user_id) AND m.status = 'matched'
       ORDER BY m.matched_at DESC
       LIMIT p_limit OFFSET p_offset;
END;
$$;
