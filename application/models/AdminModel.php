<?php

defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AdminModel
 *
 * @author Ahmad Mahmoud
 */
class AdminModel extends CI_Model {
    
    private function getTimeZoneSetting() {
        $sql = "SELECT timezone FROM `settings` LIMIT 1";
        $query = $this->db->query($sql);
        $row = $query->row();
        return $row->timezone;
    }

    public function getMoreForSalePost($id) {
        $timezone = $this->getTimeZoneSetting();
        $limit = POST_LIMIT;
        $url_vid = base_url() . URL_VID;
        $url_img = base_url() . URL_IMG;
        $url_avatar = base_url() . URL_AVATAR;
        $url_pdf = base_url() . URL_PDF;
        $url_thumb = base_url() . URL_THUMB;
        $sql = "
        SELECT
            SQL_CALC_FOUND_ROWS
            p.id as post_id,
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
            UNIX_TIMESTAMP(p.created) as created_ts,
            p.created,
            DATE_FORMAT(CONVERT_TZ(p.created,'+00:00','{$timezone}'),'%d-%m-%Y %h:%s%p') as fulldate,
            p.is_top,
            IF(p.title IS NULL,'',p.title) as title,
            IF(p.description IS NULL,'',p.description) as description,
            IF(p.price IS NULL,'',p.price) as price,
            p.is_forsale
        FROM 
            posts p 
        INNER JOIN users u ON p.user_id = u.id
        INNER JOIN profile r ON r.user_id = u.id
        WHERE
            p.id < ? AND p.is_forsale = 1
        ORDER BY p.created DESC LIMIT 0,{$limit}";
        $query = $this->db->query($sql, array($id));
        $result = $query->result();
        
        $query = $this->db->query('SELECT FOUND_ROWS() AS Total');
        $total = $query->row()->Total;
        
        $csrf = array(
            'name' => $this->security->get_csrf_token_name(),
            'hash' => $this->security->get_csrf_hash()
        );
        
        return array(
            'result' => ($result) ? $result : array(),
            'total' => ($result) ? $total : 0,
            'count' => ($result) ? count($result) : 0,
            'csrf_token' => $csrf['hash']
        );
    }
    
    public function getUserByPostId($id) {
        $sql = "
        SELECT 
            p.user_id 
        FROM 
            `posts` p
        INNER JOIN users u ON p.user_id = u.id AND u.active = 1
        WHERE 
            p.id = ?";
        $query = $this->db->query($sql, array($id));
        $row = $query->row();
        return ($row) ? $row->user_id : FALSE;
    }
    
    public function getForsalePosts() {
        $timezone = $this->getTimeZoneSetting();
        $limit = POST_LIMIT;
        $url_vid = base_url() . URL_VID;
        $url_img = base_url() . URL_IMG;
        $url_avatar = base_url() . URL_AVATAR;
        $url_pdf = base_url() . URL_PDF;
        $url_thumb = base_url() . URL_THUMB;
        $sql = "
        SELECT
            SQL_CALC_FOUND_ROWS
            p.id as post_id,
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
            UNIX_TIMESTAMP(p.created) as created_ts,
            p.created,
            DATE_FORMAT(CONVERT_TZ(p.created,'+00:00','{$timezone}'),'%d-%m-%Y %h:%s%p') as fulldate,
            p.is_top,
            IF(p.title IS NULL,'',p.title) as title,
            IF(p.description IS NULL,'',p.description) as description,
            IF(p.price IS NULL,'',p.price) as price,
            p.is_forsale
        FROM 
            posts p 
        INNER JOIN users u ON p.user_id = u.id
        INNER JOIN profile r ON r.user_id = u.id
        WHERE
            p.is_forsale = 1
        ORDER BY p.created DESC LIMIT 0,{$limit}";
        $query = $this->db->query($sql);
        $result = $query->result();
        
        $query = $this->db->query('SELECT FOUND_ROWS() AS Total');
        $total = $query->row()->Total;
        
        return array(
            'result' => ($result) ? $result : array(),
            'total' => ($result) ? $total : 0,
            'count' => ($result) ? count($result) : 0
        );
    }

