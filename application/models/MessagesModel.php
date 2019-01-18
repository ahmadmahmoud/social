<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of MessagesModel
 *
 * @author Ahmad Mahmoud
 */
class MessagesModel extends CI_Model {
    
    public function updateUnreadMessages($id) {
        $this->db->update('messages', array('seen' => 1), array('conversation_id' => $id));
    }
    
    public function initMeta($limit, $page) {
        $meta = array(
            'count' => "0",
            'limit' => strval($limit),
            'pages' => "0",
            'page' => strval($page),
            'total' => "0"
        );
        return $meta;
    }
    
    public function getMessages($id, $receiver_id, $page) {
        $limit = LIMIT_RESULT;
        $offset = $limit * ($page - 1);
        $avatar_url = base_url() . URL_AVATAR;
        $sql = "
        SELECT 
            u.id,
            u.username,
            CONCAT('{$avatar_url}', p.avatar) as avatar
        FROM 
            users u 
        INNER JOIN profile p ON p.user_id = u.id AND u.active = 1
        WHERE 
            u.id = ?";
        $query = $this->db->query($sql, array($receiver_id));
        $user = $query->row();
        
        $sql = "
        SELECT 
            SQL_CALC_FOUND_ROWS
            m.conversation_id,
            m.sender_id,
            m.receiver_id,
            m.message,
            m.seen,
            UNIX_TIMESTAMP(m.created) as created_ts,
            DATE_FORMAT(m.created, '%Y-%m-%d %H:%i:%s') as created
        FROM 
            messages m 
        WHERE
            m.conversation_id = ?
        ORDER BY created_ts ASC 
        LIMIT {$limit} OFFSET {$offset}";
        $query = $this->db->query($sql, array($id));
        $messages = $query->result();
        if($messages){
            $newresult = array();
            foreach($messages as $row){
                $created = $row->created;
                $row->created = $this->CommonModel->TimeAgo($created);
                $newresult[] = $row;
            }
            $messages = $newresult;
        }
        
        $query = $this->db->query('SELECT FOUND_ROWS() AS Total');
        $total = $query->row()->Total;
        return array(
            'user' => $user,
            'messages' => ($messages) ? $messages : array(),
            'total' => ($messages) ? $total : 0,
            'count' => ($messages) ? count($messages) : 0
        );
    }
    
    public function getConversations($user_id, $page) {
        $avatar_url = base_url() . URL_AVATAR;
        $admin_url = base_url() . URL_ASSETS . 'admin.png';
        $limit = NOTIFICATIONS_LIMIT;
        $start = ($page - 1) * $limit;
        $sql = "        
            SELECT 
            SQL_CALC_FOUND_ROWS
            c.id,
            c.sender_id,
            s.username as sender_username,
            IF(c.is_admin = 1, '', CONCAT('{$avatar_url}',ps.avatar)) as sender_avatar,
            c.receiver_id,
            u.username as receiver_username,
            IF(c.is_admin = 1, '', CONCAT('{$avatar_url}',p.avatar)) as receiver_avatar,
            (SELECT COUNT(id) FROM messages WHERE sender_id = c.sender_id AND 
            conversation_id = c.id AND receiver_id = {$user_id} AND seen = 0) as unread,
            c.is_admin,
            c.admin_message,
            '{$admin_url}' as admin_icon,
            UNIX_TIMESTAMP(c.created) as created_ts,
            DATE_FORMAT(c.created, '%Y-%m-%d %H:%i:%s') as created
        FROM 
            `conversations` c 
        INNER JOIN `users` u ON c.receiver_id = u.id AND u.active = 1
        INNER JOIN `profile` p ON p.user_id = u.id
        LEFT JOIN `users` s ON c.sender_id = s.id AND s.active = 1
        LEFT JOIN `profile` ps ON ps.user_id = s.id
        WHERE 
            (c.receiver_id = {$user_id} OR c.sender_id = {$user_id})
        ORDER BY created_ts DESC
        LIMIT {$start},{$limit}";
        $query = $this->db->query($sql);
        $result = $query->result();
        if($result){
            $newresult = array();
            foreach($result as $row){
                $item = new stdClass();
                $item->id = $row->id;
                if($row->is_admin){
                    $item->user_id = '';
                    $item->username = '';
                    $item->avatar = '';
                    $item->admin_icon = $row->admin_icon;
                }else{
                    $item->admin_icon = '';
                    if($row->receiver_id == $user_id){
                        $item->user_id = $row->sender_id;
                        $item->username = $row->sender_username;
                        $item->avatar = $row->sender_avatar;
                    }else{
                        $item->user_id = $row->receiver_id;
                        $item->username = $row->receiver_username;
                        $item->avatar = $row->receiver_avatar;
                    }
                }
                $item->unread = $row->unread;
                $item->is_admin = $row->is_admin;
                $item->admin_message = $row->admin_message;
                $item->created_ts = $row->created_ts;
                $item->created = $this->CommonModel->TimeAgo($row->created);
                $newresult[] = $item;
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
    
    public function validateConversation($user_id, $id) {
        $sql = "SELECT id FROM conversations WHERE receiver_id = ? AND id = ?";
        $query = $this->db->query($sql, array($user_id, $id));
        $result = $query->row();
        return ($result) ? true : false;
    }

    public function validateUser($user_id) {
        $sql = "SELECT id FROM users WHERE id = ? AND active = 1";
        $query = $this->db->query($sql, array($user_id));
        $result = $query->row();
        return ($result) ? $result : false;
    }

    public function getConversation($sender_id, $receiver_id) {
        $sql = "SELECT id FROM conversations WHERE (sender_id = {$sender_id} AND receiver_id = {$receiver_id}) OR (sender_id = {$receiver_id} AND receiver_id = {$sender_id})";
        $query = $this->db->query($sql);
        $result = $query->row();
        if ($result) {
            return $result->id;
        } else {
            $fields = array(
                'sender_id' => $sender_id,
                'receiver_id' => $receiver_id,
                'is_admin' => 0,
                'admin_message' => '',
                'created' => date('Y-m-d H:i:s')
            );
            $this->db->insert('conversations', $fields);
            $id = $this->db->insert_id();
            return $id;
        }
    }

}
