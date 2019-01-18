<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of NotificationsModel
 *
 * @author Ahmad Mahmoud
 */
class NotificationsModel extends CI_Model {
    
    public function getNotifications($user_id, $page) {
        $action_url = base_url() . URL_ASSETS;
        $limit = NOTIFICATIONS_LIMIT;
        $start = ($page - 1) * $limit;
        $sql = "
        SELECT 
            SQL_CALC_FOUND_ROWS
            n.id,
            IF(n.user_id IS NULL,'',n.user_id) as user_id,
            IF(n.user_name IS NULL,'',n.user_name) as user_name,
            n.notified_id,
            IF(n.action IS NULL,'',n.action) as `action`,
            IF(n.post_id IS NULL,'',n.post_id) as `post_id`,
            (CASE
            WHEN n.action = 1 THEN CONCAT('{$action_url}','like.png')
            WHEN n.action = 2 THEN CONCAT('{$action_url}','dislike.png')
            WHEN n.action = 3 THEN CONCAT('{$action_url}','comment.png')
            WHEN n.action = 4 THEN CONCAT('{$action_url}','download.png')
            WHEN n.action = 5 THEN CONCAT('{$action_url}','report.png')
            WHEN n.action = 7 THEN CONCAT('{$action_url}','copy.png')
            WHEN n.is_admin = 1 THEN CONCAT('{$action_url}','admin.png')
            END) as icon,
            n.message,
            n.is_admin,
            n.seen,
            UNIX_TIMESTAMP(n.created) as created_ts,
            DATE_FORMAT(n.created, '%Y-%m-%d %H:%i:%s') as created
        FROM
            notifications n
        WHERE 
            n.notified_id = ? 
        ORDER BY created_ts DESC
        LIMIT {$start},{$limit}";
        $query = $this->db->query($sql, array($user_id));
        $result = $query->result();
        if($result){
            $ids = array();
            foreach($result as $row){
                $ids[] = $row->id;
            }
            $this->updateNotificationStatus($ids);
        }
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
    
    public function report($user_id, $user_name, $notified_id, $post_id, $brief, $times) {
        $created = date('Y-m-d H:i:s');
        $message = str_replace(array("[BRIEF]", "[COUNT]"), array($brief, $times), NOTIF_REPORTED);
        $this->db->insert('notifications', array(
            'user_id' => $user_id,
            'user_name' => $user_name,
            'notified_id' => $notified_id,
            'post_id' => $post_id,
            'action' => POST_REPORT,
            'message' => $message,
            'is_admin' => 0,
            'seen' => 0,
            'created' => $created
        ));
    }

    public function add($user_id, $user_name, $notified_id, $post_id, $action, $template, $posttype) {
        if($user_id === $notified_id){
            return false;
        }
        $created = date('Y-m-d H:i:s');
        $message = str_replace(array("[NAME]", "[POST]"), array($user_name, $posttype), $template);
        $this->db->trans_start();
        $this->db->delete('notifications', array(
            'user_id' => $user_id,
            'notified_id' => $notified_id,
            'post_id' => $post_id,
            'action' => $action
        ));
        $this->db->insert('notifications', array(
            'user_id' => $user_id,
            'user_name' => $user_name,
            'notified_id' => $notified_id,
            'post_id' => $post_id,
            'action' => $action,
            'message' => $message,
            'is_admin' => 0,
            'seen' => 0,
            'created' => $created
        ));
        $this->db->trans_complete();
    }
    
    private function updateNotificationStatus($ids) {
        if(!count($ids)){
            return false;
        }
        $n_ids = implode(",", $ids);
        $sql = "UPDATE notifications SET `seen` = 1 WHERE id IN({$n_ids})";
        $this->db->query($sql);
    }

}