    public function getRequestUser($id) {
        $sql = "
        SELECT 
            u.id as user_id,
            u.username,
            r.username as newusername
        FROM 
            `requests` r
        INNER JOIN users u ON r.user_id = u.id AND u.active = 1
        WHERE r.id = ?";
        $query = $this->db->query($sql, array($id));
        $row = $query->row();
        return $row;
    }
    
    public function getRequests() {
        $timezone = $this->getTimeZoneSetting();
        $sql = "
        SELECT 
            r.id,
            u.username,
            r.username as `newusername`,
            DATE_FORMAT(CONVERT_TZ(r.created,'+00:00','{$timezone}'),'%d-%m-%Y %h:%s%p') as created
        FROM 
	`requests` r
        INNER JOIN users u ON r.user_id = u.id AND u.active = 1
        ORDER BY created DESC";
        $query = $this->db->query($sql);
        $rows = $query->result();
        return $rows;
    }
    
    public function getRequestsCount() {
        $sql = "SELECT COUNT(id) as `count` FROM requests";
        $query = $this->db->query($sql);
        $row = $query->row();
        return ($row->count) ? $row->count : 0;
    }
    
    public function getLanguage($lang) {
        $sql = "SELECT id,name,code,flag,iso,dir,`default` FROM languages WHERE active = 1 AND code = ?";
        $query = $this->db->query($sql, array($lang));
        $row = $query->row();
        return $row;
    }
    
    public function getMostViewedPosts() {
        $timezone = $this->getTimeZoneSetting();
        $limit = POST_LIMIT;
        $url_vid = base_url() . URL_VID;
        $url_img = base_url() . URL_IMG;
        $url_avatar = base_url() . URL_AVATAR;
        $url_pdf = base_url() . URL_PDF;
        $url_thumb = base_url() . URL_THUMB;
        $sql = "
        SELECT
            SQL_CALC_FOUND_ROWS
            p.id as post_id,
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
            UNIX_TIMESTAMP(p.created) as created_ts,
            p.created,
            DATE_FORMAT(CONVERT_TZ(p.created,'+00:00','{$timezone}'),'%d-%m-%Y %h:%s%p') as fulldate,
            p.is_top,
            IF(p.title IS NULL,'',p.title) as title,
            IF(p.description IS NULL,'',p.description) as description,
            IF(p.price IS NULL,'',p.price) as price,
            p.is_forsale
        FROM 
            posts p 
        INNER JOIN users u ON p.user_id = u.id
        INNER JOIN profile r ON r.user_id = u.id
        ORDER BY p.views DESC LIMIT 10";
        $query = $this->db->query($sql);
        $result = $query->result();
        
        $query = $this->db->query('SELECT FOUND_ROWS() AS Total');
        $total = $query->row()->Total;
        
        return array(
            'result' => ($result) ? $result : array(),
            'total' => ($result) ? $total : 0,
            'count' => ($result) ? count($result) : 0
        );
    }
    
    public function getTopPosts() {
        $timezone = $this->getTimeZoneSetting();
        $limit = POST_LIMIT;
        $url_vid = base_url() . URL_VID;
        $url_img = base_url() . URL_IMG;
        $url_avatar = base_url() . URL_AVATAR;
        $url_pdf = base_url() . URL_PDF;
        $url_thumb = base_url() . URL_THUMB;
        $sql = "
        SELECT
            SQL_CALC_FOUND_ROWS
            p.id as post_id,
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
            UNIX_TIMESTAMP(p.created) as created_ts,
            p.created,
            DATE_FORMAT(CONVERT_TZ(p.created,'+00:00','{$timezone}'),'%d-%m-%Y %h:%s%p') as fulldate,
            p.is_top,
            IF(p.title IS NULL,'',p.title) as title,
            IF(p.description IS NULL,'',p.description) as description,
            IF(p.price IS NULL,'',p.price) as price,
            p.is_forsale
        FROM 
            posts p 
        INNER JOIN users u ON p.user_id = u.id
        INNER JOIN profile r ON r.user_id = u.id
        WHERE
            p.is_top = 1
        ORDER BY p.created DESC";
        $query = $this->db->query($sql);
        $result = $query->result();
        
        $query = $this->db->query('SELECT FOUND_ROWS() AS Total');
        $total = $query->row()->Total;
        
        return array(
            'result' => ($result) ? $result : array(),
            'total' => ($result) ? $total : 0,
            'count' => ($result) ? count($result) : 0
        );
    }
    
