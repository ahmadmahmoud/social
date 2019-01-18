<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PostModel
 *
 * @author Ahmad Mahmoud
 */
class PostsModel extends CI_Model {
    
    public function searchPosts($user_id, $keyword) {
        $page = 1;
        $url_vid = base_url() . URL_VID;
        $url_img = base_url() . URL_IMG;
        $url_avatar = base_url() . URL_AVATAR;
        $url_pdf = base_url() . URL_PDF;
        $url_thumb = base_url() . URL_THUMB;
        $limit = POST_LIMIT;
        $start = ($page - 1) * $limit;
        $sql = "
        SELECT 
            SQL_CALC_FOUND_ROWS
            u.id as user_id,
            u.username,
            CONCAT('{$url_avatar}', r.avatar) as avatar,
            p.id,
            p.text,
            IF(p.vid <> '',CONCAT('{$url_vid}',p.vid),'') as vid,
            IF(p.vid <> '',CONCAT('{$url_thumb}',p.thumb),'') as thumb,
            IF(p.img <> '',CONCAT('{$url_img}',p.img),'') as img,
            IF(p.pdf <> '',CONCAT('{$url_pdf}',p.pdf),'') as pdf,
            p.filename,
            p.is_gif,
            p.vid_desc,
            p.img_desc,
            p.type,
            p.views,
            p.comments,
            p.likes,
            p.dislikes,
            p.downloads,
            p.reports,
            p.copy,
            IF(p.title IS NULL,'',p.title) as title,
            IF(p.description IS NULL,'',p.description) as description,
            IF(p.price IS NULL,'',p.price) as price,
            p.is_forsale,
            UNIX_TIMESTAMP(p.created) as created_ts,
            DATE_FORMAT(p.created, '%Y-%m-%d %H:%i:%s') as created,
            IF((SELECT COUNT(l.id) as `count` FROM likes l WHERE l.user_id = {$user_id} AND l.post_id = p.id) > 0,1,0) as is_liked,
            IF((SELECT COUNT(d.id) as `count` FROM dislikes d WHERE d.user_id = {$user_id} AND d.post_id = p.id) > 0,1,0) as is_disliked,
            IF((SELECT COUNT(c.id) as `count` FROM comments c WHERE c.user_id = {$user_id} AND c.post_id = p.id) > 0,1,0) as is_commented,
            IF((SELECT COUNT(dl.id) as `count` FROM downloads dl WHERE dl.is_copy = 0 AND dl.user_id = {$user_id} AND dl.post_id = p.id) > 0,1,0) as is_downloaded,
            IF((SELECT COUNT(dl.id) as `count` FROM downloads dl WHERE dl.is_copy = 1 AND dl.user_id = {$user_id} AND dl.post_id = p.id) > 0,1,0) as is_copy,
            IF((SELECT COUNT(rs.id) as `count` FROM reports rs WHERE rs.user_id = {$user_id} AND rs.post_id = p.id) > 0,1,0) as is_reported
        FROM 
            posts p
        INNER JOIN users u ON p.user_id = u.id AND u.active = 1
        INNER JOIN profile r ON r.user_id = u.id AND u.active = 1
        WHERE 
            p.text LIKE '%{$keyword}%' ESCAPE '!'
        ORDER BY created_ts DESC";
        $query = $this->db->query($sql);
        $result = $query->result();
        if($result){
            $newresult = array();
            foreach($result as $row){
                $created = $row->created;
                $new_created = $this->CommonModel->TimeAgo($created);
                $row->created = $new_created;
                $newresult[] = $row;
            }
            $result = $newresult;
        }
        
        $query = $this->db->query('SELECT FOUND_ROWS() AS Total');
        $total = $query->row()->Total;
        
        return array(
            'result' => ($result) ? $result : array(),
            'total' => ($result) ? $total : 0,
            'count' => ($result) ? count($result) : 0
        );
    }
    