    public function getMonthlyPostDeleted($premonth, $thismonth) {
        $sql = "
        SELECT
        (SELECT COUNT(id) FROM `deleted` WHERE DATE_FORMAT(created, '%Y-%m') = '{$premonth}') as premonth,
        (SELECT COUNT(id) FROM `deleted` WHERE DATE_FORMAT(created, '%Y-%m') = '{$thismonth}') as thismonth";
        $query = $this->db->query($sql);
        $row = $query->row_array();
        return $row;
    }
    
    public function getMonthlyCopy($premonth, $thismonth) {
        $sql = "
        SELECT
        (SELECT COUNT(id) FROM `downloads` WHERE is_copy = 1 AND DATE_FORMAT(created, '%Y-%m') = '{$premonth}') as premonth,
        (SELECT COUNT(id) FROM `downloads` WHERE is_copy = 1 AND DATE_FORMAT(created, '%Y-%m') = '{$thismonth}') as thismonth";
        $query = $this->db->query($sql);
        $row = $query->row_array();
        return $row;
    }
    
    public function getMonthlyUsers($premonth, $thismonth) {
        $sql = "
        SELECT
        (SELECT COUNT(id) FROM `users` WHERE DATE_FORMAT(created, '%Y-%m') = '{$premonth}') as premonth,
        (SELECT COUNT(id) FROM `users` WHERE DATE_FORMAT(created, '%Y-%m') = '{$thismonth}') as thismonth";
        $query = $this->db->query($sql);
        $row = $query->row_array();
        return $row;
    }
    
    public function getMonthlyDislikes($premonth, $thismonth) {
        $sql = "
        SELECT
        (SELECT COUNT(id) FROM `dislikes` WHERE DATE_FORMAT(created, '%Y-%m') = '{$premonth}') as premonth,
        (SELECT COUNT(id) FROM `dislikes` WHERE DATE_FORMAT(created, '%Y-%m') = '{$thismonth}') as thismonth";
        $query = $this->db->query($sql);
        $row = $query->row_array();
        return $row;
    }
    
    public function getMonthlyLikes($premonth, $thismonth) {
        $sql = "
        SELECT
        (SELECT COUNT(id) FROM `likes` WHERE DATE_FORMAT(created, '%Y-%m') = '{$premonth}') as premonth,
        (SELECT COUNT(id) FROM `likes` WHERE DATE_FORMAT(created, '%Y-%m') = '{$thismonth}') as thismonth";
        $query = $this->db->query($sql);
        $row = $query->row_array();
        return $row;
    }
    
    public function getMonthlyComments($premonth, $thismonth) {
        $sql = "
        SELECT
        (SELECT COUNT(id) FROM `comments` WHERE DATE_FORMAT(created, '%Y-%m') = '{$premonth}') as premonth,
        (SELECT COUNT(id) FROM `comments` WHERE DATE_FORMAT(created, '%Y-%m') = '{$thismonth}') as thismonth";
        $query = $this->db->query($sql);
        $row = $query->row_array();
        return $row;
    }
    
    public function getMonthlyPostText($premonth, $thismonth) {
        $sql = "
        SELECT
        (SELECT COUNT(id) FROM `posts` WHERE `type` = 'text' AND DATE_FORMAT(created, '%Y-%m') = '{$premonth}') as premonth,
        (SELECT COUNT(id) FROM `posts` WHERE `type` = 'text' AND DATE_FORMAT(created, '%Y-%m') = '{$thismonth}') as thismonth";
        $query = $this->db->query($sql);
        $row = $query->row_array();
        return $row;
    }
    
    public function getMonthlyDownloads($premonth, $thismonth) {
        $sql = "
        SELECT
        (SELECT COUNT(id) FROM `downloads` WHERE is_copy = 0 AND DATE_FORMAT(created, '%Y-%m') = '{$premonth}') as premonth,
        (SELECT COUNT(id) FROM `downloads` WHERE is_copy = 0 AND DATE_FORMAT(created, '%Y-%m') = '{$thismonth}') as thismonth";
        $query = $this->db->query($sql);
        $row = $query->row_array();
        return $row;
    }
    
    public function getMonthlyPostImage($premonth, $thismonth) {
        $sql = "
        SELECT
        (SELECT COUNT(id) FROM `posts` WHERE `type` = 'image' AND DATE_FORMAT(created, '%Y-%m') = '{$premonth}') as premonth,
        (SELECT COUNT(id) FROM `posts` WHERE `type` = 'image' AND DATE_FORMAT(created, '%Y-%m') = '{$thismonth}') as thismonth";
        $query = $this->db->query($sql);
        $row = $query->row_array();
        return $row;
    }
    
    public function getMonthlyPostGif($premonth, $thismonth) {
        $sql = "
        SELECT
        (SELECT COUNT(id) FROM `posts` WHERE `type` = 'gif' AND DATE_FORMAT(created, '%Y-%m') = '{$premonth}') as premonth,
        (SELECT COUNT(id) FROM `posts` WHERE `type` = 'gif' AND DATE_FORMAT(created, '%Y-%m') = '{$thismonth}') as thismonth";
        $query = $this->db->query($sql);
        $row = $query->row_array();
        return $row;
    }
    
    public function getMonthlyPostVideo($premonth, $thismonth) {
        $sql = "
        SELECT
        (SELECT COUNT(id) FROM `posts` WHERE `type` = 'video' AND DATE_FORMAT(created, '%Y-%m') = '{$premonth}') as premonth,
        (SELECT COUNT(id) FROM `posts` WHERE `type` = 'video' AND DATE_FORMAT(created, '%Y-%m') = '{$thismonth}') as thismonth";
        $query = $this->db->query($sql);
        $row = $query->row_array();
        return $row;
    }
    
    public function getMonthlyPostMessages($premonth, $thismonth) {
        $sql = "
        SELECT
        (SELECT COUNT(id) FROM `messages` WHERE DATE_FORMAT(created, '%Y-%m') = '{$premonth}') as premonth,
        (SELECT COUNT(id) FROM `messages` WHERE DATE_FORMAT(created, '%Y-%m') = '{$thismonth}') as thismonth";
        $query = $this->db->query($sql);
        $row = $query->row_array();
        return $row;
    }
    
    public function getMonthlySupport($premonth, $thismonth) {
        $sql = "
        SELECT
        (SELECT COUNT(id) FROM `contactus` WHERE DATE_FORMAT(created, '%Y-%m') = '{$premonth}') as premonth,
        (SELECT COUNT(id) FROM `contactus` WHERE DATE_FORMAT(created, '%Y-%m') = '{$thismonth}') as thismonth";
        $query = $this->db->query($sql);
        $row = $query->row_array();
        return $row;
    }
    
    public function getMonthlySupportAnswered($premonth, $thismonth) {
        $sql = "
        SELECT
        (SELECT COUNT(id) FROM `contactus` WHERE answered = 1 AND DATE_FORMAT(created, '%Y-%m') = '{$premonth}') as premonth,
        (SELECT COUNT(id) FROM `contactus` WHERE answered = 1 AND DATE_FORMAT(created, '%Y-%m') = '{$thismonth}') as thismonth";
        $query = $this->db->query($sql);
        $row = $query->row_array();
        return $row;
    }
    
    public function getDeletedUsers($premonth, $thismonth) {
        $sql = "
        SELECT
        (SELECT COUNT(id) FROM `users` WHERE deleted = 1 AND DATE_FORMAT(deleted_date, '%Y-%m') = '{$premonth}') as premonth,
        (SELECT COUNT(id) FROM `users` WHERE deleted = 1 AND DATE_FORMAT(deleted_date, '%Y-%m') = '{$thismonth}') as thismonth";
        $query = $this->db->query($sql);
        $row = $query->row_array();
        return $row;
    }
    