    public function updateList($post_id, $user_id, $likeslist, $dislikeslist) {
        $this->db->query("
        UPDATE 
            profile 
        SET 
            likes = (SELECT COUNT(id) FROM likes WHERE user_id = {$user_id}), 
            dislikes = (SELECT COUNT(id) FROM dislikes WHERE user_id = {$user_id}) 
        WHERE 
            user_id = {$user_id}");
            
        $this->db->query("
        UPDATE 
            posts 
        SET 
            likes = (SELECT COUNT(id) FROM likes WHERE post_id = {$post_id}), 
            dislikes = (SELECT COUNT(id) FROM dislikes WHERE post_id = {$post_id}),
            likes_list = '{$likeslist}',
            dislikes_list = '$dislikeslist'    
        WHERE 
            id = {$post_id}");
    }
    
    public function getDetails($post_id) {
        $sql = "
        SELECT
            p.likes_list,
            p.dislikes_list,
            p.user_id
        FROM 
            posts p
        WHERE 
            p.id = ?";
        $query = $this->db->query($sql, array($post_id));
        $result = $query->row();
        return ($result) ? $result : FALSE;
    }
    
    public function getLikeDislikes($user_id, $post_id) {
        $sql = "
        SELECT 
        (SELECT COUNT(id) FROM likes WHERE post_id = {$post_id}) as likescount,
        IF((SELECT id FROM likes WHERE user_id = {$user_id} AND post_id = {$post_id}) IS NULL,'0','1') as ilike,
        (SELECT COUNT(id) FROM dislikes WHERE post_id = {$post_id}) as dislikescount,
        IF((SELECT id FROM dislikes WHERE user_id = {$user_id} AND post_id = {$post_id}) IS NULL,'0','1') as idislike";
        $query = $this->db->query($sql);
        $result = $query->row();
        return $result;
    }
    
    public function getCommentsAll($user_id, $id, $page) {
        $url_img = base_url() . URL_COMMENTS;
        $url_avatar = base_url() . URL_AVATAR;
        $limit = COMMENT_LIMIT;
        $start = ($page - 1) * $limit;
        $sql = "
        SELECT 
            SQL_CALC_FOUND_ROWS
            u.id as user_id,
            u.username,
            CONCAT('{$url_avatar}', r.avatar) as avatar,
            IF(c.user_id = {$user_id},1,0) as me,
            c.id,
            c.post_id,
            c.text,
            IF(c.img <> '',CONCAT('{$url_img}',c.img),'') as img,
            c.is_gif,
            UNIX_TIMESTAMP(c.created) as created_ts,
            DATE_FORMAT(c.created, '%Y-%m-%d %H:%i:%s') as created
        FROM 
            comments c
        INNER JOIN users u ON c.user_id = u.id AND u.active = 1
        INNER JOIN profile r ON r.user_id = u.id AND u.active = 1
        WHERE c.post_id = ?
        ORDER BY created_ts DESC
        LIMIT {$start},{$limit}";
        $query = $this->db->query($sql, array($id));
        $result = $query->result();
        if($result){
            $newresult = array();
            foreach($result as $row){
                $created = $row->created;
                $new_created = $this->CommonModel->TimeAgo($created);
                $row->created = $new_created;
                $newresult[] = $row;
            }
            $result = $newresult;
        }
        
        $query = $this->db->query('SELECT FOUND_ROWS() AS Total');
        $total = $query->row()->Total;
        
        return array(
            'result' => ($result) ? $result : array(),
            'total' => ($result) ? $total : 0,
            'count' => ($result) ? count($result) : 0
        );
    }
    
    public function getDownloadsCount($id) {
        $sql = "SELECT COUNT(`downloads`) as `count` FROM `posts` WHERE id = ?";
        $query = $this->db->query($sql, array($id));
        $result = $query->row();
        return ($result) ? $result : false;
    }
    
    public function isCommentOwner($owner_id, $id) {
        $sql = "SELECT id FROM comments WHERE user_id = ? AND id = ?";
        $query = $this->db->query($sql, array($owner_id, $id));
        $result = $query->row();
        return ($result) ? true : false;
    }
    
    public function getComment($id) {
        $sql = "SELECT * FROM comments WHERE id = ?";
        $query = $this->db->query($sql, array($id));
        $result = $query->row();
        return ($result) ? $result : false;
    }
    
    public function updatePostLikesDislikes($post_id) {
        $this->db->query("
        UPDATE 
            posts 
        SET 
            likes = (SELECT COUNT(id) FROM likes WHERE post_id = {$post_id}), 
            dislikes = (SELECT COUNT(id) FROM dislikes WHERE post_id = {$post_id}) 
        WHERE 
            id = {$post_id}");
    }
    
    public function updateProfileLikesDislikes($user_id) {
        $this->db->query("
        UPDATE 
            profile 
        SET 
            likes = (SELECT COUNT(id) FROM likes WHERE user_id = {$user_id}), 
            dislikes = (SELECT COUNT(id) FROM dislikes WHERE user_id = {$user_id}) 
        WHERE 
            user_id = {$user_id}");
    }
    
    public function hasLike($user_id, $id) {
        $sql = "SELECT id FROM likes WHERE user_id = ? AND post_id = ?";
        $query = $this->db->query($sql, array($user_id, $id));
        $result = $query->row();
        return ($result) ? $result : false;
    }
    
    public function getLikeDislikesCounts($id) {
        $sql = "
        SELECT
            (SELECT COUNT(id) FROM likes WHERE post_id = {$id}) as likes,
            (SELECT COUNT(id) FROM dislikes WHERE post_id = {$id}) as dislikes";
        $query = $this->db->query($sql);
        $result = $query->row();
        return ($result) ? $result : false;
    }
    
    public function hasDislike($user_id, $id) {
        $sql = "SELECT id FROM dislikes WHERE user_id = ? AND post_id = ?";
        $query = $this->db->query($sql, array($user_id, $id));
        $result = $query->row();
        return ($result) ? $result : false;
    }
    
    public function getPost($id, $user_id) {
        $url_vid = base_url() . URL_VID;
        $url_img = base_url() . URL_IMG;
        $url_avatar = base_url() . URL_AVATAR;
        $url_pdf = base_url() . URL_PDF;
        $url_thumb = base_url() . URL_THUMB;
        $sql = "
        SELECT
            u.id as user_id,
            u.username,
            CONCAT('{$url_avatar}', r.avatar) as avatar,
            p.id,
            p.text,
            IF(p.vid <> '',CONCAT('{$url_vid}',p.vid),'') as vid,
            IF(p.vid <> '',CONCAT('{$url_thumb}',p.thumb),'') as thumb,
            IF(p.img <> '',CONCAT('{$url_img}',p.img),'') as img,
            IF(p.pdf <> '',CONCAT('{$url_pdf}',p.pdf),'') as pdf,
            p.filename,
            p.is_gif,
            p.vid_desc,
            p.img_desc,
            p.type,
            p.views,
            p.comments,
            p.likes,
            p.dislikes,
            p.downloads,
            p.reports,
            p.copy,
            IF(p.title IS NULL,'',p.title) as title,
            IF(p.description IS NULL,'',p.description) as description,
            IF(p.price IS NULL,'',p.price) as price,
            p.is_forsale,
            UNIX_TIMESTAMP(p.created) as created_ts,
            DATE_FORMAT(p.created, '%Y-%m-%d %H:%i:%s') as created,
            IF((SELECT COUNT(l.id) as `count` FROM likes l WHERE l.user_id = {$user_id} AND l.post_id = p.id) > 0,1,0) as is_liked,
            IF((SELECT COUNT(d.id) as `count` FROM dislikes d WHERE d.user_id = {$user_id} AND d.post_id = p.id) > 0,1,0) as is_disliked,
            IF((SELECT COUNT(c.id) as `count` FROM comments c WHERE c.user_id = {$user_id} AND c.post_id = p.id) > 0,1,0) as is_commented,
            IF((SELECT COUNT(dl.id) as `count` FROM downloads dl WHERE dl.is_copy = 0 AND dl.user_id = {$user_id} AND dl.post_id = p.id) > 0,1,0) as is_downloaded,
            IF((SELECT COUNT(dl.id) as `count` FROM downloads dl WHERE dl.is_copy = 1 AND dl.user_id = {$user_id} AND dl.post_id = p.id) > 0,1,0) as is_copy,
            IF((SELECT COUNT(rs.id) as `count` FROM reports rs WHERE rs.user_id = {$user_id} AND rs.post_id = p.id) > 0,1,0) as is_reported,
	    p.id as post_id
        FROM 
            posts p 
        INNER JOIN users u ON p.user_id = u.id AND u.active = 1
        INNER JOIN profile r ON r.user_id = u.id AND u.active = 1
        WHERE p.id = ?";
        $query = $this->db->query($sql, array($id));
        $result = $query->row();
        if($result){
            /*$time_search = $this->config->item('time_search');
            $time_replace = $this->config->item('time_replace');
            $created = str_replace($time_search, $time_replace, $result->created);*/
            $result->created = $this->CommonModel->TimeAgo($result->created);
        }
        return ($result) ? $result : false;
    }
    
    public function isPostOwner($user_id, $id) {
        $sql = "SELECT id FROM posts WHERE user_id = ? AND id = ?";
        $query = $this->db->query($sql, array($user_id, $id));
        $result = $query->row();
        return ($result) ? true : false;
    }
    
    public function getPostsMostViewed($user_id, $page) {
        $url_vid = base_url() . URL_VID;
        $url_img = base_url() . URL_IMG;
        $url_avatar = base_url() . URL_AVATAR;
        $url_pdf = base_url() . URL_PDF;
        $url_thumb = base_url() . URL_THUMB;
        $limit = POST_LIMIT;
        $start = ($page - 1) * $limit;
        $sql = "
        SELECT 
            SQL_CALC_FOUND_ROWS
            u.id as user_id,
            u.username,
            CONCAT('{$url_avatar}', r.avatar) as avatar,
            p.id,
            p.text,
            IF(p.vid <> '',CONCAT('{$url_vid}',p.vid),'') as vid,
            IF(p.vid <> '',CONCAT('{$url_thumb}',p.thumb),'') as thumb,
            IF(p.img <> '',CONCAT('{$url_img}',p.img),'') as img,
            IF(p.pdf <> '',CONCAT('{$url_pdf}',p.pdf),'') as pdf,
            p.filename,
            p.is_gif,
            p.vid_desc,
            p.img_desc,
            p.type,
            p.views,
            p.comments,
            p.likes,
            p.dislikes,
            p.downloads,
            p.reports,
            p.copy,
            IF(p.title IS NULL,'',p.title) as title,
            IF(p.description IS NULL,'',p.description) as description,
            IF(p.price IS NULL,'',p.price) as price,
            p.is_forsale,
            UNIX_TIMESTAMP(p.created) as created_ts,
            DATE_FORMAT(p.created, '%Y-%m-%d %H:%i:%s') as created,
            IF((SELECT COUNT(l.id) as `count` FROM likes l WHERE l.user_id = {$user_id} AND l.post_id = p.id) > 0,1,0) as is_liked,
            IF((SELECT COUNT(d.id) as `count` FROM dislikes d WHERE d.user_id = {$user_id} AND d.post_id = p.id) > 0,1,0) as is_disliked,
            IF((SELECT COUNT(c.id) as `count` FROM comments c WHERE c.user_id = {$user_id} AND c.post_id = p.id) > 0,1,0) as is_commented,
            IF((SELECT COUNT(dl.id) as `count` FROM downloads dl WHERE dl.is_copy = 0 AND dl.user_id = {$user_id} AND dl.post_id = p.id) > 0,1,0) as is_downloaded,
            IF((SELECT COUNT(dl.id) as `count` FROM downloads dl WHERE dl.is_copy = 1 AND dl.user_id = {$user_id} AND dl.post_id = p.id) > 0,1,0) as is_copy,
            IF((SELECT COUNT(rs.id) as `count` FROM reports rs WHERE rs.user_id = {$user_id} AND rs.post_id = p.id) > 0,1,0) as is_reported,
	    p.id as post_id
        FROM 
            posts p
        INNER JOIN users u ON p.user_id = u.id AND u.active = 1
        INNER JOIN profile r ON r.user_id = u.id AND u.active = 1
        WHERE 
            p.views <> 0
        ORDER BY p.views DESC
        LIMIT {$start},{$limit}";
        $query = $this->db->query($sql);
        $result = $query->result();
        if($result){
            $newresult = array();
            foreach($result as $row){
                $created = $row->created;
                $new_created = $this->CommonModel->TimeAgo($created);
                $row->created = $new_created;
                $newresult[] = $row;
            }
            $result = $newresult;
        }
        
        $query = $this->db->query('SELECT FOUND_ROWS() AS Total');
        $total = $query->row()->Total;
        
        return array(
            'result' => ($result) ? $result : array(),
            'total' => ($result) ? $total : 0,
            'count' => ($result) ? count($result) : 0
        );
    }

    public function getPostsAll($user_id, $page) {
        $url_vid = base_url() . URL_VID;
        $url_img = base_url() . URL_IMG;
        $url_avatar = base_url() . URL_AVATAR;
        $url_pdf = base_url() . URL_PDF;
        $url_thumb = base_url() . URL_THUMB;
        $limit = POST_LIMIT;
        $start = ($page - 1) * $limit;
        $sql = "
        SELECT 
            SQL_CALC_FOUND_ROWS
            u.id as user_id,
            u.username,
            CONCAT('{$url_avatar}', r.avatar) as avatar,
            p.id,
            p.text,
            IF(p.vid <> '',CONCAT('{$url_vid}',p.vid),'') as vid,
            IF(p.vid <> '',CONCAT('{$url_thumb}',p.thumb),'') as thumb,
            IF(p.img <> '',CONCAT('{$url_img}',p.img),'') as img,
            IF(p.pdf <> '',CONCAT('{$url_pdf}',p.pdf),'') as pdf,
            p.filename,
            p.is_gif,
            p.vid_desc,
            p.img_desc,
            p.type,
            p.views,
            p.comments,
            p.likes,
            p.dislikes,
            p.downloads,
            p.reports,
            p.copy,
            IF(p.title IS NULL,'',p.title) as title,
            IF(p.description IS NULL,'',p.description) as description,
            IF(p.price IS NULL,'',p.price) as price,
            p.is_forsale,
            UNIX_TIMESTAMP(p.created) as created_ts,
            DATE_FORMAT(p.created, '%Y-%m-%d %H:%i:%s') as created,
            IF((SELECT COUNT(l.id) as `count` FROM likes l WHERE l.user_id = {$user_id} AND l.post_id = p.id) > 0,1,0) as is_liked,
            IF((SELECT COUNT(d.id) as `count` FROM dislikes d WHERE d.user_id = {$user_id} AND d.post_id = p.id) > 0,1,0) as is_disliked,
            IF((SELECT COUNT(c.id) as `count` FROM comments c WHERE c.user_id = {$user_id} AND c.post_id = p.id) > 0,1,0) as is_commented,
            IF((SELECT COUNT(dl.id) as `count` FROM downloads dl WHERE dl.is_copy = 0 AND dl.user_id = {$user_id} AND dl.post_id = p.id) > 0,1,0) as is_downloaded,
            IF((SELECT COUNT(dl.id) as `count` FROM downloads dl WHERE dl.is_copy = 1 AND dl.user_id = {$user_id} AND dl.post_id = p.id) > 0,1,0) as is_copy,
            IF((SELECT COUNT(rs.id) as `count` FROM reports rs WHERE rs.user_id = {$user_id} AND rs.post_id = p.id) > 0,1,0) as is_reported,
	    p.id as post_id
        FROM 
            posts p
        INNER JOIN users u ON p.user_id = u.id AND u.active = 1
        INNER JOIN profile r ON r.user_id = u.id AND u.active = 1
        ORDER BY created_ts DESC
        LIMIT {$start},{$limit}";
        $query = $this->db->query($sql);
        $result = $query->result();
        if($result){
            $newresult = array();
            foreach($result as $row){
                $created = $row->created;
                $new_created = $this->CommonModel->TimeAgo($created);
                $row->created = $new_created;
                $newresult[] = $row;
            }
            $result = $newresult;
        }
        
        $query = $this->db->query('SELECT FOUND_ROWS() AS Total');
        $total = $query->row()->Total;
        
        return array(
            'result' => ($result) ? $result : array(),
            'total' => ($result) ? $total : 0,
            'count' => ($result) ? count($result) : 0
        );
    }
    
    public function setPostView($rows) {
        if (!$rows) {
            return false;
        }
        $post_ids = $user_ids = array();
        foreach ($rows as $row) {
            $post_ids[] = $row->id;
            $user_ids[] = $row->user_id;
        }
        if (count($post_ids)) {
            $post_ids_imp = implode(",", $post_ids);
            $user_ids_imp = implode(",", $user_ids);
            $this->db->trans_start();
            $this->db->query("UPDATE profile SET views = views + 1 WHERE user_id IN({$user_ids_imp})");
            $this->db->query("UPDATE posts SET views = views + 1 WHERE id IN({$post_ids_imp})");
            $this->db->trans_complete();
        }
    }

}