    public function getMorePost($id) {
        $timezone = $this->getTimeZoneSetting();
        $limit = POST_LIMIT;
        $url_vid = base_url() . URL_VID;
        $url_img = base_url() . URL_IMG;
        $url_avatar = base_url() . URL_AVATAR;
        $url_pdf = base_url() . URL_PDF;
        $url_thumb = base_url() . URL_THUMB;
        $sql = "
        SELECT
            SQL_CALC_FOUND_ROWS
            p.id as post_id,
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
            UNIX_TIMESTAMP(p.created) as created_ts,
            p.created,
            DATE_FORMAT(CONVERT_TZ(p.created,'+00:00','{$timezone}'),'%d-%m-%Y %h:%s%p') as fulldate,
            p.is_top,
            IF(p.title IS NULL,'',p.title) as title,
            IF(p.description IS NULL,'',p.description) as description,
            IF(p.price IS NULL,'',p.price) as price,
            p.is_forsale
        FROM 
            posts p 
        INNER JOIN users u ON p.user_id = u.id
        INNER JOIN profile r ON r.user_id = u.id
        WHERE
            p.id < ?
        ORDER BY p.created DESC LIMIT 0,{$limit}";
        $query = $this->db->query($sql, array($id));
        $result = $query->result();
        
        $query = $this->db->query('SELECT FOUND_ROWS() AS Total');
        $total = $query->row()->Total;
        
        $csrf = array(
            'name' => $this->security->get_csrf_token_name(),
            'hash' => $this->security->get_csrf_hash()
        );
        
        return array(
            'result' => ($result) ? $result : array(),
            'total' => ($result) ? $total : 0,
            'count' => ($result) ? count($result) : 0,
            'csrf_token' => $csrf['hash']
        );
    }
    
    public function getPosts() {
        $timezone = $this->getTimeZoneSetting();
        $limit = POST_LIMIT;
        $url_vid = base_url() . URL_VID;
        $url_img = base_url() . URL_IMG;
        $url_avatar = base_url() . URL_AVATAR;
        $url_pdf = base_url() . URL_PDF;
        $url_thumb = base_url() . URL_THUMB;
        $sql = "
        SELECT
            SQL_CALC_FOUND_ROWS
            p.id as post_id,
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
            UNIX_TIMESTAMP(p.created) as created_ts,
            p.created,
            DATE_FORMAT(CONVERT_TZ(p.created,'+00:00','{$timezone}'),'%d-%m-%Y %h:%s%p') as fulldate,
            p.is_top,
            IF(p.title IS NULL,'',p.title) as title,
            IF(p.description IS NULL,'',p.description) as description,
            IF(p.price IS NULL,'',p.price) as price,
            p.is_forsale
        FROM 
            posts p 
        INNER JOIN users u ON p.user_id = u.id
        INNER JOIN profile r ON r.user_id = u.id
        ORDER BY p.created DESC LIMIT 0,{$limit}";
        $query = $this->db->query($sql);
        $result = $query->result();
        
        $query = $this->db->query('SELECT FOUND_ROWS() AS Total');
        $total = $query->row()->Total;
        
        return array(
            'result' => ($result) ? $result : array(),
            'total' => ($result) ? $total : 0,
            'count' => ($result) ? count($result) : 0
        );
    }
    
    public function getMessageStream($id) {
        $timezone = $this->getTimeZoneSetting();
        $sql = "
        SELECT 
            m.`sender_id`,
            se.username as sender_name,
            sepr.avatar as sende_avatar,
            m.`receiver_id`,
            re.username as receiver_name,
            repr.avatar as receiver_avatar,
            m.message,
            DATE_FORMAT(CONVERT_TZ(m.created,'+00:00','{$timezone}'),'%d-%m-%Y %h:%s%p') as created,
            UNIX_TIMESTAMP(m.created) as ts
        FROM 
            messages m
        INNER JOIN users se ON m.sender_id = se.id
        INNER JOIN profile sepr ON m.sender_id = sepr.user_id
        INNER JOIN users re ON m.receiver_id = re.id
        INNER JOIN profile repr ON m.receiver_id = repr.user_id
        WHERE
            m.conversation_id = ?
        ORDER BY m.created ASC";
        $query = $this->db->query($sql, array($id));
        $rows = $query->result();
        return $rows;
    }
    
    public function getMessages() {
        $timezone = $this->getTimeZoneSetting();
        $sql = "
        SELECT 
            c.id,
            u1.username as username1,
            u2.username as username2,
            DATE_FORMAT(CONVERT_TZ(c.created,'+00:00','{$timezone}'),'%d-%m-%Y %h:%s%p') as created,
            UNIX_TIMESTAMP(c.created) as created_ts
        FROM 
            conversations c
        INNER JOIN users u1 ON c.sender_id = u1.id
        INNER JOIN users u2 ON c.receiver_id = u2.id
        WHERE
            c.is_admin = 0
        ORDER BY c.created DESC";
        $query = $this->db->query($sql);
        $rows = $query->result();
        return $rows;
    }
    
    public function getAdminNotifications() {
        $timezone = $this->getTimeZoneSetting();
        $sql = "
        SELECT 
            an.id,
            an.message,
            an.user_id,
            an.allusers,
            DATE_FORMAT(CONVERT_TZ(an.created,'+00:00','{$timezone}'),'%d-%m-%Y %h:%s%p') as created,
            u.username
        FROM 
            admin_notifications an
        LEFT JOIN users u ON an.user_id = u.id
        ORDER BY an.created DESC";
        $query = $this->db->query($sql);
        $rows = $query->result();
        return $rows;
    }
    
    public function getUserIdName($id) {
        $sql = "
        SELECT 
            u.id,
            u.username
        FROM 
            `users` u
        WHERE
            u.active = 1 AND u.id = ?";
        $query = $this->db->query($sql, array($id));
        $row = $query->row();
        return $row;
    }
    
    public function getUsersIdNames() {
        $sql = "
        SELECT 
            u.id,
            u.username
        FROM 
            `users` u
        WHERE
            u.active = 1
        ORDER BY u.username ASC";
        $query = $this->db->query($sql);
        $rows = $query->result();
        return $rows;
    }
    
    public function getAdminMessages() {
        $timezone = $this->getTimeZoneSetting();
        $sql = "
        SELECT 
            am.id,
            am.message,
            am.user_id,
            am.allusers,
            DATE_FORMAT(CONVERT_TZ(am.created,'+00:00','{$timezone}'),'%d-%m-%Y %h:%s%p') as created,
            u.username
        FROM 
            admin_messages am
        LEFT JOIN users u ON am.user_id = u.id
        ORDER BY am.created DESC";
        $query = $this->db->query($sql);
        $rows = $query->result();
        return $rows;
    }
    
    public function getUserSocialLinks($id) {
        $timezone = $this->getTimeZoneSetting();
        $sql = "
        SELECT 
            sm.icon,
            sm.name,
            sl.`link`,
            DATE_FORMAT(CONVERT_TZ(sl.created,'+00:00','{$timezone}'),'%d-%m-%Y %h:%s%p') as created
        FROM 
            `social_links` sl
        INNER JOIN social_media sm ON sl.social_media_id = sm.id AND sm.active = 1
        WHERE
            sl.user_id = ?
        ORDER BY sl.created DESC";
        $query = $this->db->query($sql, array($id));
        $rows = $query->result();
        return $rows;
    }
    
    public function getUser($id) {
        $timezone = $this->getTimeZoneSetting();
        $sql = "
        SELECT 
            u.id,
            u.username,
            u.email,
            u.active,
            DATE_FORMAT(CONVERT_TZ(u.created,'+00:00','{$timezone}'),'%d-%m-%Y %h:%s%p') as created,
            UNIX_TIMESTAMP(u.created) as created_ts,
            p.age,
            p.phone,
            p.about,
            p.gender,
            p.images,
            p.gifs,
            p.posts,
            p.reports,
            p.likes,
            p.dislikes,
            p.downloads,
            p.videos,
            p.views,
            (SELECT COUNT(id) FROM `comments` WHERE user_id = u.id) as comments,
            DATE_FORMAT(p.lastupdate,'%b %d, %Y') as lastupdate,
            p.cover,
            p.avatar,
            d.os,
            d.os_ver,
            d.app_ver,
            d.model,
            d.token,
            d.udid
        FROM 
            `users` u
        INNER JOIN profile p ON p.user_id = u.id
        INNER JOIN devices d ON d.user_id = u.id
        WHERE u.id = ?";
        $query = $this->db->query($sql, array($id));
        $row = $query->row();
        return $row;
    }
    
    public function getUsers() {
        $timezone = $this->getTimeZoneSetting();
        $sql = "
        SELECT 
            u.id,
            u.username,
            u.email,
            u.active,
            DATE_FORMAT(CONVERT_TZ(u.created,'+00:00','{$timezone}'),'%d-%m-%Y %h:%s%p') as created,
            UNIX_TIMESTAMP(u.created) as created_ts,
            p.age,
            p.gender,
            p.images,
            p.gifs,
            p.posts,
            p.reports,
            p.likes,
            p.dislikes,
            p.downloads,
            p.views,
            (SELECT COUNT(id) FROM `comments` WHERE user_id = u.id) as comments,
            DATE_FORMAT(p.lastupdate,'%b %d, %Y') as lastupdate,
            d.os,
            d.os_ver
        FROM 
            `users` u
        INNER JOIN profile p ON p.user_id = u.id
        INNER JOIN devices d ON d.user_id = u.id
        ORDER BY u.username ASC";
        $query = $this->db->query($sql);
        $rows = $query->result();
        return $rows;
    }
    
    public function getSupportId($id) {
        $sql = "
        SELECT 
            c.id,
            u.username,
            c.title,
            c.message,
            UNIX_TIMESTAMP(c.created) as created_ts,
            c.answered
        FROM 
            contactus c
        INNER JOIN users u ON c.user_id = u.id
        WHERE
            c.id = ?";
        $query = $this->db->query($sql, array($id));
        $rows = $query->row();
        return $rows;
    }
    
    public function getSupport() {
        $timezone = $this->getTimeZoneSetting();
        $sql = "
        SELECT 
            c.id,
            u.username,
            c.title,
            c.message,
            DATE_FORMAT(CONVERT_TZ(c.created,'+00:00','{$timezone}'),'%d-%m-%Y %h:%s%p') as created,
            UNIX_TIMESTAMP(c.created) as created_ts,
            c.seen,
            c.answered
        FROM 
            contactus c
        INNER JOIN users u ON c.user_id = u.id
        ORDER BY c.created DESC";
        $query = $this->db->query($sql);
        $rows = $query->result();
        return $rows;
    }
    
    public function getPost($id) {
        $timezone = $this->getTimeZoneSetting();
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
            UNIX_TIMESTAMP(p.created) as created_ts,
            p.created,
            DATE_FORMAT(CONVERT_TZ(p.created,'+00:00','{$timezone}'),'%d-%m-%Y %h:%s%p') as fulldate,
            p.is_top,
            IF(p.title IS NULL,'',p.title) as title,
            IF(p.description IS NULL,'',p.description) as description,
            IF(p.price IS NULL,'',p.price) as price,
            p.is_forsale
        FROM 
            posts p 
        INNER JOIN users u ON p.user_id = u.id AND u.active = 1
        INNER JOIN profile r ON r.user_id = u.id AND u.active = 1
        WHERE p.id = ?";
        $query = $this->db->query($sql, array($id));
        $result = $query->row();
        return ($result) ? $result : false;
    }
    
    public function getReports() {
        $timezone = $this->getTimeZoneSetting();
        $sql = "
        SELECT 
            r.id,
            r.user_id,
            u.username,
            p.type,
            p.reports,
            p.id as post_id,
            DATE_FORMAT(CONVERT_TZ(r.created,'+00:00','{$timezone}'),'%d-%m-%Y %h:%s%p') as created,
            rc.title as cause
        FROM 
            `reports` r
        INNER JOIN users u ON r.user_id = u.id AND u.active = 1
        INNER JOIN posts p ON r.post_id = p.id
        INNER JOIN reports_causes rc ON r.cause_id = rc.id
        ORDER BY r.created DESC";
        $query = $this->db->query($sql);
        $rows = $query->result();
        return $rows;
    }
    
    public function getBanner($id) {
        $sql = "SELECT * FROM `banners` WHERE id = ?";
        $query = $this->db->query($sql, array($id));
        $row = $query->row();
        return $row;
    }
    
    public function getBanners() {
        $sql = "SELECT * FROM `banners` ORDER BY created DESC";
        $query = $this->db->query($sql);
        $row = $query->result();
        return $row;
    }
    
    public function getAgreement() {
        $sql = "SELECT * FROM agreement WHERE active = 1 ORDER BY created DESC LIMIT 1";
        $query = $this->db->query($sql);
        $result = $query->row();
        return $result;
    }
    
    public function getAdmobs() {
        $sql = "SELECT * FROM `admobs` LIMIT 1";
        $query = $this->db->query($sql);
        $row = $query->row();
        return $row;
    }
    
    public function getSettings() {
        $sql = "SELECT * FROM `settings` LIMIT 1";
        $query = $this->db->query($sql);
        $row = $query->row();
        return $row;
    }

    public function isAjaxRequest() {
        if (empty($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
            return FALSE;
        }
        $url = parse_url(isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '');
        if (!isset($url['host']) || ($url['host'] != $_SERVER['SERVER_NAME'])) {
            return FALSE;
        }

        if (!$this->input->is_ajax_request()) {
            return FALSE;
        }
        return TRUE;
    }
    
    public function verifyRequest() {
        if (!$this->isAjaxRequest()) {
            return FALSE;
        }
        if (!$this->session->has_userdata('admin')) {
            return FALSE;
        }
        return TRUE;
    }
    
    public function validateAdmin($cookie_id) {
        $sql = "
            SELECT
               id, name, username
            FROM 
               admin 
           WHERE 
               cookie_id = ? AND active = 1";
        $query = $this->db->query($sql, array($cookie_id));
        $row = $query->row();
        if ($row) {
            $id = $row->id;
            $admin = array(
                'id' => $id,
                'name' => $row->name,
                'username' => $row->username
            );
            $this->session->set_userdata('admin', $admin);
            $this->db->update('admin', array('lastlogin' => date("Y-m-d H:i:s")), "id = $id");
        }
    }
    
    public function validate($username, $password, $remember, $loginAttempts) {
        $sql = "
         SELECT
            id, name, username
         FROM 
            admin 
        WHERE 
            username = ? AND STRCMP(password, ?) = 0 AND active = 1";
        $query = $this->db->query($sql, array($username, $password));
        $row = $query->row();
        if ($row) {
            $id = $row->id;
            $admin = array(
                'id' => $id,
                'name' => $row->name,
                'username' => $row->username
            );
            if ($remember) {
                $bytes = bin2hex(random_bytes(5));
                $expired = 60 * 60 * 24 * 30;
                $cookie = array('name' => ADMIN_COOKIENAME, 'value' => $bytes, 'expire' => $expired, 'path' => '/', 'domain' => 'localhost');
                $this->input->set_cookie($cookie);
                $data = array('cookie_id' => $bytes);
                $this->db->update('admin', $data, array('id' => $id));
            }
            $this->session->set_userdata('admin', $admin);
            $this->db->update('admin', array('lastlogin' => date("Y-m-d H:i:s")), "id = $id");
            return TRUE;
        } else {
            $this->_increaseLoginAttempts($loginAttempts);
            return FALSE;
        }
    }

    private function _increaseLoginAttempts($loginAttempts) {
        $date = date("Y-m-d");
        $ip = $this->getClientIP();
        if ($loginAttempts > 0) {
            $newLoginAttempts = $loginAttempts + 1;
            $this->db->update('login_attempts', array('attempts' => $newLoginAttempts), array('ip' => $ip, 'date' => $date));
        } else {
            $this->db->insert('login_attempts', array('ip' => $ip, 'date' => $date));
        }
    }
    
    public function getLoginAttempts() {
        $date = date("Y-m-d");
        $ip = $this->getClientIP();
        $sql = "SELECT attempts FROM login_attempts WHERE ip = ? AND date = ?";
        $query = $this->db->query($sql, array($ip, $date));
        $row = $query->row();
        return ($row) ? $row->attempts : 0;
    }

    public function hashPassword($password) {
        $salt = "$2a$" . PASSWORD_BCRYPT_COST . "$" . PASSWORD_SALT;
        if (PASSWORD_ENCRYPTION == "bcrypt") {
            $newPassword = crypt($password, $salt);
        } else {
            $newPassword = $password;
            for ($i = 0; $i < PASSWORD_SHA512_ITERATIONS; $i++) {
                $newPassword = hash('sha512', $salt . $newPassword . $salt);
            }
        }
        return $newPassword;
    }
    
    public function getClientIP() {
        if (isset($_SERVER['HTTP_CLIENT_IP']))
            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
        else if (isset($_SERVER['HTTP_X_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        else if (isset($_SERVER['HTTP_X_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
        else if (isset($_SERVER['HTTP_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
        else if (isset($_SERVER['HTTP_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_FORWARDED'];
        else if (isset($_SERVER['REMOTE_ADDR']))
            $ipaddress = $_SERVER['REMOTE_ADDR'];
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }

}